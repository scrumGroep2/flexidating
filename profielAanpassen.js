"use strict"
let id = sessionStorage.getItem("id")
console.log(id)
if (id===null){
    window.location.replace("home.html")
    document.getElementById("geenLogin").innerText="gelieven in te loggen"
}else{
    document.getElementById("geenLogin").innerText=""
    /*document.getElementById("verwijderen").disabled=false;*/
    leesUser();
}
async function leesUser(){
    fetch(`https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=${id}`)
    .then(function (resp)   { return resp.json(); })
    .then(function (data)   { 
        console.log(data); 
        document.getElementById("username").innerText=data.nickname;
        document.getElementById("coin").src="lovecoin.jpg";
        document.getElementById("lovecoins").innerText=data.lovecoins;
        document.getElementById("foto").src=`https://scrumserver.tenobe.org/scrum/img/${data.foto}`;
        document.getElementById("name").innerText=`${data.voornaam} ${data.familienaam}`;
        document.getElementById("birthday").innerText=data.geboortedatum;
        document.getElementById("mail").innerText=data.email;
        document.getElementById("job").innerText=data.beroep;
        document.getElementById("sex").innerText=data.sexe;
        document.getElementById("hair").innerText=data.haarkleur;
        document.getElementById("eye").innerText=data.oogkleur;
        document.getElementById("height").innerText=data.grootte;
        document.getElementById("weight").innerText=data.gewicht;
    })
    .catch(function (error) { console.log(error); });
}

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



document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
}