"use strict"
let id = sessionStorage.getItem("id")
console.log(id)
if (id===null){
    document.getElementById("geenLogin").innerText="gelieven in te loggen"
}else{
    document.getElementById("verwijderen").disabled=false;
    async function leesUser(){
        fetch(`https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=${id}`)
        .then(function (resp)   { return resp.json(); })
        .then(function (data)   { 
            console.log(data); 
            document.getElementById("username").innerText=data.nickname;
            
         })
        .catch(function (error) { console.log(error); });
        
    }
}

document.getElementById("verwijderen").onclick = function () {
    const foutVerwerkenGegevens=document.getElementById("foutVerwerkenGegevens");
    foutVerwerkenGegevens.style.display = "";
    let url="https://scrumserver.tenobe.org/scrum/api/profiel/delete.php";
    let data = {id: id}

    var request = new Request(url, {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'})
                });

    fetch(request)
            .then( function (resp)  { sessionStorage.removeItem("id");
            window.location.href = "home.html"; })
            .then( function (data)  { console.log(data);  })
            .catch(function (error) { console.log(error);
                foutVerwerkenGegevens.style.display = "block"; });


}