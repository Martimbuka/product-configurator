
const swal = require('sweetalert2');

console.log('sendEmail.js loaded');

//listen for a submit
document.getElementById('submit').addEventListener('click', submitForm);

console.log('event listener added');

function submitForm(e) {
    console.log('submitForm called');
    e.preventDefault();
    console.log('preventDefault called');

    // get input values
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value;

    console.log('inputs got');

    // check if the inputs are empty
    if (name === '' || surname === '' || email === '' || phoneNumber === '') {
        swal.fire({
            title: "Грешка!",
            text: "Моля попълнете всички полета.",
            icon: "error"
        });
    }

    // check if the phone number is valid
    if (phoneNumber.length !== 10) {
        swal.fire({
            title: "Грешка!",
            text: "Моля въведете валиден телефонен номер.",
            icon: "error"
        });
    }

    // check if the email is valid
    if (!email.includes('@')) {
        swal.fire({
            title: "Грешка!",
            text: "Моля въведете валиден имейл.",
            icon: "error"
        });
    }

    console.log('inputs checked');

    let fullName = name + ' ' + surname;
    let message = `Име: ${name} ${surname}\nИмейл: ${email}\nТелефонен номер: ${phoneNumber}`;

    // send the email
    sendEmail(fullName, email, message);
}

function sendEmail(fullName, emailInfo, message) {
    console.log('sendEmail called');
    email.send({
        Host: "smtp.gmail.com",
        Username: "martin.jivkov5@gmail.com",
        Password: "4862!9x9HWD21973",
        To: emailInfo,
        From: "martin.jivkov5@gmail.com",
        Subject: "Бланка за поръчка на тапетни врати",
        Body: fullName + '\n' + message,
    }).then(message => {
        if (message === 'OK') {
            swal.fire({
                title: "Успешно изпратена заявка!",
                text: "Данните за заявката може да видите на имейл.",
                icon: "success"
            });
        } else {
            console.error(message);
            alert('There was an error sending your mail');
        }
    });
}

// function emailSend(e) {
//     e.preventDefault();

//     let name = document.getElementById('name').value;
//     let surname = document.getElementById('surname').value;
//     let email = document.getElementById('email').value;
//     let phoneNumber = document.getElementById('phoneNumber').value;

//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "martin.jivkov5@gmail.com",
//         Password: "4862!9x9HWD21973",
//         To: email,
//         From: "martin.jivkov5@gamil.com",
//         Subject: "Бланка за поръчка на тапетни врати",
//         Body: "Hello world!",
//     })
//         .then(message => {

//             if (message === 'OK') {
//                 fire({
//                     title: "Успешно изпратена заявка!",
//                     text: "Данните за заявката може да видите на имейл.",
//                     icon: "success"
//                 });
//             } else {
//                 console.error(message);
//                 alert('There was an error sending your mail');
//             }
//         });
// }
