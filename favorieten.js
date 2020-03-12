"use strict"
let rooturl = "https://scrumserver.tenobe.org/scrum/api";

//alle favorieten zien van een gebruiker (klaar als favpagina.js)
document.getElementById('knop30').addEventListener('click', function (e) {  
    let profielId =  document.getElementById('input30_1').value; 

    let url=rooturl+'/favoriet/read.php?profielId='+profielId;
    fetch(url)
        .then(function (resp)   { return resp.json(); })
        .then(function (data)   { console.log(data);  })
        .catch(function (error) { console.log(error); });
});

//vraag een specifieke favoriet op (klaar zie favpagine.js)
document.getElementById('knop31').addEventListener('click', function (e) {  
    let id =  document.getElementById('input31_1').value; 

    let url=rooturl+'/favoriet/read_one.php?id='+id;
    fetch(url)
        .then(function (resp)   { return resp.json(); })
        .then(function (data)   { console.log(data);  })
        .catch(function (error) { console.log(error); });
});

// voeg toe aan favorieten (klaar zie zoekdetail.js)
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

// verwijder uit favorieten
document.getElementById('knop33').addEventListener('click', function (e) {  
    let id =  document.getElementById('input33_1').value; 

    let url=rooturl+'/favoriet/delete.php';
    let data = {
        id:id
    }

    var request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then( function (resp)  { return resp.json(); })
        .then( function (data)  { console.log(data);  })
        .catch(function (error) { console.log(error); });


});

document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
}