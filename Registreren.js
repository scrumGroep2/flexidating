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
    const nickname = document.getElementById("nickname").value;

    let nicknameBestaatAl = false;
    const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/search.php?nickname=" + nickname);
    if (response.ok) {
        const profielen = await response.json();
        if (profielen.length > 0) {
            nicknameBestaatAl = true;
        }
    }

    if (!nicknameBestaatAl) {

        let url = "https://scrumserver.tenobe.org/scrum/api/profiel/create.php";
        let data = {
            familienaam: "Norris",
            voornaam: "Chuck",
            geboortedatum: "0001-01-01",
            email: "me@Chuck.Norris",
            nickname: nickname,
            foto: "no_picture.jpg",
            beroep: "Moviestar",
            sexe: "x",
            haarkleur: "brown",
            oogkleur: "blue",
            grootte: "1095",
            gewicht: "",
            wachtwoord: "iamgod",
            metadata: "",
            lovecoins: "1000000"
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
            .catch(function (error) { console.log(error); });
    }

    /* url="https://scrumserver.tenobe.org/scrum/api/profiel/exists.php/f";
    request = new Request(url, {
        method: 'POST',
       /*  body: JSON.stringify(nicknameData), */
    /*   headers: new Headers({ */
    /*             'Content-Type': 'application/json'
            })
        });
        
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (nicknameData)  { console.log(nicknameData);  })
            .catch(function (error) { console.log(error); }); */
    /*  const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/exists.php",
         { method: "POST", body: JSON.stringify(nicknameData) }); */
    /*   console.log(response); */
    /*  const response = await fetch(`https://reqres.in/api/users/${id}`);
     const nietGevondenDiv = document.getElementById("nietGevonden");
     if (response.ok) {
         const user = await response.json();
         document.getElementById("nummer").innerText = user.data.id;
         document.getElementById("voornaam").innerText = user.data.first_name;
         document.getElementById("familienaam").innerText = user.data.last_name;
         document.getElementById("emailAdres").innerText = user.data.email;
         document.getElementById("avatar").src = user.data.avatar;
         nietGevondenDiv.style.display = "";
     } else {
         nietGevondenDiv.style.display = "block";
     } */
};