document.addEventListener("DOMContentLoaded", function() {
    var stok = JSON.parse(localStorage.getItem("stok"));

    if (!stok) {
        stok = [];
    }

    var stokListesiHTML = document.querySelector('.urunListesi tbody');
    stok.forEach(function(urun) {
        var row = document.createElement('tr');
        row.innerHTML = `
        <td>${urun.id}</td>
        <td>${urun.urunAdi}</td>
        <td>${urun.urunKategori}</td>
        <td>${urun.stokBilgi}</td>
        <td>${urun.urunEkleyen} TL</td>
        <td><img src="${urun.urunResim}" alt="Ürün Resmi" style="width: 120px; height: 110px;"></td>
        `;
        stokListesiHTML.appendChild(row);
    });
});

const btnSiparis = document.querySelector("#btnSiparis");
const IDInput = document.querySelector("#ID");
const markaInput = document.querySelector("#marka");
const modelInput = document.querySelector("#model");
const sahipInput = document.querySelector("#sahip");
const fiyatInput = document.querySelector("#fiyat");
const mBilgiInput = document.querySelector("#mBilgi");
const tableBody = document.querySelector(".table tbody");

let siparisListesi = [];

runEvents();
checkSiparisListFromStorage();

function runEvents() {
    btnSiparis.addEventListener("click", addSiparis);
}

function checkSiparisListFromStorage() {
    if (localStorage.getItem("siparis") !== null) {
        siparisListesi = JSON.parse(localStorage.getItem("siparis"));
    }
}

function addSiparis(event) {
    event.preventDefault();

    const id = IDInput.value;
    const mBilgi = mBilgiInput.value;
    const marka = markaInput.value;
    const model = modelInput.value;
    const sahip = sahipInput.value;
    const fiyat = fiyatInput.value;

    if (!id || !mBilgi || !marka || !model || !sahip || !fiyat) {
        showAlert("danger", "Tüm alanları doldurmanız gerekmektedir.");
        return;
    }

    const newSiparis = {
        id: id,
        mBilgi: mBilgi,
        marka: marka,
        model: model,
        sahip: sahip,
        fiyat: fiyat
    };

    addSiparisToStorage(newSiparis);
    showAlert("success", "Sipariş başarıyla kaydedildi.");

    clearFormInputs();
}

function addSiparisToStorage(siparis) {
    siparisListesi.push(siparis);
    localStorage.setItem("siparis", JSON.stringify(siparisListesi));
}

function pageloaded() {
    checkSiparisListFromStorage();
    siparisListesi.forEach(function (siparis) {
        addSiparisToUI(siparis);
    });
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2500);
}

function clearFormInputs() {
    IDInput.value = '';
    mBilgiInput.value = '';
    markaInput.value = '';
    modelInput.value = '';
    sahipInput.value = '';
    fiyatInput.value = '';
}
