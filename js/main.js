
let emailIn = document.getElementById("emailIn")
let passwordIn = document.getElementById("passwordIn")
let fillMsg = document.getElementById("fillMsg")
let errorMsg = document.getElementById("errorMsg")

let nameUp = document.getElementById("nameUp")
let emailUp = document.getElementById("emailUp")
let passwordUp = document.getElementById("passwordUp")
let nameAlert = document.getElementById("nameAlert")
let emailAlert = document.getElementById("emailAlert")
let passwordAlert = document.getElementById("passwordAlert")
let confirmPasswordUp = document.getElementById("confirmPasswordUp")
let confirmPasswordAlert = document.getElementById("confirmPasswordAlert")
let confirmMsg = document.getElementById("confirmMsg")
let existMsg = document.getElementById("existMsg")
let failMsg = document.getElementById("failMsg")
let authorizationType = document.getElementById("1");

let userInfo = []

if (localStorage.getItem("users") == null) {
    userInfo = []
} else {
    userInfo = JSON.parse(localStorage.getItem("users"))
}

const btnLogin = document.getElementById("btnLogin")

if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        logIn();
    });
}


const btnSignup = document.getElementById("btnSignup");
if (btnSignup) {
    btnSignup.addEventListener("click", (e) => {
        e.preventDefault();
        signUp();
    });
}




function signUp() {

    if (validateUp() && !isExist()) {
        let signUpData = {
            nameUp: nameUp.value,
            emailUp: emailUp.value,
            passwordUp: passwordUp.value,
            confpass: confirmPasswordUp.value,
            authorization: authorizationType.value 
        };
        userInfo.push(signUpData);
        localStorage.setItem("users", JSON.stringify(userInfo));
        existMsg.classList.replace("d-block", "d-none");
        failMsg.classList.replace("d-block", "d-none");
        confirmMsg.classList.replace("d-none", "d-block");
    } else if (isExist()) {
        existMsg.classList.replace("d-none", "d-block");
        failMsg.classList.replace("d-block", "d-none");
        confirmMsg.classList.replace("d-block", "d-none");
    } else {
        failMsg.classList.replace("d-none", "d-block");
        existMsg.classList.replace("d-block", "d-none");
        confirmMsg.classList.replace("d-block", "d-none");
    }
}
function validateName() {

    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/

    if (regex.test(nameUp.value) == true && nameUp.value != "") {

        nameAlert.classList.replace("d-block", "d-none")

        return true

    } else {

        nameAlert.classList.replace("d-none", "d-block")

        return false
    }
}

function validateemail() {
    let regex = /^[a-zA-Z0-9]{3,15}@[a-z]{5,10}\.com$/
    if (regex.test(emailUp.value) == true && emailUp.value != "") {

        emailAlert.classList.replace("d-block", "d-none")

        return true
    } else {

        emailAlert.classList.replace("d-none", "d-block")
        return false
    }
}

function validatePass() {
    let regex = /^.{6,15}/
    if (regex.test(passwordUp.value) == true && passwordUp.value != "") {

        passwordAlert.classList.replace("d-block", "d-none")
        return true
    } else {

        passwordAlert.classList.replace("d-none", "d-block")

        return false
    }
}

function validateConfirm() {
    if (confirmPasswordUp.value === passwordUp.value && confirmPasswordUp.value !== "") {
        confirmPasswordAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        confirmPasswordAlert.classList.replace("d-none", "d-block");
        return false;
    }
}




function validateUp() {
    validateName()
    validateemail()
    validatePass()
    validateConfirm()

    if (validateName() == true && validateemail() == true && validatePass() == true && validateConfirm() == true) {

        return true
    } else {

        return false
    }
}

function isExist() {

    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].emailUp == emailUp.value) {
            existMsg.classList.replace("d-none", "d-block")
            return true
        }
    }
    existMsg.classList.replace("d-block", "d-none")
    return false

}

function logIn() {
    if (emailIn.value == "" || passwordIn.value == "") {
        fillMsg?.classList.replace("d-none", "d-block");
        errorMsg?.classList.replace("d-block", "d-none");
        failMsg?.classList.replace("d-block", "d-none");
        existMsg?.classList.replace("d-block", "d-none");
        confirmMsg?.classList.replace("d-block", "d-none");
    } else {
        fillMsg.classList.replace("d-block", "d-none");
        for (let i = 0; i < userInfo.length; i++) {
            if (emailIn.value == userInfo[i].emailUp && passwordIn.value == userInfo[i].passwordUp) {
                errorMsg?.classList.replace("d-block", "d-none");
                failMsg?.classList.replace("d-block", "d-none");
                existMsg?.classList.replace("d-block", "d-none");
                confirmMsg?.classList.replace("d-none", "d-block");
                localStorage.setItem("loged", userInfo[i].nameUp);
                window.location.href = "../Home.html";
                return;
            }
        }
        errorMsg?.classList.replace("d-none", "d-block");
        failMsg?.classList.replace("d-block", "d-none");
        existMsg?.classList.replace("d-block", "d-none");
        confirmMsg?.classList.replace("d-block", "d-none");
    }
}
document.getElementById("btnLogout")?.addEventListener("click", () => {
    localStorage.removeItem("loged");
    window.location.href = "../index.html";
}
)

// document.addEventListener("DOMContentLoaded", function () {
//     let emailUp = document.getElementById("emailUp");
//     let passwordUp = document.getElementById("passwordUp");
//     let Register = document.getElementById("Register");

//     async function register() {
//         try {
//             let response = await fetch("https://reqres.in/api/register", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: emailUp.value,
//                     password: passwordUp.value
//                 })
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to register');
//             }
//             let data = await response.json();
//             localStorage.setItem("token", data.token);
//             console.log(data);
//         } catch (error) {
//             console.error('Error registering:', error);
//         }
//     }

// Register.addEventListener("click", function (e) {
//     e.preventDefault();
//     register();
// });

//     let emailIn = document.getElementById("emailIn");
//     let passwordIn = document.getElementById("passwordIn");
//     let Login = document.getElementById("Login");

//     async function login() {
//         try {
//             let response = await fetch("https://reqres.in/api/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: emailIn.value,
//                     password: passwordIn.value
//                 })
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to login');
//             }
//             let data = await response.json();
//             localStorage.setItem("token", data.token);
//             console.log(data);
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     }

//     Login.addEventListener("click", async function (e) {
//         e.preventDefault();
//         await login();
//     });
// });
