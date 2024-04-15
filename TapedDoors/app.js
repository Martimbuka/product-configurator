// import Swal from 'sweetalert2';
// import Email from './lib/smtp.js';

window.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById("test");
    if (submit) {
      submit.addEventListener('click', submitForm);
    } else {
      console.error("Submit button with ID 'submit' not found");
    }
  });

function submitForm(e) {
    e.preventDefault();

    // get input values
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value;


    // check if the inputs are empty
    if (name === '' || surname === '' || email === '' || phoneNumber === '') {
        Swal.fire({
            title: "Грешка!",
            text: "Моля попълнете всички полета.",
            icon: "error"
        });

        return;
    }

    // check if the email is valid
    if (!email.includes('@')) {
        Swal.fire({
            title: "Грешка!",
            text: "Моля въведете валиден имейл.",
            icon: "error"
        });

        return;
    }


    let fullName = name + ' ' + surname;
    let message = `Име: ${name} ${surname}\nИмейл: ${email}\nТелефонен номер: ${phoneNumber}`;

      

    sendEmail(fullName, email, message);
}

function sendEmail(fullName, emailInfo, message) {
    console.log('sendEmail called');
    Email.send({
        SecureToken: "c88d1e8e-5ab9-44cc-b60c-579bd3b4c3e1",
        To: emailInfo,
        From: "martin.jivkov@prodes.bg",
        Subject: "Бланка за поръчка на тапетни врати",
        Body: fullName + '\n' + message
    }).then(message => {
        if (message === 'OK') {
            Swal.fire({
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
