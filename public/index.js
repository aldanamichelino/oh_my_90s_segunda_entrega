const goToRegister = document.getElementById('go-to-register-form');
const goToLogin = document.getElementById('go-to-login-form');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerForm.style.display = 'none';

goToRegister.addEventListener('click', function(){
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
});

goToLogin.addEventListener('click', function(){
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});
