// ===============================
// SWITCH KOTA ASAL & TUJUAN
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    const switchBtn = document.getElementById("switchKota");
    const kotaAsal = document.getElementById("kotaAsal");
    const kotaTujuan = document.getElementById("kotaTujuan");

    if (switchBtn) {
        switchBtn.addEventListener("click", function () {

            const temp = kotaAsal.value;
            kotaAsal.value = kotaTujuan.value;
            kotaTujuan.value = temp;

            switchBtn.classList.add("rotate");
            setTimeout(() => {
                switchBtn.classList.remove("rotate");
            }, 300);
        });
    }

});


// ===============================
// DATA SIMULASI TIKET (BANYAK)
// ===============================
const daftarTiket = [
    {
        maskapai: "Garuda Indonesia",
        jam: "07:00 - 10:00",
        harga: 1250000
    },
    {
        maskapai: "Lion Air",
        jam: "08:30 - 11:45",
        harga: 980000
    },
    {
        maskapai: "Citilink",
        jam: "09:15 - 12:30",
        harga: 1050000
    },
    {
        maskapai: "Batik Air",
        jam: "11:00 - 14:10",
        harga: 1150000
    },
    {
        maskapai: "AirAsia",
        jam: "13:40 - 16:50",
        harga: 920000
    }
];


// ===============================
// FORM SUBMIT (LIST TIKET)
// ===============================
document.getElementById("flightForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const asal = document.getElementById("kotaAsal").value || "Jakarta (CGK)";
    const tujuan = document.getElementById("kotaTujuan").value || "Bali (DPS)";
    const result = document.getElementById("result");

    if (asal === tujuan) {
        result.innerHTML = `
            <div class="alert alert-danger text-center">
                <i class="fas fa-exclamation-circle"></i>
                Kota asal dan tujuan tidak boleh sama
            </div>
        `;
        return;
    }

    // Loading
    result.innerHTML = `
        <div class="text-center my-4">
            <div class="spinner-border text-primary"></div>
            <p class="mt-2">Mencari tiket terbaik...</p>
        </div>
    `;

    // Delay biar terasa real
    setTimeout(() => {

        let html = "";

        daftarTiket.forEach(tiket => {
            html += `
                <div class="card ticket-card shadow-sm mb-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${asal} → ${tujuan}</strong><br>
                            <small class="text-muted">
                                ${tiket.maskapai} • ${tiket.jam}
                            </small>
                        </div>
                        <div class="fw-bold text-primary fs-5">
                            Rp ${tiket.harga.toLocaleString("id-ID")}
                        </div>
                        <button class="btn btn-warning btn-sm">
                            Pilih
                        </button>
                    </div>
                </div>
            `;
        });

        result.innerHTML = html;

        // Scroll otomatis ke hasil
        result.scrollIntoView({ behavior: "smooth" });

    }, 900);
});


// ===============================
// ANIMASI ROTATE (BONUS)
// ===============================
const style = document.createElement("style");
style.innerHTML = `
.rotate {
    animation: spin .3s linear;
}
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(180deg); }
}
`;
document.head.appendChild(style);

// ===============================
// UNSPLASH DESTINASI WISATA
// ===============================
document.addEventListener("DOMContentLoaded", async function () {

    const ACCESS_KEY = "baWs8OkvsOIyuwxtm-sEFQP1N63G_RiuJdObWO8TOC4";
    const gallery = document.getElementById("destinasiGallery");

    if (!gallery) return;

    const destinasi = [
        "Bali beach",
        "Raja Ampat",
        "Lombok island",
        "Yogyakarta tourism",
        "Labuan Bajo"
    ];

    gallery.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary"></div>
            <p class="mt-2">Memuat destinasi...</p>
        </div>
    `;

    try {
        let html = "";

        for (let kota of destinasi) {
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(kota)}&per_page=1&client_id=${ACCESS_KEY}`
            );

            if (!res.ok) {
                throw new Error("Gagal mengambil data Unsplash");
            }

            const data = await res.json();
            const photo = data.results[0];

            if (photo) {
                html += `
                    <div class="col-md-4">
                        <div class="card destinasi-card">
                            <img src="${photo.urls.regular}" alt="${kota}">
                            <div class="card-body text-center">
                                <strong>${kota.replace(" tourism","")}</strong>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        gallery.innerHTML = html;

    } catch (error) {
        gallery.innerHTML = `
            <div class="alert alert-danger text-center">
                Gagal memuat destinasi wisata
            </div>
        `;
        console.error(error);
    }

});
