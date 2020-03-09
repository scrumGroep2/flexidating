"use strict";

document.getElementById("toevoegen").onclick = function () {
    const nickname = document.getElementById("nickname");
    const nicknameFout = document.getElementById("nicknameFout");
    const verkeerdeElementen=document.querySelectorAll("input:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.id}Fout`).style.display = "inline";
    }
    const correcteElementen =document.querySelectorAll("input:valid");
    for (const element of correcteElementen) {
        document.getElementById(`${element.id}Fout`).style.display = "";
    }
    if (verkeerdeElementen.length === 0)
    {

    }
    if (nummerInput.checkValidity()) {
        nummerFout.style.display = "";
        leesUser(nummerInput.value);
    } else {
        nummerFout.style.display = "block";
    }
};

async function leesUser(id) {
    const response = await fetch(`https://reqres.in/api/users/${id}`);
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
    }
}