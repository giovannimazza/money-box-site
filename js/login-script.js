(() => {

  $('#loginError').hide();
  $('#loginSuccess').hide();
  $(document).ready(function () {



    const BASE_URL = 'http://localhost:8080';
    document.getElementById('loginSubmit').addEventListener('click', (event) => {

      event.preventDefault();
      //GENERATE TOKEN START
      let email = $('#emailLogin').val().trim();
      let password = $('#passwordLogin').val().trim();
      if (email && password) {
        let params = {
          email: email,
          password: password,
        };
        let jsonParams = JSON.stringify(params);
        $.ajax({
          url: `${BASE_URL}/api/auth/login`,
          contentType: 'application/json;charset=UTF-8',
          type: 'POST',
          data: jsonParams,
          success: function (response) {
            loginSuccess();
            let token = response.accessToken;
            $.cookie('jwt', token);
            JWTHeader = updateHeader();
            $.ajax({
              url: `${BASE_URL}/api/auth/getUserId`,
              contentType: 'application/json;charset=UTF-8',
              type: 'GET',
              beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
              },
              success: function (response) {
                currentId = response;
                //console.log('Id: ' + currentId); 
                $.cookie('id', currentId);
              }
            });
            handleComplete();
          },
          error: function () {

            loginFailure()

          }
          // TAKE ID END
        });
      } else {
        event.preventDefault();
        loginFailure()
      }
    });
  });

  function updateHeader() {
    return {
      Authorization: 'Bearer ' + $.cookie('jwt'),
    };
  }

  function handleComplete() {
    window.setTimeout(function () {
      window.location.href = './home.html';
    }, 1500);
  }

  function loginSuccess() {
    $('#loginSuccess').show(200)
  };

  function loginFailure() {
    $('#loginError').show(200)
    window.setTimeout(function () {
      $('#loginError').hide(200)
    }, 1500);
  }
})();
