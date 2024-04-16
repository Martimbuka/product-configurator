const router = require('express').Router();
const Swal = require('sweetalert2');

const { submit } = require('../controller/appController.js');

// HTTP Request
router.post('/submit', async (req, res) => {
    try {
        let { name, surname, email, phoneNumber } = req.body;


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

        await sendEmail(req, res);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;