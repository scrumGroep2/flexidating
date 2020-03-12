window.onload = function () {
    this.document.getElementById("partner").innerText = "fluffy snowflake";
    const berichtenBody = this.document.getElementById("berichtenBody");
    this.voegBerichtToe(berichtenBody, "hallo, wil je met me chatten", true);
    this.voegBerichtToe(berichtenBody, "Dit is een hele lange tekst om te testen hoe het er uit" +
        "zal zien op de site. Please date mij. Ik ben wanhopig op zoek naar een lief. Hoeft zelfs geen knappe te zijn.", true);
    this.voegBerichtToe(berichtenBody, "dringend partner gezocht", true);
    this.voegBerichtToe(berichtenBody, "laat me met rust lozer", false);
    this.voegBerichtToe(berichtenBody, "wil je met me sexten", true);
    this.voegBerichtToe(berichtenBody, "bah! viezerik", false);
    this.voegBerichtToe(berichtenBody, "laat me met rust of ik bel de politie", false);
    this.getBerichten();
}

async function getBerichten() {
    let url = 'https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId=2';

    try {
        const response = await fetch(url);
        const data = await response.json();
        for (const conversatie of data) {
            if (conversatie[0].partnerId === "1") {
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