activateInputs();
validatingForm();








function validatingForm() {
    const form = document.getElementById('form');
    const email = document.getElementById('email')
    const zipCode = document.getElementById('zip-code');
    const password = document.getElementById('password');
    const cPassword = document.getElementById('cpassword');

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

    errorDisplay.textContent = "success";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function validateInputs() {
    const emailValue = email.value.trim();
    //const zipCodeValue = zipCode.value.trim();
    //const passwordValue = password.value.trim();
    //const cPasswordValue = cPassword.value.trim();

    if (emailValue == "") {
        setErrorMessage(email, "The email is required");
    } else {
        setSuccess(email);
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