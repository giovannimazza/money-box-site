let idUtente = $.cookie('id');
//apertura dropdown menu navbar
let menu = document.getElementById('menu');
function toggleMenu() {
  menu.classList.toggle('open-menu');
}
if ($.cookie('id') != 2) {
  $('#adminPanel').hide();
}
if ($.cookie('id') == 2) {
  $('#lista').hide();
}
$(document).ready(function () {
  generateTransazioni();
  generateCategoriesList();
  generateWallet();
  generateSpendingPlan();
  generateBudget()
  generateProfileImgs();
  // Ascoltatore di eventi per i radio button
  $('input[type=radio][name=radiotransazione]').change(function () {
    // Controlla se il radio button "Entrate" è selezionato
    if (this.value == 'entrata') {
      // Se sì, disabilita il menu a discesa
      document.getElementById("select-category").value = "5";
      document.getElementById('select-category').setAttribute("disabled", "true")
    }
    else {
      // Altrimenti, abilita il menu a discesa
      document.getElementById("select-category").value = "0";
      $('#select-category').attr('disabled', false);
    }
  });

})


//apertura e chiusura modali account navbar
let navModalOpen = document.querySelectorAll('.nav-modal-open');

navModalOpen.forEach(function (a) {
  a.onclick = function () {
    let modal = a.getAttribute('data-modal');
    document.getElementById(modal).style.display = 'block';
    toggleMenu()
  };
});

let navModalClose = document.querySelectorAll('.nav-modal-close');

navModalClose.forEach(function (btn) {
  btn.onclick = function () {
    let modal = (btn.closest('.personal-modal').style.display = 'none');

  };
});

let logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', () => {
  $.cookie('jwt', ''); //elimina il cookie della sessione al logout
  $.cookie('id', ''); //elimina l'id
  JWTHeader = updateHeader();
  logoutSuccess();

  window.setTimeout(function () {
    window.location.replace('./index.html');
  }, 1500);
});



//gestione apertura e chiusura modali nella grid
let modalOpen = document.querySelectorAll('.modal-open');

modalOpen.forEach(function (btn) {
  btn.onclick = function () {
    let modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = 'block';
    document.getElementById("select-category").value = "5";
    let menu = document.getElementById('menu')
    if (menu.classList.contains('open-menu')) {
      toggleMenu()
    }
  };
});

let modalClose = document.querySelectorAll('.modal-close');

modalClose.forEach(function (btn) {
  btn.onclick = function () {
    let modal = (btn.closest('.personal-modal').style.display = 'none');
  };
});

let saveBtn = document.querySelectorAll('.saveBtn');
saveBtn.forEach(function (btn) {
  btn.onclick = function () {
    let modal = (btn.closest('.personal-modal').style.display = 'none');
  };
});

modalClose.forEach(function (btn) {
  btn.onclick = function () {
    let modal = (btn.closest('.personal-modal').style.display = 'none');
  };
});

window.onclick = function (e) {
  if (e.target.className === 'personal-modal') {
    e.target.style.display = 'none';

  }
};

function updateHeader() {
  return {
    Authorization: 'Bearer ' + $.cookie('jwt'),
  };
}

//Save Transaction
var saveTransazioni = document.getElementById('save-transaction');
saveTransazioni.addEventListener('click', function () {
  let tipoTransazione = document.querySelector('input[name="radiotransazione"]:checked').value;
  let categoria = $('#select-category').val();
  let importo = $('#importoTransazione').val();
  let descrizione = document.getElementById("descrizioneTransazione").value;
  let params = {
    "descrizione": descrizione
  };
  let jsonParams = JSON.stringify(params);
  if (tipoTransazione == 'entrata') {
    $.ajax({
      url: `${BASE_URL}/utente/api/transazione/accredito/${idUtente}/5/${importo}`,
      contentType: 'application/json;charset=UTF-8',
      headers: JWTHeader,
      type: 'POST',
      data: jsonParams,
      success: function (response) {
        transactionSuccess()
        window.setTimeout(function () {
          window.location.reload()
        }, 1000);
      },
      error: function (response) {
        transactionError()
        window.setTimeout(function () {
          window.location.reload()
        }, 1000);
      }
    });
  } else {
    $.ajax({
      url: `${BASE_URL}/utente/api/transazione/addebito/${idUtente}/${categoria}/${importo}`,
      contentType: 'application/json;charset=UTF-8',
      type: 'POST',
      headers: JWTHeader,
      data: jsonParams,
      success: function (response) {
        transactionSuccess()
        window.setTimeout(function () {
          window.location.reload()
        }, 1000);
      },
      error: function (response) {
        transactionError()
        window.setTimeout(function () {
          window.location.reload()
        }, 1000);
      }
    });
  }
});

function generateCategoriesList() {
  $.ajax({
    url: `${BASE_URL}/utente/api/categoria/get/all`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'GET',
    success: function (response) {
      let html = '<option value="0">Scegli una categoria</option>';
      for (let i = 0; i < response.length; i++) {
        html += `<option value="${response[i].id}">${response[i].categoria}</option>`
      }
      document.getElementById('select-category').innerHTML = html;
    }
  })
}

function generateWallet() {
  $.ajax({
    url: `${BASE_URL}/utente/api/portafoglio/${idUtente}`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'GET',
    success: function (response) {
      if (response.saldo < 0) {
        document.getElementById('saldo').setAttribute('class', 'negativo');
      } else {
        document.getElementById('saldo').setAttribute('class', 'positivo');
      }
      document.getElementById('saldo').textContent = (Math.round(response.saldo * 100) / 100).toFixed(2);
    }
  })
}

function generateTransazioni() {
  $.ajax({
    url: `${BASE_URL}/utente/api/transazione/get/idu/${idUtente}`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'GET',
    success: function (response) {
      let html = ``;
      for (let i = 0; i < response.length; i++) {
        html += `<div class="item-container"> <div class="img"> <img src="${response[i].url}" alt="" /> </div> <div class="text-content item"> <span id="transazione-nome"> ${response[i].descrizione} </span> <br /> <span id="data-transazione">${response[i].data}</span> </div> <div class="text-content-money">`;
        if (response[i].tipo == 'entrata') {
          html += `<span class="entrata" id="soldi">+${response[i].importo}</span> </div> </div>`
        } else if (response[i].tipo == 'uscita') {
          html += `<span class="uscita" id="soldi">-${response[i].importo}</span> </div> </div>`
        }
      }
      document.getElementById('containerTransazioni').innerHTML = html;
    }
  });
}


$('#save-spendingplan').click(function () {
  let nomeSp = $('#nomeSpendingPlan').val();
  $.ajax({
    url: `${BASE_URL}/utente/api/spendingplan/save/${idUtente}/${nomeSp}`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'POST',
    success: function (response) {
      window.location.reload();
      spendingPlanSuccess();
    }
  });
})

function logoutSuccess() {
  $('#logoutSuccess').show(200)
};
function transactionSuccess() {
  $('#transactionSuccess').show(200)
};
function transactionError() {
  $('#transactionError').show(200);
}
function spendingPlanSuccess() {
  $('#spendingPlanSuccess').show(200);
}
function savePassword() {
  $('#savePsw').show(200);
  window.setTimeout(function () {
    $('#savePsw').hide(200);
  }, 1000);
}

function savePswError() {
  $('#savePswError').show(200);
  window.setTimeout(function () {
    $('#savePswError').hide(200);
  }, 1000)
}

function setImage() {
  $('#setImage').show(200);
  window.setTimeout(function () {
    $('#setImage').hide(200);
  }, 1000);

}
function generateSpendingPlan() {
  $.ajax({
    url: `${BASE_URL}/utente/api/spendingplan/get/${idUtente}`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'GET',
    success: function (response) {
      html = '';
      for (let i = response.length - 1; i >= 0; i--) {
        html += `<div class="spending-content"> <div class="spending-nome">${response[i].nome}</div> <div class="spending-codice">${response[i].codiceCondivisione}</div> </div>`
      }
      document.getElementById('spContainer').innerHTML = html;
    }
  });
}

function generateBudget() {
  $.ajax({
    url: `${BASE_URL}/utente/api/transazionibycategoria/${idUtente}`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'GET',
    success: function (response) {
      html = '<span class="title-riquadri">Storico spese</span>';
      for (let i = 0; i < response.length; i++) {
        html += `<div class="budget-${response[i].categoria} budget-items"> <img src="${response[i].url}" class="budget-icon"> <span>${response[i].categoria}</span> <span>€${response[i].importo}</span> </div>`
      }
      document.getElementById('budget').innerHTML = html;
    }
  });
}

$('#editpassword').click(function () {
  let password = $('#pass-form').val();
  let confirmPassword = $('#pass-form').val();
  $.ajax({
    url: `${BASE_URL}/utente/api/utente/changepassword/${idUtente}/${password}/${confirmPassword}`,
    contentType: 'application/json;charset=UTF-8',
    type: 'PUT',
    headers: JWTHeader,
    success: function (response) {
      console.log(response);
      if (response) {
        savePassword()
        document.getElementById('pass-form').value = "";
        document.getElementById('confirm-pass-form').value = "";
      } else {
        savePswError();
      }
    }
  });
});

$('#uploadImgButton').click(function () {
  let url = $('#picUrl').val();
  params = {
    'urlImage': url
  }
  let jsonParams = JSON.stringify(params);
  $.ajax({
    url: `${BASE_URL}/utente/api/utente/setimg/${idUtente}`,
    contentType: 'application/json;charset=UTF-8',
    type: 'PUT',
    headers: JWTHeader,
    data: jsonParams,
    success: function (response) {
      document.getElementById('userPic').src = response.urlImage;
      document.getElementById('profile-pic').src = response.urlImage;
      setImage()
      document.getElementById('picUrl').value = "";
    }
  });
});

function generateProfileImgs() {
  $.ajax({
    url: `${BASE_URL}/utente/api/utente/getimg/${idUtente}`,
    contentType: 'application/json;charset=UTF-8',
    headers: JWTHeader,
    type: 'GET',
    success: function (response) {
      if (response.urlImage != null) {
        document.getElementById('userPic').setAttribute('src', `${response.urlImage}`)
        document.getElementById('profile-pic').setAttribute('src', `${response.urlImage}`)
      } else {
        document.getElementById('userPic').setAttribute('src', "./immagini/images.png")
        document.getElementById('profile-pic').setAttribute('src', `./immagini/images.png`)
      }
    }
  });
}




