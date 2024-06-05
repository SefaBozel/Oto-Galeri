document.addEventListener('DOMContentLoaded', (event) => {
    const girisbtn = document.getElementById("giris");
    const kAdi = document.getElementById("username");
    const sifre = document.getElementById("password");

    girisbtn.addEventListener("click", secim);

    function secim(){
        const kAdiValue = kAdi.value;
        const sifreValue = sifre.value;

        if (kAdiValue === "Admin" && sifreValue === "12345") {
            window.location.href = "anaSayfa.html";
        } else if (kAdiValue === "Kullanici" && sifreValue === "12345") {
            window.location.href = "mAnaSayfa.html";
        } else {
            alert("Hatalı kullanıcı adı veya şifre!");
        }
    }
});