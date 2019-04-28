const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');


const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const loginMessage = document.getElementById('loginMessage');

const url = 'https://julius-banka.herokuapp.com/api/v1/auth/signin';
// const url = 'http://127.0.0.1:8080/api/v1/auth/signin';


const validateSignin = (info) =>{
  const { password, email } = info;
  const error = {};
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
  
  if (!password) {
    
    error.password = 'password is required';
  }
  
  return error;
}

const validateErrorMessage = (data) => {
  if (data) {
    loginMessage.style.display = 'block';
    loginMessage.innerHTML = data;
    ;
  } else {
    loginMessage.innerHTML = '';
  }
};


const successLogin = (response) => {
  localStorage.setItem('x-access-token', response.data.token);
  
  document.getElementById('loginMessage').innerHTML = '';
  const roller = document.getElementById('loginSuccess');
  roller.innerHTML = response.message;
  setTimeout(() => {
    document.getElementById('spinner').style.display = 'block';
    if (response.data.type === 'user') {
      window.location.href = 'https://czarjulius.github.io/Banka/user_acc_profile.html';

    }else if (response.data.type === 'staff' && response.data.isAdmin === false) {
      window.location.href =  'https://czarjulius.github.io/Banka/staff_edit_user.html';
    } else {
      window.location.href =  'https://czarjulius.github.io/Banka/all_transactions.html';
    }

  }, 3000);
};

const login = () => {
  const registerBody = {
    email: emailField.value,
    password: passwordField.value,
  };

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
    }
    return true;
}

const isValid = validateSignin(registerBody);
if (!isEmpty(isValid)) {     
  const { email, password } = isValid;
  
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
  return false;
 }


  const content = {
    method: 'POST',
    body: JSON.stringify(registerBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url, content)
    .then(data => data.json())
    .then((response) => {
      if (response.error) {
        validateErrorMessage(response.error);
      } else {
        successLogin(response);
      }
    });
};
