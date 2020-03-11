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
            console.log(data.id);
            console.log(nickname)
            if(data.message==="Authorized"){
                sessionStorage.setItem("id",data.id);
                sessionStorage.setItem("nickname",nickname);
                window.location.href="profiel.html"
            }
            if (data.message==="Authenticatie niet mogelijk."){
            document.getElementById("error").innerText="vul uw gegevens in";
            } 
            if(data.message==="Unauthorized") {document.getElementById("error").innerText="foutieve inlog gegevens"}
        })
        .catch(function (error) { 
            console.log(error); 
        });
        
};
document.getElementById("register").onclick = function() {
    window.location.href="registreren.html"
}

document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
}
window.onload = function() {
if (sessionStorage.getItem("id")===null){
    let loggedin=document.getElementById("loggedin");
    loggedin.classList.remove("hidden")
}
if (sessionStorage.getItem("id")!==null){
    let loggedin=document.getElementById("loggedin");
    loggedin.classList.add("hidden");
    let homeLog=document.getElementById("homeLog");
    let span = document.createElement("span");
    span.innerText=`uw bent ingelogt als ${sessionStorage.getItem("nickname")}`;
    homeLog.appendChild(span);
    console.log(span)
    console.log(homeLog)
    let p = document.createElement("p")
    p.innerText=`bent u dit niet? klik `
    homeLog.appendChild(p)
    let link = document.createElement("a")
    link.href="home.html"
    link.innerText="hier"
    p.appendChild(link)
    link.onclick=function() {
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
    }
}
}
