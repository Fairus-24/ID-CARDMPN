async function loadData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.body.innerHTML = "<h2>ID tidak ditemukan</h2>";
        return;
    }

    const response = await fetch("data.json");
    const data = await response.json();

    if (data[id]) {
        document.getElementById("nama").innerText = data[id].nama;
        document.getElementById("jabatan").innerText = data[id].jabatan;
        document.getElementById("foto").src = data[id].foto;
        document.getElementById("email").innerText = "Email: " + data[id].email;
        document.getElementById("telepon").innerText = "Telepon: " + data[id].telepon;

        // Generate QR Code
        const qrURL = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=https://username.github.io/id-card/?id=${id}`;
        document.getElementById("qr").src = qrURL;

    } else {
        document.body.innerHTML = "<h2>ID tidak valid</h2>";
    }
}

function downloadIDCard() {
    html2canvas(document.querySelector(".id-card")).then(canvas => {
        let link = document.createElement("a");
        link.download = "id_card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

window.onload = loadData;
