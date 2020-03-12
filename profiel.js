"use strict"
let id = sessionStorage.getItem("id")
console.log(id)
if (id === null) {
    window.location.replace("home.html")
    document.getElementById("geenLogin").innerText = "gelieven in te loggen"
} else {
    document.getElementById("geenLogin").innerText = ""
    document.getElementById("verwijderen").disabled = false;
    leesUser();
}
async function leesUser() {
    fetch(`https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=${id}`)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
            console.log(data);
            document.getElementById("username").innerText = data.nickname;
            document.getElementById("coin").src = "lovecoin.jpg";
            document.getElementById("lovecoins").innerText = data.lovecoins;
            document.getElementById("foto").src = `https://scrumserver.tenobe.org/scrum/img/${data.foto}`;
            document.getElementById("name").innerText = `${data.voornaam} ${data.familienaam}`;
            document.getElementById("birthday").innerText = data.geboortedatum;
            document.getElementById("mail").innerText = data.email;
            document.getElementById("job").innerText = data.beroep;
            document.getElementById("sex").innerText = data.sexe;
            document.getElementById("hair").innerText = data.haarkleur;
            document.getElementById("eye").innerText = data.oogkleur;
            document.getElementById("height").innerText = data.grootte;
            document.getElementById("weight").innerText = data.gewicht;
        })
        .catch(function (error) { console.log(error); });
}

document.getElementById("verwijderen").onclick = function () {
    if (confirm("Profiel verwijderen?")) {
        const foutVerwerkenGegevens = document.getElementById("foutVerwerkenGegevens");
        foutVerwerkenGegevens.style.display = "";
        let url = "https://scrumserver.tenobe.org/scrum/api/profiel/delete.php";
        let data = { id: id }

        var request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        fetch(request)
            .then(function (resp) {
                sessionStorage.removeItem("id");
                sessionStorage.removeItem("nickname");
                window.location.href = "home.html";
            })
            .then(function (data) { console.log(data); })
            .catch(function (error) {
                console.log(error);
                foutVerwerkenGegevens.style.display = "block";
            });

        window.close();
    }
}

document.getElementById("logout").onclick = function () {
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
}

document.getElementById("profielAanpassen").onclick = function() {
    window.location.href="profielAanpassen.html"
}