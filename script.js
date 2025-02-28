async function generateIDCard() {
    document.querySelector(".loading").style.display = "block";

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.body.innerHTML = "<h2>ID tidak ditemukan</h2>";
        return;
    }

    const response = await fetch("data.json");
    const data = await response.json();

    if (!data[id]) {
        document.body.innerHTML = "<h2>ID tidak valid</h2>";
        return;
    }

    const { nomor_registrasi, nama_lapangan, nama_angkatan, masa_berlaku, nama_lengkap, qr } = data[id];

    const frontCanvas = document.getElementById("frontCanvas");
    const backCanvas = document.getElementById("backCanvas");
    const ctxFront = frontCanvas.getContext("2d");
    const ctxBack = backCanvas.getContext("2d");

    // Load template ID card depan
    const templateFront = new Image();
    templateFront.src = "template_front.jpg"; // Ganti dengan URL template depan

    templateFront.onload = function() {
        ctxFront.drawImage(templateFront, 0, 0, frontCanvas.width, frontCanvas.height);

        ctxFront.font = "22px Arial";
        ctxFront.fillStyle = "black";
        ctxFront.fillText(nama_lengkap, 220, 100);
        ctxFront.fillText(nama_lapangan, 220, 150);
        ctxFront.fillText(nama_angkatan, 220, 200);
        ctxFront.fillText(masa_berlaku, 220, 250);

        document.querySelector(".loading").style.display = "none";
    };

    // Load template ID card belakang
    const templateBack = new Image();
    templateBack.src = "template_back.jpg"; // Ganti dengan URL template belakang

    templateBack.onload = function() {
        ctxBack.drawImage(templateBack, 0, 0, backCanvas.width, backCanvas.height);

        // Tambahkan QR Code di bagian belakang
        const qrCode = new Image();
        qrCode.src = `https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=${qr}`;
        qrCode.onload = function() {
            ctxBack.drawImage(qrCode, 250, 200, 100, 100);
        };
    };
}

// Fungsi untuk memutar ID card
function toggleFlip() {
    document.getElementById("flipCard").classList.toggle("flipped");
}

// Fungsi untuk download ID card
function downloadIDCard() {
    const canvas = document.querySelector(".flipped") ? document.getElementById("backCanvas") : document.getElementById("frontCanvas");
    const link = document.createElement("a");
    link.download = "id_card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

window.onload = generateIDCard;
