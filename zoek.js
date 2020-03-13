"use strict"
let rooturl = "https://scrumserver.tenobe.org/scrum/api";



function changeURL(sNewRoot){
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function() {

    // Set maximum geboortedatum
    let datum=new Date();
    datum=new Date(datum.setFullYear(datum.getFullYear() - 18));
    this.document.getElementById("inputMaxGeboortedatum").defaultValue=this.formatDate(datum);


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
}

    function formatDate(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
    }
    
    
    // ZOEK MET FILTERS
    document.getElementById('zoek').onclick = function() {
        document.getElementById('zoek').disabled = true;
        let url = rooturl+= '/profiel/search.php?';
        url = grootteFilter(url);
        url = nicknameFilter(url);
        url = geslachtFilter(url);
        url = geboortedatumFilter(url);
        url = oogkleurFilter(url);   
        url = haarkleurFilter(url);       
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { weergaveResultaten(data);})
            .catch(function (error) { console.log(error); });
    }

    // I FEEL LUCKY
    document.getElementById('lucky').onclick = function() {
        let url=rooturl+'/profiel/search.php?&sexe=' + document.getElementById('inputGeslachtLucky').value;
        console.log(url);
        let aantalUsers;
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { 
                console.log(data);
                aantalUsers = parseInt(data.length);
                let randomUserIndex = Math.floor(Math.random() * aantalUsers);
                console.log(randomUserIndex);
                maakTabelRij(data[randomUserIndex]);
                naarDetailOfBericht();
             })
            .catch(function (error) { console.log(error); });
            weergaveNaZoekopdracht();
            toonMeldingLuckyGevonden();
            
    }

    function weergaveNaZoekopdracht () {
        document.getElementById("zoek").style.display = "none";
        document.getElementById("lucky").style.display="none";
        document.getElementById("inputGeslachtLucky").style.display="none";
        document.getElementById("zoekfuncties").style.display = "none";
        document.getElementById("nieuweZoek").style.display = "inline"; 
    }

   

    // Zoekresultaten tonen
    function weergaveResultaten(data) {
        console.log(data);
            weergaveNaZoekopdracht();
            if (data.message) {
                document.getElementById('geenResultaten').style.display = "inline";
            } else {
                maakTabelResultaten(data);
                document.getElementById('gevondenResultaten').style.display = "inline";
                naarDetailOfBericht();
            }  

            document.getElementById('zoek').disabled = false;
    }

    function maakTabelResultaten(data) {
        let tabelBody = document.getElementById("tabelBody");
        for (const user of data) {
            maakTabelRij(user);   
        }
    }

    function maakTabelRij(user) {
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
        
        const tdKnopDetail = document.createElement("td");
        const knopDetail = document.createElement("button");
        knopDetail.innerText = "Bekijk profiel";
        knopDetail.setAttribute('data-id', user.id);
        tdKnopDetail.appendChild(knopDetail);
        const tdKnopBericht = document.createElement("td");
        const knopBericht = document.createElement("button");
        knopBericht.innerText = "Stuur bericht";
        knopBericht.setAttribute('data-id', user.id);
        tdKnopBericht.appendChild(knopBericht);
        tr.appendChild(tdNickname);
        tr.appendChild(tdSterrenbeeld);
        tr.appendChild(tdKnopDetail);
        tr.appendChild(tdKnopBericht);
        tabelBody.appendChild(tr);
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

    
    // Nieuwe zoekopdracht
    document.getElementById("nieuweZoek").onclick = function() {
        verbergMeldingenResultaten();
        toonZoekfuncties();
        verwijderResultaten();
        verbergKnopNieuweZoekopdracht();
        toonZoekKnoppen();
    }

    function verbergMeldingenResultaten() {
        document.getElementById("geenResultaten").style.display="none";
        document.getElementById("gevondenResultaten").style.display="none";
        document.getElementById("luckyGevonden").style.display="none";
    }

    function toonMeldingLuckyGevonden() {
        document.getElementById("luckyGevonden").style.display="inline";
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


    function toonZoekKnoppen() {
        document.getElementById("lucky").style.display="inline";
        document.getElementById("inputGeslachtLucky").style.display="inline";
        document.getElementById("zoek").style.display ="inline";
    }

    function naarDetailOfBericht() {
        const knoppen = document.querySelectorAll("#resultaten button"); 
        for (const knop of knoppen) {
            knop.onclick = function () {
                sessionStorage.setItem("resultaatId", this.dataset.id);
                let knopTekst = knop.innerText;
                console.log(knopTekst);
                if (knopTekst === "Bekijk profiel") {
                    window.open("zoekdetail.html");
                } else {
                    window.open("chat.html");
                }  
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

 //FILTERS
 function grootteFilter(url) {
    let minGrootte = document.getElementById('inputGrootteMin').value;
    let maxGrootte = document.getElementById('inputGrootteMax').value;
    if (minGrootte.trim().length > 0 && maxGrootte.trim().length > 0) {
        url+='&grootteOperator=range&rangeMinGrootte='+ minGrootte + '&rangeMaxGrootte=' + maxGrootte + '&orderBy=grootte';
    }
    console.log(url)
    return url
}

function gewichtFilter(url) {
    let minGrootte = document.getElementById('inputGewichtMin').value;
    let maxGrootte = document.getElementById('inputGewichtMax').value;
    if (minGrootte.trim().length > 0 && maxGrootte.trim().length > 0) {
        url+='&grootteOperator=range&rangeMinGrootte='+ minGrootte + '&rangeMaxGrootte=' + maxGrootte + '&orderBy=grootte';
    }
    console.log(url)
    return url
}


function nicknameFilter(url) {
    let nickname = document.getElementById('inputNickname').value;
    if (nickname.trim().length > 0) {
       url+='&nickname=' + '%' + nickname + '%';
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
    if (rangeMinGeboortedatum.trim().length > 0 && rangeMaxGeboortedatum.trim().length > 0) {
        url+='&geboortedatumOperator=range&rangeMinGeboortedatum='+ 
        rangeMinGeboortedatum +'&rangeMaxGeboortedatum='+ rangeMaxGeboortedatum;
    }
    console.log(url)
    return url;
}

function oogkleurFilter(url) {
    let oogkleur = document.getElementById('inputOogkleur').value;
    if (oogkleur.trim().length > 0) {
        url+='&oogkleur=' + '%' + oogkleur + '%';
    }
    console.log(url);
    return url;
}

function haarkleurFilter(url) {
    let haarkleur = document.getElementById('inputHaarkleur').value;
    if (haarkleur.trim().length > 0) {
        url+='&haarkleur=' + '%' + haarkleur + '%';
    }
    console.log(url);
    return url;
}


document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
    document.getElementById("geenLogin").innerText="inloggen"
    let buttons = document.querySelectorAll("button");
    for(let i=0;i<=buttons.length-1;i++) {
        buttons[i].disabled=true
    }
}
