"use strict"
let rooturl = "https://scrumserver.tenobe.org/scrum/api";



function changeURL(sNewRoot){
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function() {

    if(sessionStorage.getItem("id")===null){
        window.location.replace("home.html")
        document.getElementById("geenLogin").innerText="inloggen"
        let buttons = document.querySelectorAll("button");
        for(let i=0;i<=buttons.length-1;i++) {
            buttons[i].disabled=true
        }
    
    }else{let buttons = document.querySelectorAll("button");
    for(let i=0;i<=buttons.length-1;i++) {
        buttons[i].disabled=false
    }}

    document.getElementById('zoek').onclick = function() {
        let url = rooturl+= '/profiel/search.php?';
        url = grootteFilter(url);
        url = voornaamFilter(url);
        url = geslachtFilter(url);
        url = geboortedatumFilter(url);          
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data);})
            .catch(function (error) { console.log(error); });
    }


    function grootteFilter(url) {
        let grootte = document.getElementById('inputGrootte').value;
        let grootteOperator =  document.getElementById('inputGrootteOperator').value;
        let orderby =  document.getElementById('inputGrootteOrderBy').value;
        if (grootte.trim().length > 0 && grootteOperator.trim().length > 0 && orderby.trim().length > 0) {
            url+='&grootte='+ grootte + '&grootteOperator='+ grootteOperator + '&orderBy='+ orderby;
        }
        console.log(url)
        return url
    }
    

    function voornaamFilter(url) {
        let voornaam = document.getElementById('inputNaam').value;
        if (voornaam.trim().length > 0) {
            console.log(url+='&voornaam=' + voornaam);
        }
        console.log(url);
        return url;
    }


    function geslachtFilter(url) {
        let geslacht = document.getElementById('inputGeslacht').value;
        if (geslacht.length > 0) {
            url+='&sexe=' + geslacht;
        }
        console.log(url);
        return url;
    }

    function geboortedatumFilter(url) {
        let min = document.getElementById('inputMinGeboortedatum').value;
        let rangeMinGeboortedatum = min.toString();
        let max = document.getElementById('inputMaxGeboortedatum').value;
        let rangeMaxGeboortedatum =max.toString();
        console.log(rangeMinGeboortedatum);
        console.log(rangeMaxGeboortedatum);
        if (rangeMinGeboortedatum.trim().length > 0 && rangeMaxGeboortedatum.trim().length > 0) {
            url+='&geboortedatumOperator=range&rangeMinGeboortedatum='+ 
            rangeMinGeboortedatum +'&rangeMaxGeboortedatum='+ rangeMaxGeboortedatum;
        }
        console.log(url)
        return url;
    }



    
    // Resultaten tonen
    function weergaveResultaten(data) {
        maakTabelResultaten(data);
        verbergZoekfuncties();
        verbergKnopZoek();
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
            if (geboortedatumIsValid(user.geboortedatum)) {
                const dagAlsString = user.geboortedatum.substring(8);
                const dag = parseInt(dagAlsString);
                const maandAlsString = user.geboortedatum.substring(5, 7);
                const maand = parseInt(maandAlsString);
                const imgSterrenbeeld = document.createElement("img");
                imgSterrenbeeld.src = `sterrenbeelden/${sterrenbeeld(dag, maand)}.jpg`;
                imgSterrenbeeld.width = "100";
                imgSterrenbeeld.height = "100";
                tdSterrenbeeld.appendChild(imgSterrenbeeld);
            } else {
                tdSterrenbeeld.innerText = "sterrenbeeld niet beschikbaar";
            }
            
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

    function geboortedatumIsValid(geboortedatum) {
        const dagAlsString = geboortedatum.substring(8);
        const maandAlsString = geboortedatum.substring(5, 7);
        if (parseInt(dagAlsString) <= 31 && parseInt(dagAlsString) >= 1 
            && parseInt(maandAlsString) <= 12 && parseInt(maandAlsString) >= 1) {
                return true;
            } 
        return false;
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

    function verbergKnopZoek() {
        document.getElementById("zoek").style.display = "none";
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
        ['Tweelingen',20],
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



document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    document.getElementById("geenLogin").innerText="inloggen"
    let buttons = document.querySelectorAll("button");
    for(let i=0;i<=buttons.length-1;i++) {
        buttons[i].disabled=true
    }
}
}
