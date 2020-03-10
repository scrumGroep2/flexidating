"use strict";

document.getElementById("toevoegen").onclick = function () {
    resetFoutboodschappen();
    const verkeerdeElementen=document.querySelectorAll("input:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.name}Fout`).style.display = "inline";
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
    const nickname = document.getElementById("nickname").value;
    const nicknameData = {nickname: nickname};
    let url="'https://scrumserver.tenobe.org/scrum/api/profiel/exists.php";
    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(nicknameData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    
    fetch(request)
        .then( function (resp)  { return resp.json(); })
        .then( function (nicknameData)  { console.log(nicknameData);  })
        .catch(function (error) { console.log(error); });
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