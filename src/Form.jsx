import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import ImageZoom from './components/Image';
import ProductList from './components/list-view/ProductList';
import Swal from 'sweetalert2';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './form.css';
import { usePDF } from 'react-to-pdf';

import { handleSavePDF } from './lib/savePDF';

const Form = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [disabled, setDisabled] = useState(false);
    const [rows, setRows] = useState([]);

    const { toPDF, targetRef } = usePDF({ filename: 'taped-doors.pdf' });

    const handlePDF = () => {
        if (rows.length === 0) {
            Swal.fire({
                title: 'Таблицата е празна.',
                text: 'Моля, добавете елементи!',
                icon: 'warning',
                confirmButtonText: 'Добре'
            });
            return;
        }

        // Save PDF
        handleSavePDF(toPDF);
    }

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = async (data) => {

        if (rows.length === 0) {
            Swal.fire({
                title: 'Таблицата е празна.',
                text: 'Моля, добавете елементи!',
                icon: 'warning',
                confirmButtonText: 'Добре'
            });
            return;
        }

        let sending = false;

        await Swal.fire({
            title: "Сигурни ли сте, че искате да изпратите заявката?",
            text: "Заявката ще бъде изпратена за обработка",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Да",
            cancelButtonText: "Отказ",
        }).then((result) => {
            if (result.isConfirmed) {
                sending = true;
            } else {
                sending = false;
            }
        });

        if (!sending) {
            return;
        }

        // Setup HTML table for email
        const table = `
        <table style="border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: center">№</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Размер на рамката</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Посока на отваряне</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Брой панти</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Крило</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Брава с магнитен насрещник</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Уплътнение</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center">Брой</th>
            </tr>
            ${rows.map((row, index) => {
            return `
                <tr>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">${index + 1}</td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">
                    Широчина - ${row.frameSize.width}mm<br/>
                    Височина - ${row.frameSize.height}mm</td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">
                        ${row.direction}
                    </td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">${row.hinges}</td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">${row.wing}</td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">
                        ${row.lock}
                    </td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">${row.sealColor}</td>
                    <td style="border: 1px solid black; padding: 8px; text-align:center">${row.quantity}</td>
                </tr>
            `;
        }).join('')}
        </table>
        `;

        const dateTime = new Date();
        const date = dateTime.toLocaleDateString('bg-BG').slice(0, 10);

        const emailBody = `
        <h2>Нова поръчка от Prodes.bg за тапетни врати</h2>
        <h3>Контактна информация</h3>
        <ul>
            <li><strong>Име:</strong> ${data.name}</li>
            <li><strong>Имейл:</strong> ${data.email}</li>
            <li><strong>Телефон:</strong> ${data.phone}</li>
            <li><strong>Бележки:</strong> ${data.message}</li>
            <li><strong>Дата:</strong> ${date}</li>
        </ul>
        <h3>Поръчка</h3>
        ${table}
        `;

        const templateParams = {
            emailBody
        }


        const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
        const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
        const USER_ID = process.env.REACT_APP_USER_ID;
        try {
            // Disable form while processing submission
            setDisabled(true);

            // emailjs.send(
            //     SERVICE_ID,
            //     TEMPLATE_ID,
            //     templateParams,
            //     USER_ID
            // );

            // Display success alert
            // when the button is clicked, it will redirect to a specific page
            Swal.fire({
                title: "Успешно изпратена заявка!",
                text: "След обработка на заявката ще се свържем с Вас!",
                icon: "success",
                confirmButtonText: "Добре",
                confirmButtonColor: "#3085d6"
            })
                .then(() => {
                    // window.location.href = "https://www.prodes.bg/preview/page/66/3169";
                    window.location.href = "/";
                });


        } catch (e) {
            console.error(e);

            Swal.fire({
                icon: "error",
                title: "Възникна грешка",
                text: "Моля, опитайте отново",
                footer: 'В алтернативен случай може да попълните <a href="https://cdncloudcart.com/30283/files/doc/za-tapetni-vrati-prodiz-665dd204ba6a4.pdf?1717424646">pdf</a> формата и да ни я изпратите на имейл: sales@prodes.bg'
            });
        } finally {
            // Re-enable form submission
            setDisabled(false);
            // Reset contact form fields after submission
            reset();
        }
    };

    return (
        <div className='ContactForm'>
            <div className='container' id='container'>
            

                <div className='contactForm'>
                <h1 className='text-center title'>Бланка за тапетни врати</h1>
                    <form
                        id='contact-form'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        {/* Row 1 of form */}
                        <div className='formRow grid-3-1'>
                            <div className='col-6'>
                                <input
                                    type='text'
                                    name='name'
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: 'Моля въведете име',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Името трябва да е най-много 50 символа',
                                        },
                                    })}
                                    className={`form-control formInput ${errors.name && "inputError"}`}
                                    placeholder='Име'
                                ></input>
                                {errors.name && (
                                    <span className='errorMessage'>
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
                            <div className='col-6'>
                                <input
                                    type='email'
                                    name='email'
                                    {...register('email', {
                                        required: true,
                                        pattern:
                                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    })}
                                    className={`form-control formInput ${errors.email && "inputError"}`}
                                    placeholder='Email address'
                                ></input>
                                {errors.email && (
                                    <span className='errorMessage'>
                                        Моля въведете валиден имейл адрес
                                    </span>
                                )}
                            </div>
                            <div className='col-6'>
                                <input
                                    type='text'
                                    name='phone'
                                    {...register('phone', {
                                        required: {
                                            value: true,
                                            message: 'Моля въведете телефонен номер',
                                            pattern: {
                                                // '+' followed by digits is allowed
                                                value: /^[0-9\b]+$/,
                                                message: 'Телефонният номер трябва да съдържа само цифри',
                                            },

                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Телефонният номер трябва да е поне 6 символа',
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: 'Телефонният номер трябва да е най-много 15 символа',
                                        },

                                    })}
                                    className={`form-control formInput ${errors.phone && "inputError"}`}
                                    placeholder='Телефонен номер'
                                ></input>
                                {errors.phone && (
                                    <span className='errorMessage'>
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Row 2 of form */}
                        <div className='formRow'>
                            <div className='col'>
                                <textarea
                                    rows={3}
                                    name='message'
                                    {...register('message', {
                                        required: false,
                                    })}
                                    className='form-control formInput'
                                    placeholder='Бележки'
                                ></textarea>
                            </div>
                        </div>
                        {/* Row 3 of form  - Image information*/}
                        <div className='formRow'>
                            <div className='col'>
                                <p>
                                    <ImageZoom
                                        src='https://cdncloudcart.com/30283/files/image/full-size-description-taped-doors.jpg?1715675674'
                                        alt='Taped doors'
                                        className='img-taped-doors'
                                    />
                                </p>
                            </div>
                        </div>
                        {/* Row 4 of form  - Parameters*/}
                        <div className='formRow'>
                            <div className='col'>
                                <p className='font-size-16'>
                                </p>
                            </div>
                        </div>

                        {/* Product list */}
                        <div className='formRow'>
                            <div className='col'>
                                <p className='font-size-16' ref={targetRef}>
                                    <p id='savePDF'></p>
                                    <ProductList rows={rows} setRows={setRows} />
                                </p>
                            </div>
                        </div>

                        {/*GDPR checkbox*/}
                        <div className='formRow'>
                            <div className='col'>
                                <div className='form-check'>
                                    <div>
                                        <input
                                            type='checkbox'
                                            name='gdpr'
                                            className='me-2 form-check-input'
                                            id='gdpr'
                                            {...register('gdpr', {
                                                required: true,
                                            })}
                                        ></input>
                                        <label
                                            htmlFor='gdpr'
                                        >
                                            <a
                                                href='https://www.prodes.bg/page/marketing-policy'
                                                target='_blank'
                                                rel="noopener noreferrer">
                                                Приемам условията за обработката на лични данни</a>
                                        </label>
                                        {errors.gdpr && (
                                            <span className='errorMessage'>
                                                <br />Моля се съгласете с обработката на лични данни
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <button type='button' className='btn-toPDF' onClick={handlePDF}>
                            Запази в PDF
                        </button>

                        <button
                            className='submit-btn'
                            disabled={disabled}
                            type='submit'
                        >
                            Изпрати
                        </button>
                    </form>
                </div>

            </div>

        </div> // end


    );
};

export default Form;