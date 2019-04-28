
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confpasswordField = document.getElementById('confirmpassword');
const firstNameField = document.getElementById('firstname');
const lastNameField = document.getElementById('lastname');
const phoneNumberField = document.getElementById('phone');
const registerUser = document.getElementById('registerUser');
const confirmpasswordAlert = document.getElementById('confirmpassword-alert');

const firstNameError = document.getElementById('firstnameError');
const lastNameError = document.getElementById('lastnameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
// const url = 'https://julius-banka.herokuapp.com/api/v1/auth/signup';
const url = 'http://127.0.0.1:8080/api/v1/auth/signup';


const validateSignup = (info) =>{
  const {
    firstName, lastName, password, phoneNumber,confirmpassword, email
  } = info;

  const error = {};

  if (!firstName) {
      error.firstName = 'firstname is required';
  }
  if (!firstName.match(/[^\s-]/)) {
   
      error.firstName =  'Spaces are not allowed';

  }
  if (!isNaN(firstName)) {
    
      error.firstName =  'Firstname must be letters';
  }
  if (firstName.length < 3) {
    
    error.firstName =  'first Name must be atleast 3 alphabets';
  }
  if (!lastName) {
    
      error.lastName =  'lastname is required';
  }
  if (!lastName.match(/[^\s-]/)) {

      error.lastName =  'Spaces are not allowed';
  }
  if (!isNaN(lastName)) {

    error.lastName =  'Lastname must be letters';
  }

  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
      error.email = 'email is required';
  }
  if (!email.match(/[^\s-]/)) {
      error.email = 'Spaces are not allowed';
  }
  if (!email.match(pattern)) {
      error.email = 'Please provide a valid email';
  }
  if (lastName.length < 3) {
      error.lastName = 'last Name must be atleast 3 alphabets';
  }
  if (!password) {
    
    error.password = 'password is required';
  }
  
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,15}$/)) {

      error.password = 'Password must contain atleast one special character, number, uppercase and lowercase letter, min of 6 and max of 15 characters long';
  }
  if (!phoneNumber) {
    
    error.phoneNumber = 'phoneNumber is required';
  }

  if (phoneNumber.toString().replace(/\s/g, '').length === 0) {
    
    error.phoneNumber = 'Phone Number must not empty or white-space ';
  }
  
  /* Check if phhone is a number */
  if (isNaN(phoneNumber)) {
    
    error.phoneNumber = 'Phone Number must be a number ';
  }
  
  /* Check if phone is a whole number */
  if ((phoneNumber % 1) !== 0) {
    
    error.phoneNumber = 'Phone Number must be a positive integer ';
  }
  if (password !== confirmpassword) {
    error.confirmpassword = 'password mismatch';
  }
  return error;
}

const validateInput = (data) => {
  if (data) {
    const registerMessage = document.getElementById('registerMessage');
    registerMessage.style.display = 'block';
    registerMessage.innerHTML = data.error;
  }
};
const getfetch = (content) => {
  fetch(url, content)
    .then(data => data.json())
    .then((response) => {
      if (response.error) {
        validateInput(response);
      } else {
        localStorage.setItem('x-access-token', response.data.token);
        document.getElementById('registerMessage').innerHTML = '';
        const roller = document.getElementById('registerSuccess');
        roller.innerHTML = response.message;
        setTimeout(() => {
          document.getElementById('spinner').style.display = 'block';
          // window.location.href = 'https://czarjulius.github.io/Banka/user_acc_profile.html';
          window.location.href = 'https://czarjulius.github.io/Banka/user_acc_profile.html';
        }, 3000);
      }
    });
};

const signUp = () => {
  const registerBody = {
    email: emailField.value,
    password: passwordField.value,
    firstName: firstNameField.value,
    lastName: lastNameField.value,
    phoneNumber: phoneNumberField.value,
    confirmpassword: confpasswordField.value,
  };
  // console.log('register',registerBody);
  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
}

   const isValid = validateSignup(registerBody);

   if (!isEmpty(isValid)) {     
    const { email, password, firstName, lastName, confirmpassword } = isValid;
    if (firstName) {
      firstNameError.style.display = 'block';
      firstNameError.innerHTML = firstName;
    } else {
      firstNameError.innerHTML = '';
    }
    if (lastName) {
      lastNameError.style.display = 'block';
      lastNameError.innerHTML = lastName;
    } else {
      lastNameError.innerHTML = '';
    }
    if (email) {
      emailError.style.display = 'block';
      emailError.innerHTML = email;
    } else {
      emailError.innerHTML = '';
    }
    if (password) {
      passwordError.style.display = 'block';
      passwordError.innerHTML = password;
    } else {
      passwordError.innerHTML = '';
    }
    if (confirmpassword) {
      confirmpasswordAlert.style.display = 'block';
      confirmpasswordAlert.innerHTML = confirmpassword;
    } else {
      confirmpasswordAlert.innerHTML = '';
    } 
    return false;
   }

   const content = {
    method: 'POST',
    body: JSON.stringify(registerBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  getfetch(content);
};
