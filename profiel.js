"use strict"
let id = sessionStorage.getItem("id")
console.log(id)
if (id===null){
    document.getElementById("geenLogin").innerText="gelieven in te loggen"
}else{
   leesUser();
}
async function leesUser(){
fetch(`https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=${id}`)
                    .then(function (resp)   { return resp.json(); })
                    .then(function (data)   { 
                        console.log(data); 
                        document.getElementById("username").innerText=data.nickname;
                     })
                    .catch(function (error) { console.log(error); });
}