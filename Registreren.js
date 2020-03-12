"use strict";

document.getElementById("toevoegen").onclick = function () {
    resetFoutboodschappen();
    const verkeerdeElementen = document.querySelectorAll("input:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.name}Fout`).style.display = "inline";
    }

    if (verkeerdeElementen.length === 0) {
        if (inputOK()) {
            voegProfielToe();
        }
    }

};

function resetFoutboodschappen() {
    const foutboodschappen = document.querySelectorAll(".fout");
    for (const element of foutboodschappen) {
        element.style.display = "";
    }
};

function inputOK() {
    let fouten=false;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const geboortedatum=new Date(document.getElementById("geboorte").value);
    let datum=new Date();
    datum=new Date(datum.setFullYear(datum.getFullYear() - 18));

    const grootte=document.getElementById("grootte").value;
    if (grootte<60||grootte>300) {
        document.getElementById("foutGrootte").style.display = "block";
        fouten=true;
    }
    const gewicht=document.getElementById("gewicht").value;
    if (gewicht<20||gewicht>400) {
        document.getElementById("foutGewicht").style.display = "block";
        fouten=true;
    }
    if (!document.getElementById("wachtwoord").value.match(passw)) {
        document.getElementById("wachtwoordPatroonOngeldig").style.display = "block";
        fouten=true;
    }
    if (document.getElementById("wachtwoord").value != document.getElementById("wachtwoordHerhaal").value) {
        document.getElementById("verschillendeWachtwoorden").style.display = "block";
        fouten=true;
    }
    return !fouten;
}

async function voegProfielToe() {
    const wachten = document.getElementById("wachten");
    wachten.style.display = "inline";
    const nickname = document.getElementById("nickname").value;

    let nicknameBestaatAl = false;
    let response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/search.php?nickname=" + nickname);
    if (response.ok) {
        const profielen = await response.json();
        if (profielen.length > 0) {
            nicknameBestaatAl = true;
        }
    }

    if (nicknameBestaatAl) {
        document.getElementById("reedsBestaandeNickname").style.display = "inline";
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

        response = await fetch(request);
        if (response.ok) {
            const resultaat = await response.json();
            sessionStorage.setItem("id", resultaat.id)
            sessionStorage.setItem("nickname", nickname)
            window.location.href = "profiel.html"
        } else {
            document.getElementById("foutVerwerkenGegevens").style.display = "inline";
        }

    }

    wachten.style.display = "";
};