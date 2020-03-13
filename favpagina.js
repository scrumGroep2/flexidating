"use strict"
//vergeet niet pagina onbeschikbaar te maken als je niet bent ingelogd
//zorg ervoor dat een id maar 1maal toegevoeg kan worden (eventueel als al bestaat verwijder ze er dan uit)
//vragen aan groep of confermatie te vragen van toevoegen/verwijderen of afbeelding die veranderd gebruiken
let rooturl = "https://scrumserver.tenobe.org/scrum/api";
let profielId = sessionStorage.getItem("id");
let url = rooturl + '/favoriet/read.php?profielId=' + profielId;

fetch(url)
    .then(function (resp) { return resp.json(); })
    .then(function (favorieten) {
        for (let i = 0; i < favorieten.length; i++) {
            let persoon = rooturl + '/profiel/read_one.php?id=' + favorieten[i].anderId;;
            fetch(persoon)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                    maakRij(data);
                    naarDetailOfBerichtSturen();
                    verwijderen();
                })
                .catch(function (error) { console.log(error); });


            function maakRij(data) {
                console.log(data);
                console.log(favorieten[i]);
                let tabelBody = document.getElementById("tabelBody");
                const tr = document.createElement("tr");
                const tdNickname = document.createElement("td");
                tdNickname.innerText = data.nickname;
                const tdSterrenbeeld = document.createElement("td");
                if (geboortedatumIsValid(data.geboortedatum)) {
                    const dagAlsString = data.geboortedatum.substring(8);
                    const dag = parseInt(dagAlsString);
                    const maandAlsString = data.geboortedatum.substring(5, 7);
                    const maand = parseInt(maandAlsString);
                    const imgSterrenbeeld = document.createElement("img");
                    imgSterrenbeeld.src = `sterrenbeelden/${sterrenbeeld(dag, maand)}.jpg`;
                    imgSterrenbeeld.width = "100";
                    imgSterrenbeeld.height = "100";
                    tdSterrenbeeld.appendChild(imgSterrenbeeld);
                } else {
                    tdSterrenbeeld.innerText = "sterrenbeeld niet beschikbaar";
                }
                const tdVerwijder = document.createElement("td");
                const link = document.createElement("a");
                link.href = "#"
                link.innerText = "X";
                tdVerwijder.appendChild(link);
                // link.setAttribute('data-row', i);
                link.setAttribute('data-remove', favorieten[i].id)
                const tdKnop = document.createElement("td");
                const knop = document.createElement("button");
                knop.innerText = "Bekijk profiel";
                knop.setAttribute('data-id', data.id)
                tdKnop.appendChild(knop);
                const tdKnopBericht = document.createElement("td");
                const knopBericht = document.createElement("button");
                knopBericht.innerText = "Bericht sturen";
                knopBericht.setAttribute('data-id', data.id);
                tdKnopBericht.appendChild(knopBericht);
                tr.appendChild(tdNickname);
                tr.appendChild(tdSterrenbeeld);
                tr.appendChild(tdKnop);
                tr.appendChild(tdKnopBericht);
                tr.appendChild(tdVerwijder);
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
        function naarDetailOfBerichtSturen() {
            const knoppen = document.querySelectorAll("#resultaten button");
            for (const knop of knoppen) {
                knop.onclick = function () {
                    sessionStorage.setItem("resultaatId", this.dataset.id);
                    if (knop.innerText === "Bekijk profiel") {
                        window.open("zoekdetail.html");
                    } else {
                        window.open("chat.html");
                    }  
                }
            }
        }
        function verwijderen() {
            const linken = document.querySelectorAll("#resultaten a");
            for (const link of linken) {
                link.onclick = function () {
                    if (confirm("Favoriet verwijderen?")) {
                        let id = this.dataset.remove
                        let td = this.parentElement;
                        let tr = td.parentElement;
                        console.log(tr.rowIndex);
                        document.getElementById('resultaten').deleteRow(tr.rowIndex);
                        let url = rooturl + '/favoriet/delete.php';
                        let data = {
                            id: id
                        }

                        var request = new Request(url, {
                            method: 'DELETE',
                            body: JSON.stringify(data),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        });

                        fetch(request)
                            .then(function (resp) { return resp.json(); })
                            .then(function (data) { console.log(data); })
                            .catch(function (error) { console.log(error); });
                    

                        };
                }
            }

        }

        const sterrenbeelden = [
            ['Steenbok', 20],
            ['Waterman', 20],
            ['Vissen', 20],
            ['Ram', 20],
            ['Stier', 20],
            ['Tweelingen', 20],
            ['Kreeft', 22],
            ['Leeuw', 22],
            ['Maagd', 22],
            ['Weegschaal', 22],
            ['Schorpioen', 22],
            ['Boogschutter', 21],
            ['Steenbok', 20]
        ];



        function sterrenbeeld(dag, maand) {
            return (dag <= sterrenbeelden[maand - 1][1]) ? sterrenbeelden[maand - 1][0] : sterrenbeelden[maand][0];
        }

    }
    )

    .catch(function (error) { console.log(error); });

document.getElementById("logout").onclick = function () {
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("nickname")
}

let id = sessionStorage.getItem("id")
if (id === null) {
    window.location.replace("home.html")
} else {
    // document.getElementById("geenLogin").innerText = ""
    document.getElementById("verwijderen").disabled = false;
    leesUser();
}