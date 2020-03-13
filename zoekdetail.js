"use strict";
var rooturl = "https://scrumserver.tenobe.org/scrum/api";
leesUserData();
sluit();

function leesUserData() {                
    let profielId =  sessionStorage.getItem("resultaatId");

    let url=rooturl+'/profiel/read_one.php?id='+profielId;
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    fetch(url)
        .then(function (resp)   { return resp.json(); })
        .then(function (data)   { toonDetails(data);  })
        .catch(function (error) { console.log(error); });

}

function toonDetails(data) {
    console.log(data);
    document.getElementById("foto").src=`https://scrumserver.tenobe.org/scrum/img/${data.foto}`;
    document.getElementById("nickname").innerText = data.nickname;
    const ddJob = document.getElementById("job");
    ddJob.innerText = data.beroep;
    const ddGender = document.getElementById("sex");
    let gender = "man";
    switch (data.sexe) {
        case "v":
            gender = "vrouw";
            break;
        case "x":
            gender = "anders";
            break;            
    }
    ddGender.innerText = gender;
    const ddHaarkleur = document.getElementById("hair");
    ddHaarkleur.innerText = data.haarkleur;
    const ddOogkleur = document.getElementById("eye");
    ddOogkleur.innerText = data.oogkleur;
    const ddLengte = document.getElementById("height");
    ddLengte.innerText = `${data.grootte} cm`;
    const ddGewicht = document.getElementById("weight");
    ddGewicht.innerText = `${data.gewicht} kg`;

}

function sluit() {
    console.log("hallo");
    const sluit = document.getElementById("sluit");
    sluit.onclick = function() {
        if (confirm("Profiel sluiten?")) {
            window.close();
        }
    }
}


document.getElementById("toevoegen").onclick= function () {  
    let mijnId =  sessionStorage.getItem("id"); 
    let anderId = sessionStorage.getItem("resultaatId");

    let url=rooturl+'/favoriet/like.php';
    let data = {
        mijnId: mijnId,
        anderId: anderId
    }

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    
    fetch(request)
        .then( function (resp)  { return resp.json(); })
        .then( function (data)  { console.log(data);  })
        .catch(function (error) { console.log(error); });

};

document.getElementById("bericht versturen").onclick=function () {
    window.open("chat.html");
}
