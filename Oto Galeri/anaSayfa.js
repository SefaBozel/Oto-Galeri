const kaydetBtn = document.querySelector("#btnEkle");
const silBtn = document.querySelector("#btnSil");
const IDInput = document.querySelector("#ID");
const urunAdiInput = document.querySelector("#urunAdi");
const urunKategoriInput = document.querySelector("#urunKategori");
const stokBilgiInput = document.querySelector("#stokBilgi");
const urunEkleyenInput = document.querySelector("#urunEkleyen");
const urunResimInput = document.querySelector("#resimURL");
const tableBody = document.querySelector(".table tbody");

let stokListesi = [];

runEvents();

function runEvents() {
    document.addEventListener("DOMContentLoaded", pageloaded);
    kaydetBtn.addEventListener("click", addStok);
    silBtn.addEventListener("click", deleteStok);
}

function checkStokListesiFromStorage() {
    if (localStorage.getItem("stok") !== null) {
        stokListesi = JSON.parse(localStorage.getItem("stok"));
    }
}

function addStok(event) {
    event.preventDefault();

    const id = IDInput.value;
    const urunAdi = urunAdiInput.value;
    const urunKategori = urunKategoriInput.value;
    const stokBilgi = stokBilgiInput.value;
    const urunEkleyen = urunEkleyenInput.value;
    const urunResim = urunResimInput.value; // resim URL'sini al

    if (!id || !urunAdi || !urunKategori || !stokBilgi || !urunEkleyen || !urunResim) {
        showAlert("danger", "Tüm alanları doldurmanız gerekmektedir.");
        return;
    }

    const newStok = {
        id: id,
        urunAdi: urunAdi,
        urunKategori: urunKategori,
        stokBilgi: stokBilgi,
        urunEkleyen: urunEkleyen,
        urunResim: urunResim // Resim URL'sini direkt olarak kullan
    };

    addStokToUI(newStok);
    addStokToStorage(newStok);
    showAlert("success", "Ürün başarıyla kaydedildi.");

    clearFormInputs();
}

function addStokToUI(stok) {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
    <td>${stok.id}</td>
    <td>${stok.urunAdi}</td>
    <td>${stok.urunKategori}</td>
    <td>${stok.stokBilgi}</td>
    <td>${stok.urunEkleyen} TL</td>
    <td><img src="${stok.urunResim}" alt="Ürün Resmi" style="width: 120px; height: 110px;"></td>`; // Resmi görüntüle
}

function addStokToStorage(newStok) {
    stokListesi.push(newStok);
    localStorage.setItem("stok", JSON.stringify(stokListesi));
}

function pageloaded() {
    checkStokListesiFromStorage();
    stokListesi.forEach(function (stok) {
        addStokToUI(stok);
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
    urunAdiInput.value = '';
    urunKategoriInput.value = '';
    stokBilgiInput.value = '';
    urunEkleyenInput.value = '';
    urunResimInput.value = '';
}

function deleteStok() {
    const id = IDInput.value.trim();

    if (!id) {
        showAlert("danger", "Geçersiz ürün adı girdiniz");
        return;
    }

    const index = stokListesi.findIndex(stok => stok.id === id);

    if (index === -1) {
        showAlert("danger", "Bu isimde bir ürün bulunamadı.");
        return;
    }

    stokListesi.splice(index, 1);
    localStorage.setItem("stok", JSON.stringify(stokListesi));

    // UI'den öğeyi kaldır
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        if (row.cells.length > 1 && row.cells[1].textContent === id) {
            row.remove();
        }
    });
    clearFormInputs();
    showAlert("success", "Ürün başarıyla silindi.");
}


