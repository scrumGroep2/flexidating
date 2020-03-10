"use strict";
document.getElementById("login").onclick = function () {  
    document.getElementById("error").innerText=""
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
        .then( function (data)  { 
            console.log(data);
            if(data.id!==null){
                window.location.href="profiel.html"
            }
            if (data.message="Authenticatie niet mogelijk."){
            document.getElementById("error").innerText="vul uw gegevens in";
            } else (document.getElementById("error").innerText="foutieve inlog gegevens")
        })
        .catch(function (error) { 
            console.log(error); 
        });
        
};


