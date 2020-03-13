"use strict"

window.onload = function () {

    let profielData;

    let profielId = sessionStorage.getItem("id")

    if (profielId===null){
        window.location.replace("home.html")
        document.getElementById("geenLogin").innerText="gelieven in te loggen"
    }else{
        document.getElementById("geenLogin").innerText=""
        /*document.getElementById("verwijderen").disabled=false;*/
        leesUser();
    }

    async function leesUser(){
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + profielId;
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {

            profielData = data;
 /*           let profielfoto

            if (profielData.foto===null) {
                profielfoto = "Nog geen foto toegevoegd"
            } else {
                profielfoto = 'src', 'https://scrumserver.tenobe.org/scrum/img/' + profielData.foto
            }
*/
            document.getElementById('detailNick').value = profielData.nickname;
            document.getElementById('detailFnaam').value = profielData.familienaam;
            document.getElementById('detailVnaam').value = profielData.voornaam;
            document.getElementById('detailGeboortedatum').value = profielData.geboortedatum;
            document.getElementById('detailHaarkleur').value = profielData.haarkleur;
            document.getElementById('detailBeroep').value = profielData.beroep;
            document.getElementById('detailEmail').value = profielData.email;
            document.getElementById('detailGewicht').value = profielData.gewicht;
            document.getElementById('detailFoto').setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + profielData.foto);
            document.getElementById('detailFoto').setAttribute('alt', 'foto van ' + profielData.voornaam + ' ' + profielData.familienaam);
            document.getElementById('profielVan').innerText = 'Details van ' + profielData.voornaam + ' ' + profielData.familienaam;

        })
        .catch(function (error) { console.log(error); });
    }

    function inputOK() {
        let fouten=false;
        const geboortedatum=new Date(document.getElementById("detailGeboortedatum").value);
        let datum=new Date();
        datum=new Date(datum.setFullYear(datum.getFullYear() - 18));
        if (geboortedatum>datum) {
            document.getElementById("onder18jaar").style.display = "block";
            fouten=true;
        }
        /*const grootte=document.getElementById("detailGrootte").value;
        if (grootte<60||grootte>300) {
            document.getElementById("foutGrootte").style.display = "block";
            fouten=true;
        }
        const gewicht=document.getElementById("gewicht").value;
        if (gewicht<20||gewicht>400) {
            document.getElementById("foutGewicht").style.display = "block";
            fouten=true;
        }*/
        return !fouten;
    }

    document.getElementById('btnSubmit').addEventListener('click', function (e) {
        let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

        resetFoutboodschappen();
        const verkeerdeElementen = document.querySelectorAll("input:invalid");
        for (const element of verkeerdeElementen) {
            document.getElementById(`${element.name}Fout`).style.display = "inline";
        }

        if (verkeerdeElementen.length === 0) {
            if (inputOK()) {
                profielData.nickname = document.getElementById('detailNick').value;
                profielData.familienaam = document.getElementById('detailFnaam').value;
                profielData.voornaam = document.getElementById('detailVnaam').value;
                profielData.geboortedatum = document.getElementById('detailGeboortedatum').value;
                profielData.haarkleur = document.getElementById('detailHaarkleur').value;
                profielData.beroep = document.getElementById('detailBeroep').value;
                profielData.email = document.getElementById('detailEmail').value;
                profielData.gewicht = document.getElementById('detailGewicht').value;
                profielData.foto = `${profielData.voornaam}${profielData.familienaam}.jpg`
        
                var request = new Request(urlUpdate, {
                    method: 'PUT',
                    body: JSON.stringify(profielData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
        
                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) { document.getElementById('updateFeedback').innerText="Update geslaagd"; })
                    .catch(function (error) { document.getElementById('updateFeedback').innerText="Update mislukt, probeer opnieuw" + error; });
            }
        } 

        function resetFoutboodschappen() {
            const foutboodschappen = document.querySelectorAll(".fout");
            for (const element of foutboodschappen) {
                element.style.display = "";
            }
        };


    });  
};       


document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
}
