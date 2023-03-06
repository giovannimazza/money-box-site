(() => {
    $(document).ready(function () {
        const BASE_URL = 'http://localhost:8080';
        //VALIDAZIONE REGISTRAZIONE
        document.getElementById('submit').addEventListener('click', (e) => {
            if (validateEmail() && validateUsername() && validateTerms() && validatePassword()) {
                e.preventDefault();
                let username = document.getElementById('username').value.trim();
                let email = document.getElementById('email').value.trim();
                let password = document.getElementById('password').value.trim();

                let params = {
                    username: username,
                    email: email,
                    password: password
                };
                let jsonParams = JSON.stringify(params);
                $.ajax({
                    url: `${BASE_URL}/api/auth/signup`,
                    contentType: 'application/json;charset=UTF-8',
                    type: "POST",
                    data: jsonParams,
                    success: function (response) {
                        console.log('response = ' + JSON.stringify(response));
                        alert(JSON.stringify(response));
                        reset();
                    },
                    error: function (status) {
                        console.log('status = ' + JSON.stringify(status));
                        alert(status.responseText);
                    }
                })


            } else {
                e.preventDefault();
                alert('Errore');

            }
        });
    }
    );

    const wrapper = document.querySelector('.wrapper'),
        signupHeader = document.querySelector('.signup header'),
        loginHeader = document.querySelector('.login header');

    loginHeader.addEventListener('click', () => {
        wrapper.classList.add('active');
    });
    signupHeader.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });
    var idUtente;


    let JWTHeader = {
        Authorization: 'Bearer ' + $.cookie('jwt'),
    };

    function validateUsername() {
        const usernameFormatSpecial = new RegExp(/\W|_/g)
        const usernameField = document.getElementById("username");
        const username = usernameField.value;
        if (username.length < 4) {
            alert("L'username deve avere almeno 4 caratteri");
            usernameField.style = "border: solid #dc3545";
            return false;
        }
        if (username.match(usernameFormatSpecial)) {
            alert("Username non valido. Usa solo caratteri e numeri");
            usernameField.style = "border: solid #dc3545";
            return false;
        }
        return true;

    }

    function validateEmail() {
        const emailField = document.getElementById("email");
        const email = emailField.value;
        var mailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (email !== "" && email.match(mailFormat)) {
            emailField.style = "border: none";
            return true;
        } else {
            alert("Email inserita non valida");
            emailField.style = "border: solid #dc3545";
            return false;
        }
    }

    function validateTerms() {
        const checkbox = document.getElementById('signupCheck');

        if (!checkbox.checked) {
            alert("Devi accettare i termini e condizioni");
            return false;
        } else {
            return true;
        }
    }

    //Password check
    const passwordField = document.getElementById("password");
    const passwordConfirmField = document.getElementById("passwordConfirm");

    function validatePassword() {
        let check = true;
        if (!validatePasswordConfirm()) {
            check = false;
        }
        if (!validatePasswordLength()) {
            check = false;
        }
        if (!hasUpperCase()) {
            check = false;
        }
        if (!hasLowerCase()) {
            check = false;
        }
        if (!hasDigit()) {
            check = false;
        }
        if (!hasSpecial()) {
            check = false;
        }
        return (check);


    }
    function validatePasswordConfirm() {
        if (passwordField.value !== passwordConfirmField.value) {
            alert("Le password non sono uguali");
            passwordField.style = "border: solid #dc3545";
            passwordConfirmField.style = "border: solid #dc3545";
            return false;
        } else {
            return true;
        }
    }
    function validatePasswordLength() {
        if (passwordField.value.length > 7) {
            return true;
        } else {
            alert('La password deve avere almeno 7 caratteri');
            passwordField.style = "border: solid #dc3545";
            passwordConfirmField.style = "border: solid #dc3545";
            return false;
        }
    }
    function hasUpperCase() {
        let passwordFormatUpper = new RegExp("[A-Z]");
        if (passwordField.value.match(passwordFormatUpper)) {
            return true;
        } else {
            alert('La password deve avere almeno una lettera maiuscola');
            passwordField.style = "border: solid #dc3545";
            passwordConfirmField.style = "border: solid #dc3545";
            return false;
        }
    }
    function hasLowerCase() {
        let passwordFormatLower = new RegExp("[a-z]");
        if (passwordField.value.match(passwordFormatLower)) {
            return true;
        } else {
            alert('La password deve avere almeno una lettera minuscula');
            passwordField.style = "border: solid #dc3545";
            passwordConfirmField.style = "border: solid #dc3545";
            return false;
        }
    }
    function hasDigit() {
        let passwordFormatDigit = new RegExp("[0-9]");
        if (passwordField.value.match(passwordFormatDigit)) {
            return true;
        } else {
            alert('La password deve avere almeno un numero');
            passwordField.style = "border: solid #dc3545";
            passwordConfirmField.style = "border: solid #dc3545";
            return false;
        }
    }
    function hasSpecial() {
        let passwordFormatSpecial = new RegExp(/\W|_/g);
        if (passwordField.value.match(passwordFormatSpecial)) {
            return true;
        } else {
            alert('La password deve avere almeno un carattere speciale');
            passwordField.style = "border: solid #dc3545";
            passwordConfirmField.style = "border: solid #dc3545";
            return false;
        }
    }

    function reset() {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const passwordConfirm = document.getElementById('passwordConfirm');

        username.value = "";
        email.value = "";
        password.value = "";
        passwordConfirm.value = "";
    }
})();