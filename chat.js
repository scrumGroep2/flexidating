const eigenId=sessionStorage.getItem("id");
const partnerId=sessionStorage.getItem("resultaatId");
if(eigenId===null || partnerId===null){
    window.location.replace("home.html")
} 
getPartnerData();
getBerichten();
sluit();
toevoegKnop();
refreshKnop();

function getPartnerData() {                
    let url='https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id='+partnerId;
    fetch(url)
        .then(function (resp)   { return resp.json(); })
        .then(function (data)   { document.getElementById("partner").innerText = data.nickname;  })
        .catch(function (error) { console.log(error); });
}

async function getBerichten() {
    document.getElementById("wachten").style.display="block";
    let url = 'https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId='+eigenId;

    try {
        const response = await fetch(url);
        const data = await response.json();
        for (const conversatie of data) {
            if (conversatie[0].partnerId === partnerId) {
                for (const bericht of conversatie) {
                    voegBerichtToe(document.getElementById("berichtenBody"),
                        bericht.bericht, bericht.benIkZender === "0" ? false : true);
                }
            }
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    document.getElementById("berichten").scrollIntoView(false);
    document.getElementById("wachten").style.display="";
}

function voegBerichtToe(tbody, bericht, benIkZender) {
    const tr = tbody.insertRow();
    const tdBericht = tr.insertCell();
    tdBericht.innerText = bericht;
    tdBericht.colSpan = 2;
    if (benIkZender) {
        tr.classList.add("mijnBericht");
        tdBericht.classList.add("rightAlign");
    } else {
        tr.classList.add("gesprekspartnerBericht");
        tdBericht.classList.add("leftAlign");
    }
}


function sluit() {
    const sluit = document.getElementById("sluit");
    sluit.onclick = function () {
        if (confirm("Berichten sluiten?")) {
            window.close();
        }
    }
}

function toevoegKnop() {
    document.getElementById("toevoegen").onclick= function() {
        document.getElementById("foutVerwerkenGegevens").style.display="";
        let vanId =  eigenId;
        let naarId =  partnerId;
        let bericht =  document.getElementById("nieuwBericht").value; 

        let url='https://scrumserver.tenobe.org/scrum/api/bericht/post.php';
        let data = {
            vanId:vanId,
            naarId:naarId,
            bericht:bericht,
            status:"verzonden"
        }

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'})
        });

        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { voegBerichtToe(document.getElementById("berichtenBody"),bericht, true); 
                                        document.getElementById("nieuwBericht").value="";  })
            .catch(function (error) { document.getElementById("foutVerwerkenGegevens").style.display="block"; });
    
    }
}

function refreshKnop() {
    document.getElementById("refresh").onclick= function() {
        const berichtenBody = document.getElementById("berichtenBody");
        while (berichtenBody.hasChildNodes()) {
            berichtenBody.removeChild(berichtenBody.lastChild);
        }
        getBerichten();
    }
}

