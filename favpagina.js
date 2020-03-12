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
        console.log(favorieten.length);
        for (let i = 0; i < favorieten.length; i++) {
            let personen = rooturl + '/profiel/read_one.php?id=' + favorieten[i].anderId;;
            fetch(personen)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                    console.log(data);
                    maakTabelResultaten(data);
                    naarDetail();
                    verwijderen();
                })
                .catch(function (error) { console.log(error); });


            function maakTabelResultaten(data) {
                console.log(data);
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
                link.setAttribute('data-row', i)
                link.setAttribute('data-remove', data.id)
                const tdKnop = document.createElement("td");
                const knop = document.createElement("button");
                knop.innerText = "Bekijk profiel";
                knop.setAttribute('data-id', data.id)
                tdKnop.appendChild(knop);
                tr.appendChild(tdNickname);
                tr.appendChild(tdSterrenbeeld);
                tr.appendChild(tdKnop);
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
        function naarDetail() {
            const knoppen = document.querySelectorAll("#resultaten button");
            for (const knop of knoppen) {
                knop.onclick = function () {
                    sessionStorage.setItem("resultaatId", this.dataset.id);
                    window.open("zoekdetail.html");
                }
            }
        }
        function verwijderen() {
            const linken = document.querySelectorAll("#resultaten a");
            for (const link of linken) {
                link.onclick = function () {
                    if (confirm("Favoriet verwijderen?")) {
                        let id = this.dataset.remove
                        console.log(id)
                        document.getElementById("tabelBody").deleteRow(this.dataset.row);
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

