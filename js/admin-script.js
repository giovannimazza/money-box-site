
$(document).ready(function () {
    generateCategoriesList();
    console.log(JWTHeader);
})

$('#addNuovaCategoria').click(function () {
    let nomeCategoria = $('#nomeCategoria').val();
    let urlCategoria = $('#urlCategoria').val();
    let params = {
        'categoria': nomeCategoria,
        'url': urlCategoria
    }
    let jsonParams = JSON.stringify(params);
    $.ajax({
        url: `${BASE_URL}/admin/api/categoria/save`,
        contentType: 'application/json;charset=UTF-8',
        type: 'POST',
        data: jsonParams,
        success: function () {
            alert('Nuova categoria inserita con successo')
            window.location.reload();
        },
        failure: function () {
            alert('Cateogoria non inserita');
            window.location.reload();
        }
    })
});

$('#deleteCategoria').click(function () {

    let idCategoria = $('#listaCategorie').val();
    $.ajax({
        url: `${BASE_URL}/admin/api/categoria/delete/${idCategoria}`,
        contentType: 'application/json;charset=UTF-8',
        type: 'DELETE',
        success: function () {
            alert('Categoria eliminata con successo')
            window.location.reload();
        },
        failure: function () {
            alert('La categoria non è stata eliminata');
            window.location.reload();
        }
    })

});

$('#deleteUtente').click(function () {
    let idUtente = $('#idUtente').val();
    $.ajax({
        url: `${BASE_URL}/admin/api/utente/delete/${idUtente}`,
        contentType: 'application/json;charset=UTF-8',
        type: 'DELETE',
        success: function (response) {
            alert('Utente eliminato con successo')
        }
    })
});

function generateCategoriesList() {
    $.ajax({
        url: `${BASE_URL}/utente/api/categoria/get/all`,
        contentType: 'application/json;charset=UTF-8',
        type: 'GET',
        success: function (response) {
            let html = '<option value="0">Scegli una categoria</option>';
            for (let i = 0; i < response.length; i++) {
                html += `<option value="${response[i].id}">${response[i].categoria}</option>`
            }
            document.getElementById('listaCategorie').innerHTML = html;
        }
    })
}

$('#sendEmail').click(function () {
    alert("Notifica inviata a tutti gli utenti")
})

let menu = document.getElementById('menu');
function toggleMenu() {
    menu.classList.toggle('open-menu');
}

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

let logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', () => {
    window.alert('Logout avvenuto con successo!');
    $.cookie('jwt', ''); //elimina il cookie della sessione al logout
    $.cookie('id', ''); //elimina l'id
    JWTHeader = updateHeader();
    window.location.replace('./index.html');
});

function updateHeader() {
    return {
        Authorization: 'Bearer ' + $.cookie('jwt'),
    };
}

$('#creaReport').click(function () {
    generateUserList()
})

function generateUserList() {
    $.ajax({
        url: `${BASE_URL}/admin/api/utente/get/all`,
        contentType: 'application/json;charset=UTF-8',
        headers: JWTHeader,
        type: 'GET',
        success: function (response) {
            let html = '<table> <thead> <tr> <th scope="col">id</th> <th scope="col">username</th> <th scope="col">email</th> </tr> </thead> <tbody>';
            for (let i = 0; i < response.length; i++) {
                html += `<tr> <td data-label="id">${response[i].idUtente}</td> <td data-label="nome">${response[i].username}</td> <td data-label="email">${response[i].email}</td> </tr>`
            }
            html += '</tbody> </table> '
            document.getElementById('tabellaUtenti').innerHTML = html;
            console.log(html);
        }
    });

    
}