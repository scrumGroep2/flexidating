"use strict"
var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot){
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}


window.onload = function() {

    if(sessionStorage.getItem("id")===null){
        let buttons = document.querySelectorAll("button");
        for(let i=0;i<=buttons.length-1;i++) {
            buttons[i].disabled=true
        }
    
    }else{let buttons = document.querySelectorAll("button");
    for(let i=0;i<=buttons.length-1;i++) {
        buttons[i].disabled=false
    }}


    
    /*
    --------------------------------------
    -- knoppen voor profielen
    --------------------------------------
    */
    // Alle profielen
    document.getElementById('knop1').onclick = function() {
        let url=rooturl+'/profiel/read.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data);  })
            .catch(function (error) { console.log(error); });
            
    }
    // Grootte
    document.getElementById('knop3').addEventListener('click', function (e) {
        let grootte =  document.getElementById('input3_1').value;
        let grootteOperator =  document.getElementById('input3_2').value;
        let orderby =  document.getElementById('input3_3').value;

        let url=rooturl+'/profiel/search.php?grootte='+ grootte + '&grootteOperator='+ grootteOperator + '&orderBy='+ orderby ;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api                
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data);})
            .catch(function (error) { console.log(error); });
    }); 

    // Voornaam
    document.getElementById('knop4').addEventListener('click', function (e) {
        let voornaam  =  document.getElementById('input4_1').value;

        let url=rooturl+'/profiel/search.php?voornaam='+ voornaam  ;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api                
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data);  })
            .catch(function (error) { console.log(error); });
    });

    // Fuzzy zoeken voornaam
    document.getElementById('knop5').addEventListener('click', function (e) {
        let geslacht  =  document.getElementById('input5_1').value;

        let url=rooturl+'/profiel/search.php?sexe='+geslacht;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data); })
            .catch(function (error) { console.log(error); });
    });

    
    // Geslacht
    document.getElementById('knop6').addEventListener('click', function (e) {
        let geboortedatum  =  document.getElementById('input6_1').value;
        let geboortedatumOperator  =  document.getElementById('input6_2').value;

        let url=rooturl+'/profiel/search.php?geboortedatum='+ geboortedatum + '&geboortedatumOperator='+ geboortedatumOperator;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data);})
            .catch(function (error) { console.log(error); });

    });

    // Met range (geboortedatum, grootte)
    document.getElementById('knop11').addEventListener('click', function (e) {
        let rangeMinGeboortedatum  =  document.getElementById('input11_1').value;
        let rangeMaxGeboortedatum  =  document.getElementById('input11_2').value;

        let rangeMinGrootte =  document.getElementById('input11_3').value;
        let rangeMaxGrootte =  document.getElementById('input11_4').value;

        let url=rooturl+'/profiel/search.php'
        url+='?geboortedatumOperator=range&rangeMinGeboortedatum='+ rangeMinGeboortedatum +'&rangeMaxGeboortedatum='+ rangeMaxGeboortedatum ;
        url+='&grootteOperator=range&rangeMinGrootte='+ rangeMinGrootte +'&rangeMaxGrootte='+ rangeMaxGrootte ;
        
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data); })
            .catch(function (error) { console.log(error); });
    });

    
    function maakTabelResultaten(data) {
        let tabelBody = document.getElementById("tabelBody");
        for (const user of data) {
            const tr = document.createElement("tr");
            const tdNickname = document.createElement("td");
            tdNickname.innerText = user.nickname;
            const tdKnop = document.createElement("td");
            const knop = document.createElement("button");
            knop.innerText = "Bekijk profiel";
            knop.setAttribute('data-id', user.id);
            tdKnop.appendChild(knop);
            tr.appendChild(tdNickname);
            tr.appendChild(tdKnop);
            tabelBody.appendChild(tr);
        }
    }

    function verbergZoekfuncties() {
        document.getElementById("zoekfuncties").style.display = "none";
    }

    function toonKnopNieuweZoekopdracht() {
        document.getElementById("nieuweZoek").style.display = "inline";
    }

    function verbergKnopNieuweZoekopdracht() {
        document.getElementById("nieuweZoek").style.display = "none";
    }

    function weergaveResultaten(data) {
        maakTabelResultaten(data);
        verbergZoekfuncties();
        toonKnopNieuweZoekopdracht();
        naarDetail();
    }

    document.getElementById("nieuweZoek").onclick = function() {
        toonZoekfuncties();
        verwijderResultaten();
        verbergKnopNieuweZoekopdracht();
    }

    function toonZoekfuncties() {
        document.getElementById("zoekfuncties").style.display = "inline";
    }

    function verwijderResultaten() {
        const tabelBody = document.getElementById("tabelBody");
        while (tabelBody.lastElementChild !== null) {
            tabelBody.lastElementChild.remove();
        }
    }

    function naarDetail() {
        const knoppen = document.querySelectorAll("#resultaten button"); 
        for (const knop of knoppen) {
            knop.onclick = function () {
                sessionStorage.setItem("resultaatId", this.dataset.id);
                window.open("zoekdetail.html");
            }
        }
    }
}

document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    let buttons = document.querySelectorAll("button");
        for(let i=0;i<=buttons.length-1;i++) {
            buttons[i].disabled=true
        }
}