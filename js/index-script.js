
$(document).ready(function () {
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
  const BASE_URL = 'http://localhost:8080';

  let JWTHeader = {
    Authorization: 'Bearer ' + $.cookie('jwt'),
  };
});
