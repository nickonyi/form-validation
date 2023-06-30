const form = document.getElementById('form');
const email = document.getElementById('email')
const zipCode = document.getElementById('zip-code');
const country = document.getElementById('country')
const password = document.getElementById('password');
const cPassword = document.getElementById('password2');
activateInputs();
validatingForm();








function validatingForm() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        validateInputs();
    });
}

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

function validateInputs() {

    const emailValue = email.value.trim();
    const zipCodeValue = zipCode.value.trim();
    const countryValue = country.value.trim();
    const passwordValue = password.value.trim();
    const cPasswordValue = cPassword.value.trim();

    if (emailValue == "") {
        setErrorMessage(email, "The email is required");
    } else if (!isValidEmail(emailValue)) {
        setErrorMessage(email, "Put a valid email");
    } else {
        setSuccess(email);
    }

    if (zipCodeValue == "") {
        setErrorMessage(zipCode, "The zip code is required");
    } else {
        setSuccess(zipCode);
    }

    if (countryValue == "") {
        setErrorMessage(country, "The country value is required");
    } else {
        setSuccess(country);
    }

    if (passwordValue == "") {
        setErrorMessage(password, "Password is required");
    } else if (passwordValue.length < 8) {
        setErrorMessage(password, "The password is less than 8 characters");
    } else {
        setSuccess(password);
    }

    if (cPasswordValue == "") {
        setErrorMessage(cPassword, "Please confirm password");
    } else if (passwordValue !== cPasswordValue) {
        setErrorMessage(cPassword, "The password does not match!");
    } else {
        setSuccess(cPassword);
    }
}




function activateInputs() {
    // Select all input elements
    var inputs = document.querySelectorAll("input");

    // Add event listener for focusin
    inputs.forEach(function(input) {
        input.addEventListener("focusin", function() {
            this.parentNode.querySelector("label").classList.add("active");
        });
    });

    // Add event listener for focusout
    inputs.forEach(function(input) {
        input.addEventListener("focusout", function() {
            if (!this.value) {
                this.parentNode.querySelector("label").classList.remove("active");
            }
        });
    });
}