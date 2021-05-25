// retrieving Emelmet from DOM

let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');


// Functions

// Error func
function showError(input) {
    const uFormControl = input.parentElement;
    uFormControl.className = 'form_control error'
}

// Success func
function showSuccess(input) {
    const uFormControl = input.parentElement;
    uFormControl.className = 'form_control success'
}

// Func to check email
function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // return re.test(String(input).toLowerCase());
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input);
    }

}

//Func for check required
function checkRequired(inputArry) {
    inputArry.forEach(function (input) {
        if (input.value === '') {
            showError(input);
        } else {
            showSuccess(input)
        }
    });
}

// Func to check length
function checkLength(input,min,max) {
    if (input.value.length < min) {
        showError(input);
    } else if(input.value.length > max){
        showError(input);
    } else {
        showSuccess(input);
    }
}
// Check password match
function checkPasswordMatch(input1,input2) {
    if (input1.value !== input2.value) {
        showError(input2);
    }
}

// Error func
// function showError(input,message){
//     const formControl = input.parentElement;
//     formControl.className = 'form_control error';
//     const small = formControl.querySelector('small');
//     small.innerText = message;
// }
// Success func
// function showSucess(input){
//     const formControl = input.parentElement;
//     formControl.className = 'form_control success'
// }
// function to check
// function checkRequired(inputArray) {
//     inputArray.forEach(function(input) {
//         if (input.value === '') {
//             showError(input,`${input.id.charAt(0).toUpperCase()}${input.id.slice(1)} is Required`)
//         } else {
//             showSucess(input)
//         }
//     });
// }
// Email validate
// function checkEmail(input) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     // return re.test(String(input).toLowerCase());
//     if (re.test(input.value.trim())) {
//         showSucess(input)
//     } else {
//         showError(input,`Enter valid email`)
//     }
// }
// check length
// function checkLength(input, min, max) {
//     if (input.value.length < min) {
//         showError(input,`${input.id.charAt(0).toUpperCase()}${input.id.slice(1)} length is less than ${min}`)
//     } else if(input.value.length > max ){
//         showError(input,`${input.id.charAt(0).toUpperCase()}${input.id.slice(1)} length is less than ${max}`)
//     }else {
//         showSucess(input);
//     }
// }
// function checkPasswordMatch(input1,input2) {
//     if (input1.value !== input2.value) {
//         showError(input2,"Password don't match")
//     }
// }







// create Event listner

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 10);
    isValidEmail(email);
    checkPasswordMatch(password, password2);

    //For username
    // if (username.value === '') {
    //     showError(username);
    // } else{
    //     showSuccess(username);
    // }
    // // For email
    // if (email.value === '') {
    //     showError(email);
    // } else if (!isValidEmail(email.value)) {
    //     showError(email);
    // }
    // else {
    //     showSuccess(email);
    // }
    // // For password
    // if (password.value === '') {
    //     showError(password);
    // } else{
    //     showSuccess(password);
    // }
    // // For password2
    // if (password2.value === '') {
    //     showError(password2);
    // } else{
    //     showSuccess(password2);
    // }
    
})


// form.addEventListener('submit',function(e){
//     e.preventDefault();

//     checkRequired([username, email, password, password2]);
//     checkLength(username, 3, 20);
//     checkLength(password, 6, 30);
//     checkEmail(email);
//     checkPasswordMatch(password,password2)
// })