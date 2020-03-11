"use strict"
var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot){
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function() {

    if(sessionStorage.getItem("id")===null){
        document.getElementById("geenLogin").innerText="inloggen"
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


    // Resultaten tonen
    function weergaveResultaten(data) {
        maakTabelResultaten(data);
        verbergZoekfuncties();
        toonKnopNieuweZoekopdracht();
        naarDetail();
    }

    
    function maakTabelResultaten(data) {
        console.log(data);
        let tabelBody = document.getElementById("tabelBody");
        for (const user of data) {
            const tr = document.createElement("tr");
            const tdNickname = document.createElement("td");
            tdNickname.innerText = user.nickname;
            const tdSterrenbeeld = document.createElement("td");
            const dagAlsString = user.geboortedatum.substring(8);
            const dag = parseInt(dagAlsString);
            const maandAlsString = user.geboortedatum.substring(5, 7);
            const maand = parseInt(maandAlsString);
            console.log(user.geboortedatum);
            tdSterrenbeeld.innerText = sterrenbeeld(dag, maand);
            const tdKnop = document.createElement("td");
            const knop = document.createElement("button");
            knop.innerText = "Bekijk profiel";
            knop.setAttribute('data-id', user.id)
            tdKnop.appendChild(knop);
            tr.appendChild(tdNickname);
            tr.appendChild(tdSterrenbeeld);
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

        
    // Nieuwe zoekopdracht
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

    function verbergKnopNieuweZoekopdracht() {
        document.getElementById("nieuweZoek").style.display = "none";
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

    const sterrenbeelden = [
        ['Steenbok',20],
        ['Waterman',20],
        ['Vissen',20],
        ['Ram',20],
        ['Stier',20],
        ['Tweeling',20],
        ['Kreeft',22],
        ['Leeuw',22],
        ['Maagd',22],
        ['Weegschaal',22],
        ['Schorpioen',22],
        ['Boogschutter',21],
        ['Steenbok',20]
    ];
    
    
    
    function sterrenbeeld(dag,maand)
    {
        return (dag <= sterrenbeelden[maand-1][1]) ? sterrenbeelden[maand-1][0] : sterrenbeelden[maand][0];
    }

}


document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    document.getElementById("geenLogin").innerText="inloggen"
        let buttons = document.querySelectorAll("button");
        for(let i=0;i<=buttons.length-1;i++) {
            buttons[i].disabled=true
        }
}
