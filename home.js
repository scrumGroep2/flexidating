"use strict";
let login = function () {  
    let nickname =  document.getElementById("user").value; 
    let wachtwoord =  document.getElementById("password").value;
    console.log(nickname)
    let url="https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php";
    //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
    let data = {
        nickname: nickname,
        wachtwoord: wachtwoord
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


