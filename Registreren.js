"use strict";

document.getElementById("toevoegen").onclick = function () {
    resetFoutboodschappen();
    const verkeerdeElementen = document.querySelectorAll("input:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.name}Fout`).style.display = "inline";
    }

    if (verkeerdeElementen.length === 0) {
        voegProfielToe();
    }

};

function resetFoutboodschappen() {
    const foutboodschappen = document.querySelectorAll(".fout");
    for (const element of foutboodschappen) {
        element.style.display = "";
    }
};

async function voegProfielToe() {
    const wachten=document.getElementById("wachten");
    wachten.style.display="inline";
    const nickname = document.getElementById("nickname").value;

    let nicknameBestaatAl = false;
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/search.php?nickname=" + nickname);
    if (response.ok) {
        const profielen = await response.json();
        if (profielen.length > 0) {
            nicknameBestaatAl = true;
        }
    }

    if (nicknameBestaatAl) {
        document.getElementById("reedsBestaandeNickname").style.display="inline";
    } else {

        let url = "https://scrumserver.tenobe.org/scrum/api/profiel/create.php";
        let data = {
            familienaam: document.getElementById("fnaam").value,
            voornaam: document.getElementById("vnaam").value,
            geboortedatum: document.getElementById("geboorte").value,
            email: document.getElementById("email").value,
            nickname: nickname,
            foto: "no_picture.jpg",
            beroep: document.getElementById("beroep").value,
            sexe: document.querySelector('input[name="gender"]:checked').value,
            haarkleur: document.getElementById("haarkleur").value,
            oogkleur: document.getElementById("oogkleur").value,
            grootte: Number(document.getElementById("grootte").value),
            gewicht: Number(document.getElementById("gewicht").value),
            wachtwoord: document.getElementById("wachtwoord").value,
            metadata: "",
            lovecoins: "3"
        }

        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error);
            document.getElementById("foutVerwerkenGegevens").style.display="inline" });
    }

     wachten.style.display="";
};