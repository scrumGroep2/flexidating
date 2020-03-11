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
    const ddJob = document.getElementById("job");
    ddJob.innerText = data.beroep;

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


