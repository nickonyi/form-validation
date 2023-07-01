const form = document.getElementById('form');
const formFields = document.querySelectorAll('.form-fields');
const email = document.getElementById('email');
const zipCode = document.getElementById('zip-code');
const country = document.getElementById('country')
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

formFields.forEach(field => {
    field.addEventListener('blur', (e) => {
        validateForm(field);
    });

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formFields.forEach(field => {
        validateForm(field);
    });


    const errors = document.querySelectorAll('.error');
    const successBox = document.querySelector('.success-payment-popup');

    if (errors.length === 5) {
        form.classList.add('hidden');
        successBox.classList.remove('hidden');
    }
});


function setErrorMessage(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.textContent = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');


    errorDisplay.textContent = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}





function validateForm(field) {
    const value = field.value.trim();
    // Perform validation based on field ID
    if (field.id == "email") {
        if (value == "") {
            setErrorMessage(email, "We need an email wewe mzee");
        } else if (!isValidEmail(value)) {
            setErrorMessage(email, 'Wewe mzee eka email mzuri!');
        } else {
            setSuccess(email);
        }
    }

    if (field.id == 'zip-code') {
        if (value == "") {
            setErrorMessage(zipCode, "Wewe mzee tunataka kujua pali unaishi!");

        } else {
            setSuccess(zipCode);
        }
    }


    if (field.id == 'country') {
        if (value == "") {
            setErrorMessage(country, "Hata hiyo nchi tunataka kujua pia");
        } else {
            setSuccess(country);
        }
    }

    if (field.id == 'password') {
        if (value == "") {
            setErrorMessage(password, "Paaaaasuad my guy!");
        } else if (value.length < 8) {
            setErrorMessage(password, "Na passuuad ikue strong mzee!!");
        } else {
            setSuccess(password);
        }
    }

    if (field.id == 'password2') {
        const passwordValue = password.value.trim();
        if (value == "") {
            setErrorMessage(password2, "Hebu rudia hio paaasuuuad tena!");
        } else if (passwordValue != value) {
            setErrorMessage(password2, "We mzee pasuaaad hazifanani!");
        } else {
            setSuccess(password2);
        }
    }
}