document.addEventListener("DOMContentLoaded", function() {
    var siparis = JSON.parse(localStorage.getItem("siparis"));

    if(!siparis) {
        siparis = [];
    }

    var siparisListesiHTML = document.querySelector(".table tbody");
    siparis.forEach(function(siparis) {
        var row = document.createElement('tr');
        row.innerHTML = `
        <td>${siparis.id}</td>
        <td>${siparis.mBilgi}</td>
        <td>${siparis.marka}</td>
        <td>${siparis.model}</td>
        <td>${siparis.sahip}</td>
        <td>${siparis.fiyat}</td>
        `
        siparisListesiHTML.appendChild(row);
    });
});

const btnSiparisValue = document.querySelector("#siparis");
const kAdiValue = document.querySelector("#kAdi");
const aMarkaValue = document.querySelector("#aMarka");
const aModelValue = document.querySelector("#aModel");
const fiyatValue = document.querySelector("#fiyat");