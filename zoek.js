"use strict"
var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot){
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function() {


    
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
            .then(function (data)   { console.log(data);  })
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
            .then(function (data)   { maakTabelResultaten(data); toonDetails();})
            .catch(function (error) { console.log(error); });
    }); 

    // Voornaam
    document.getElementById('knop4').addEventListener('click', function (e) {
        let voornaam  =  document.getElementById('input4_1').value;

        let url=rooturl+'/profiel/search.php?voornaam='+ voornaam  ;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api                
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { maakTabelResultaten(data);  })
            .catch(function (error) { console.log(error); });
    });

    // Fuzzy zoeken voornaam
    document.getElementById('knop5').addEventListener('click', function (e) {
        let geslacht  =  document.getElementById('input5_1').value;

        let url=rooturl+'/profiel/search.php?sexe='+geslacht;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { maakTabelResultaten(data); })
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
            .then(function (data)   { maakTabelResultaten(data);})
            .catch(function (error) { console.log(error); });

    });

    // Met range (geboortedatum, grootte)

    
    function maakTabelResultaten(data) {
        let tabelBody = document.getElementById("tabelBody");
        for (const user of data) {
            const tr = document.createElement("tr");
            const tdNaam = document.createElement("td");
            tdNaam.innerText = user.voornaam;
            const tdNickname = document.createElement("td");
            tdNickname.innerText = user.nickname;
            const tdKnop = document.createElement("td");
            const knop = document.createElement("button");
            knop.innerText = "Bekijk profiel";
            knop.setAttribute('data-id', user.id);
            tdKnop.appendChild(knop);
            tr.appendChild(tdNickname);
            tr.appendChild(tdNaam);
            tr.appendChild(tdKnop);
            tabelBody.appendChild(tr);
        }
    }
}
