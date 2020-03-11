"use strict";

toonDetails();
sluit();

function toonDetails() {
    const id = sessionStorage.getItem("resultaatId");
}

function sluit() {
    console.log("hallo");
    const sluit = document.getElementById("sluit");
    sluit.onclick = function() {
        if (confirm("Profiel sluiten?")) {
            window.close();
        }
    }
}
