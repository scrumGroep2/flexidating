"use strict";

document.getElementById("toevoegen").onclick = function () {
    resetFoutboodschappen();
    const verkeerdeElementen=document.querySelectorAll("input:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.id}Fout`).style.display = "inline";
    }
    
    if (verkeerdeElementen.length === 0)
    {
        voegProfielToe();
    }
   
};

function resetFoutboodschappen() {
    const foutboodschappen =document.querySelectorAll(".fout");
    for (const element of foutboodschappen) {
        element.style.display = "";
    }
};

async function voegProfielToe() {
    const nickname = document.getElementById("nickname").innerText;
    const response = await fetch(`https://scrumserver.tenobe.org/scrum/api/profiel/exist.php/${nickname}`);
    console.log(response);
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