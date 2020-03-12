"use strict"

window.onload = function () {

    let data;

    let profielId = sessionStorage.getItem("id")
        if (profielId===null){
            window.location.replace("home.html")
            document.getElementById("geenLogin").innerText="gelieven in te loggen"
        }else{
            document.getElementById("geenLogin").innerText=""
            /*document.getElementById("verwijderen").disabled=false;*/
            leesUser();
        }

    

    async function leesUser(){
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + profielId;
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {

            let profielData = data;

            document.getElementById('detailNick').value = profielData.nickname;
            document.getElementById('detailFnaam').value = profielData.familienaam;
            document.getElementById('detailVnaam').value = profielData.voornaam;
            document.getElementById('detailGeboortedatum').value = profielData.geboortedatum;
            document.getElementById('detailHaarkleur').value = profielData.haarkleur;
            document.getElementById('detailBeroep').value = profielData.beroep;
            document.getElementById('detailEmail').value = profielData.email;
            document.getElementById('detailLovecoins').value = profielData.lovecoins;
            document.getElementById('detailFoto').setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + profielData.foto);
            document.getElementById('detailFoto').setAttribute('alt', 'foto van ' + profielData.voornaam + ' ' + profielData.familienaam);
            document.getElementById('profielVan').innerText = 'Details van ' + profielData.voornaam + ' ' + profielData.familienaam;

        })
        .catch(function (error) { console.log(error); });
    }

    document.getElementById('btnSubmit').addEventListener('click', function (e) {
        let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

        profielData.nickname = document.getElementById('detailNick').value;
        profielData.familienaam = document.getElementById('detailFnaam').value;
        profielData.voornaam = document.getElementById('detailVnaam').value;
        profielData.geboortedatum = document.getElementById('detailGeboortedatum').value;
        profielData.haarkleur = document.getElementById('detailHaarkleur').value;
        profielData.beroep = document.getElementById('detailBeroep').value;
        profielData.email = document.getElementById('detailEmail').value;
        profielData.lovecoins = document.getElementById('detailLovecoins').value;

        var request = new Request(urlUpdate, {
            method: 'PUT',
            body: JSON.stringify(profielData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });

    });         
};

document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
}

document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
}

/*let id = sessionStorage.getItem("id")
console.log(id)
if (id===null){
    window.location.replace("home.html")
    document.getElementById("geenLogin").innerText="gelieven in te loggen"
}else{
    document.getElementById("geenLogin").innerText=""
    document.getElementById("verwijderen").disabled=false;
    leesUser();
}
*/

/*Update functie van scrumsite

document.getElementById('aanpassen').addEventListener('click', function (e) {
    let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

    profielData.nickname = document.getElementById('username').value;
    //profielData.familienaam = document.getElementById('detailFnaam').value;
    //profielData.voornaam = document.getElementById('detailVnaam').value;
    //profielData.geboortedatum = document.getElementById('detailGeboortedatum').value;
    profielData.haarkleur = document.getElementById('hair').value;
    profielData.beroep = document.getElementById('job').value;
    profielData.email = document.getElementById('mail').value;
    //profielData.lovecoins = document.getElementById('detailLovecoins').value;

    var request = new Request(urlUpdate, {
        method: 'PUT',
        body: JSON.stringify(profielData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (resp) { return resp.json(); })
        .then(function (data) { console.log(data); })
        .catch(function (error) { console.log(error); });

});
             




*/