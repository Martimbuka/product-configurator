import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import emailjs from '@emailjs/browser'; // to be used
import 'react-confirm-alert/src/react-confirm-alert.css';
import ImageZoom from './components/Image';
import ProductList from './components/list-view/ProductList';
import './form.css';
import Swal from 'sweetalert2';

const Form = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [disabled, setDisabled] = useState(false);
    const [rows, setRows] = useState([]);

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = (data) => {

        const table = `
        <table style="border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid black; padding: 8px;">№</th>
                <th style="border: 1px solid black; padding: 8px;">Размер на рамката</th>
                <th style="border: 1px solid black; padding: 8px;">Посока на отваряне</th>
                <th style="border: 1px solid black; padding: 8px;">Брой панти</th>
                <th style="border: 1px solid black; padding: 8px;">Крило</th>
                <th style="border: 1px solid black; padding: 8px;">Брава с магнитен насрещник</th>
                <th style="border: 1px solid black; padding: 8px;">Уплътнение</th>
                <th style="border: 1px solid black; padding: 8px;">Брой</th>
            </tr>
            ${rows.map((row, index) => {
            return `
                <tr>
                    <td style="border: 1px solid black; padding: 8px;">${index + 1}</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.frameSize.width}mm x ${row.frameSize.height}mm</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.direction}</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.hinges}</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.wing}</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.lock}</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.sealColor}</td>
                    <td style="border: 1px solid black; padding: 8px;">${row.quantity}</td>
                </tr>
            `;
        })}
        </table>
        `;

        const emailBody = `
        <h2>Нова поръчка от ProDes.bg</h2>
        <h3>Контактна информация</h3>
        <ul>
            <li><strong>Име:</strong> ${data.name}</li>
            <li><strong>Имейл:</strong> ${data.email}</li>
            <li><strong>Телефон:</strong> ${data.phone}</li>
            <li><strong>Съобщение:</strong> ${data.message}</li>
        </ul>
        <h3>Поръчка</h3>
        ${table}
        `;

        



        // Destrcture data object
        // const { name, email, phone, message } = data;
        console.log(data);
        try {

            // Disable form while processing submission
            setDisabled(true);


            // // Define template params
            // const templateParams = {
            //     name,
            //     email,
            //     phone,
            //     message,
            // };

            // // Use emailjs to email contact form data
            // await emailjs.send(
            //     import.meta.env.VITE_SERVICE_ID,
            //     import.meta.env.VITE_TEMPLATE_ID,
            //     templateParams,
            //     import.meta.env.VITE_PUBLIC_KEY,
            // );

            // Display success alert
            // when the button is clicked, it will redirect to a specific page
            Swal.fire({
                title: "Успешно изпратена бланка!",
                text: "Ще се свържем с вас възможно най-скоро!",
                icon: "success",
                confirmButtonText: "Добре",
            }).then(() => {
                window.location.href = "/";
              });
        } catch (e) {
            console.error(e);
            // Display error alert
            //toggleAlert('Uh oh. Something went wrong.', 'danger');
        } finally {
            // Re-enable form submission
            setDisabled(false);
            // Reset contact form fields after submission
            reset();
        }
    };

    return (
        <div className='ContactForm'>
            <div className='container'>


                <div className='contactForm'>
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
                                <p className='font-size-16'>
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



                        <button
                            className='submit-btn btn-primary font-size-16 mt-3'
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