// Data simulasi tiket
const daftarTiket = [
    {
        maskapai: "Garuda Indonesia",
        jam: "07:00 - 10:00",
        harga: 1250000,
        kode: "GA-245"
    },
    {
        maskapai: "Lion Air",
        jam: "08:30 - 11:45",
        harga: 980000,
        kode: "JT-789"
    },
    {
        maskapai: "Citilink",
        jam: "09:15 - 12:30",
        harga: 1050000,
        kode: "QG-123"
    },
    {
        maskapai: "Batik Air",
        jam: "11:00 - 14:10",
        harga: 1150000,
        kode: "ID-456"
    },
    {
        maskapai: "AirAsia",
        jam: "13:40 - 16:50",
        harga: 920000,
        kode: "QZ-321"
    }
];

// ===============================
// DATA DESTINASI WISATA
// ===============================
const DESTINASI_WISATA = [
    {
        nama: "Bali",
        kode: "Bali (DPS)",
        deskripsi: "Pulau Dewata dengan pantai eksotis dan budaya yang kaya",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        nama: "Raja Ampat",
        kode: "Sorong (SOQ)",
        deskripsi: "Surga bawah laut dengan keanekaragaman hayati terbaik dunia",
        image: "https://images.unsplash.com/photo-1578319439587-0bcaa1b47b37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        nama: "Lombok",
        kode: "Lombok (LOP)",
        deskripsi: "Pulau eksotis dengan Gili Trawangan dan Gunung Rinjani",
        image: "https://images.unsplash.com/photo-1573991566397-45f244ca6cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        nama: "Yogyakarta",
        kode: "Yogyakarta (YIA)",
        deskripsi: "Kota budaya dengan Candi Borobudur dan Prambanan",
        image: "https://images.unsplash.com/photo-1562763451-84544b0801a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        nama: "Labuan Bajo",
        kode: "Labuan Bajo (LBJ)",
        deskripsi: "Gerbang menuju Pulau Komodo dan satwa purba",
        image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        nama: "Bromo",
        kode: "Malang (MLG)",
        deskripsi: "Gunung api aktif dengan panorama sunrise yang legendaris",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// ===============================
// RENDER DESTINASI WISATA
// ===============================
function loadDestinasiWisata() {
    const gallery = document.getElementById("destinasiGallery");
    const loading = document.getElementById("destinasiLoading");

    if (!gallery || !loading) {
        console.error("Element destinasiGallery atau destinasiLoading tidak ditemukan!");
        return;
    }

    // simulasi loading
    setTimeout(() => {
        loading.classList.add("d-none");
        gallery.classList.remove("d-none");

        gallery.innerHTML = "";

        DESTINASI_WISATA.forEach(destinasi => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0 destinasi-card">
                    <img 
                        src="${destinasi.image}" 
                        class="card-img-top" 
                        alt="${destinasi.nama}"
                        loading="lazy"
                        onerror="this.src='https://via.placeholder.com/500x300?text=Image+Not+Found'"
                    >
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${destinasi.nama}</h5>
                        <p class="card-text text-muted small flex-grow-1">
                            ${destinasi.deskripsi}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted small">${destinasi.kode}</span>
                            <button class="btn btn-primary btn-sm">
                                ✈️ Cari Tiket
                            </button>
                        </div>
                    </div>
                </div>
            `;

            gallery.appendChild(col);
        });
    }, 800);
}

// ===============================
// INIT SAAT HALAMAN DIMUAT
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    loadDestinasiWisata();
});


// Fungsi bantuan untuk localStorage
function getLocalStorageData() {
    return {
        searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
        favoriteFlights: JSON.parse(localStorage.getItem('favoriteFlights')) || [],
        bookingHistory: JSON.parse(localStorage.getItem('bookingHistory')) || [],
        userProfile: JSON.parse(localStorage.getItem('userProfile')) || {
            name: 'Guest User',
            email: 'guest@example.com',
            phone: '',
            address: '',
            joinDate: new Date().toISOString().split('T')[0],
            totalOrders: 0
        }
    };
}

// Show notification
function showMessage(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <strong>${type.toUpperCase()}:</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set tanggal default
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const tanggalBerangkat = document.getElementById('tanggalBerangkat');
    const tanggalPulang = document.getElementById('tanggalPulang');
    
    if (tanggalBerangkat) {
        tanggalBerangkat.value = today;
        tanggalBerangkat.min = today;
    }
    
    if (tanggalPulang) {
        tanggalPulang.value = tomorrowStr;
        tanggalPulang.min = tomorrowStr;
    }
    
    // Event listener untuk tanggal berangkat
    if (tanggalBerangkat && tanggalPulang) {
        tanggalBerangkat.addEventListener('change', function() {
            const berangkatDate = new Date(this.value);
            const minPulang = new Date(berangkatDate);
            minPulang.setDate(minPulang.getDate() + 1);
            tanggalPulang.min = minPulang.toISOString().split('T')[0];
        });
    }
    
    // Switch kota
    const switchBtn = document.getElementById('switchKota');
    const kotaAsal = document.getElementById('kotaAsal');
    const kotaTujuan = document.getElementById('kotaTujuan');
    
    if (switchBtn) {
        switchBtn.addEventListener('click', function() {
            if (kotaAsal && kotaTujuan) {
                const temp = kotaAsal.value;
                kotaAsal.value = kotaTujuan.value;
                kotaTujuan.value = temp;
                
                this.classList.add('rotate');
                setTimeout(() => this.classList.remove('rotate'), 300);
            }
        });
    }
    
    // Auto-fill kota jika kosong
    if (kotaAsal && !kotaAsal.value) kotaAsal.value = 'Jakarta (CGK)';
    if (kotaTujuan && !kotaTujuan.value) kotaTujuan.value = 'Bali (DPS)';
    
    // Form submit
    const flightForm = document.getElementById('flightForm');
    if (flightForm) {
        flightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchFlights();
        });
    }
    
    
    // Update recent searches
    updateRecentSearches();
});

// Search flights
function searchFlights() {
    const asal = document.getElementById('kotaAsal')?.value || 'Jakarta (CGK)';
    const tujuan = document.getElementById('kotaTujuan')?.value || 'Bali (DPS)';
    const result = document.getElementById('result');
    
    if (!result) return;
    
    // Validasi
    if (asal === tujuan) {
        result.innerHTML = `
            <div class="alert alert-danger text-center">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Kota asal dan tujuan tidak boleh sama
            </div>
        `;
        return;
    }
    
    // Simpan ke riwayat pencarian
    const data = getLocalStorageData();
    const searchItem = {
        origin: asal,
        destination: tujuan,
        date: document.getElementById('tanggalBerangkat')?.value || new Date().toISOString().split('T')[0],
        class: document.querySelector('select[name="kelas"]')?.value || 'Ekonomi',
        passengers: document.querySelector('select[name="penumpang"]')?.value || '1',
        timestamp: new Date().toISOString()
    };
    
    data.searchHistory.unshift(searchItem);
    if (data.searchHistory.length > 10) data.searchHistory.pop();
    localStorage.setItem('searchHistory', JSON.stringify(data.searchHistory));
    
    // Update recent searches
    updateRecentSearches();
    
    // Loading
    result.innerHTML = `
        <div class="text-center my-5 py-4">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
            <p class="mt-3 fs-5">Mencari tiket terbaik...</p>
        </div>
    `;
    
    // Simulasi delay
    setTimeout(() => {
        displayFlightResults(asal, tujuan);
    }, 1000);
}

// Display flight results
function displayFlightResults(asal, tujuan) {
    const result = document.getElementById('result');
    let html = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4><i class="fas fa-plane-departure text-primary"></i> Hasil Pencarian</h4>
            <span class="badge bg-primary">${daftarTiket.length} penerbangan</span>
        </div>
    `;
    
    daftarTiket.forEach((tiket, index) => {
        const flightId = Date.now() + index;
        const airportCodeAsal = asal.match(/\(([A-Z]{3})\)/)?.[1] || 'CGK';
        const airportCodeTujuan = tujuan.match(/\(([A-Z]{3})\)/)?.[1] || 'DPS';
        
        html += `
            <div class="card ticket-card mb-3" data-flight-id="${flightId}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="d-flex align-items-center mb-3">
                                <div class="airline-logo me-3">${tiket.maskapai.charAt(0)}</div>
                                <div>
                                    <strong class="airline-name fs-5">${tiket.maskapai}</strong>
                                    <small class="text-muted d-block">
                                        <i class="far fa-clock me-1"></i>${tiket.jam}
                                    </small>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="text-center">
                                    <div class="fw-bold fs-4">${airportCodeAsal}</div>
                                    <small class="text-muted">${asal.split('(')[0].trim()}</small>
                                </div>
                                <div class="mx-4">
                                    <i class="fas fa-long-arrow-alt-right text-primary fa-lg"></i>
                                </div>
                                <div class="text-center">
                                    <div class="fw-bold fs-4">${airportCodeTujuan}</div>
                                    <small class="text-muted">${tujuan.split('(')[0].trim()}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="fw-bold text-primary fs-3 mb-2">
                                Rp ${tiket.harga.toLocaleString('id-ID')}
                            </div>
                            <small class="text-muted d-block mb-2">per orang</small>
                            <div class="d-flex justify-content-end gap-2">
                                <button class="btn btn-outline-primary btn-sm" onclick="toggleFavorite(${flightId}, '${tiket.maskapai}', '${airportCodeAsal}', '${airportCodeTujuan}')">
                                    <i class="far fa-heart"></i> Favorit
                                </button>
                                <button class="btn btn-warning btn-sm px-3" onclick="selectFlight('${asal}', '${tujuan}', '${tiket.maskapai}', '${tiket.jam}', ${tiket.harga})">
                                    <i class="fas fa-ticket-alt me-1"></i>Pilih
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    result.innerHTML = html;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Toggle favorite
function toggleFavorite(flightId, airline, fromCode, toCode) {
    const data = getLocalStorageData();
    let favoriteFlights = data.favoriteFlights;
    
    const existingIndex = favoriteFlights.findIndex(f => f.id === flightId);
    
    if (existingIndex > -1) {
        favoriteFlights.splice(existingIndex, 1);
        showMessage('Dihapus dari favorit', 'info');
    } else {
        const favorite = {
            id: flightId,
            airline: airline,
            flightNumber: airline.substring(0, 2).toUpperCase() + Math.floor(100 + Math.random() * 900),
            departure: { code: fromCode, timeString: '07:00' },
            arrival: { code: toCode, timeString: '10:00' },
            price: Math.floor(Math.random() * 1000000) + 500000,
            addedDate: new Date().toISOString()
        };
        
        favoriteFlights.unshift(favorite);
        showMessage('Ditambahkan ke favorit', 'success');
    }
    
    localStorage.setItem('favoriteFlights', JSON.stringify(favoriteFlights));
}

// Select flight
function selectFlight(asal, tujuan, maskapai, jam, harga) {
    const message = `Pilih penerbangan:\n\n` +
                   `Rute: ${asal} → ${tujuan}\n` +
                   `Maskapai: ${maskapai}\n` +
                   `Waktu: ${jam}\n` +
                   `Harga: Rp ${harga.toLocaleString('id-ID')}\n\n` +
                   `Lanjutkan pembayaran?`;
    
    if (confirm(message)) {
        const data = getLocalStorageData();
        
        const booking = {
            id: Date.now(),
            airline: maskapai,
            flightNumber: maskapai.substring(0, 2).toUpperCase() + Math.floor(100 + Math.random() * 900),
            route: `${asal} → ${tujuan}`,
            date: new Date().toISOString().split('T')[0],
            price: harga,
            status: 'completed',
            bookingCode: `BOOK${Math.floor(100000 + Math.random() * 900000)}`
        };
        
        data.bookingHistory.unshift(booking);
        localStorage.setItem('bookingHistory', JSON.stringify(data.bookingHistory));
        
        data.userProfile.totalOrders = (data.userProfile.totalOrders || 0) + 1;
        localStorage.setItem('userProfile', JSON.stringify(data.userProfile));
        
        showMessage('Pemesanan berhasil! Tiket akan dikirim ke email Anda.', 'success');
    }
}

// Update recent searches
function updateRecentSearches() {
    const recentSearches = document.getElementById('recentSearches');
    if (!recentSearches) return;
    
    const data = getLocalStorageData();
    if (data.searchHistory.length > 0) {
        const latest = data.searchHistory[0];
        recentSearches.innerHTML = `
            <i class="fas fa-history me-1"></i>Pencarian terakhir: 
            <span class="badge bg-light text-dark border ms-1">
                ${latest.origin} <i class="fas fa-arrow-right fa-xs mx-1"></i> ${latest.destination} (${latest.date})
            </span>
        `;
    }
}

// Load destinasi wisata
function loadDestinasiWisata() {
    const gallery = document.getElementById('destinasiGallery');
    const loading = document.getElementById('destinasiLoading');

    if (!gallery) return;

    let html = '';

    DESTINASI_WISATA.forEach(destinasi => {
        html += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm destinasi-card">
                    <img 
                        src="${destinasi.image}" 
                        alt="${destinasi.nama}"
                        class="card-img-top"
                        style="height:220px; object-fit:cover"
                        loading="lazy"
                    >
                    <div class="card-body">
                        <h5 class="fw-bold">${destinasi.nama}</h5>
                        <p class="text-muted">${destinasi.deskripsi}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <button class="btn btn-primary btn-sm"
                                onclick="cariTiketKe('${destinasi.kode}')">
                                ✈️ Cari Tiket
                            </button>
                            <small class="fw-semibold text-muted">${destinasi.kode}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Render
    gallery.innerHTML = html;

    // Sembunyikan spinner & tampilkan gallery
    loading.classList.add('d-none');
    gallery.classList.remove('d-none');
}


// Auto search from destination
function cariTiketKe(destinasi) {
    const kotaTujuan = document.getElementById('kotaTujuan');
    const kotaAsal = document.getElementById('kotaAsal');
    const flightForm = document.getElementById('flightForm');
    
    if (kotaTujuan) {
        kotaTujuan.value = destinasi;
        
        if (kotaAsal && !kotaAsal.value) {
            kotaAsal.value = 'Jakarta (CGK)';
        }
        
        // Trigger form submit
        setTimeout(() => {
            if (flightForm) {
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                flightForm.dispatchEvent(submitEvent);
                
                // Scroll ke hasil
                setTimeout(() => {
                    const resultSection = document.getElementById('result');
                    if (resultSection) {
                        resultSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 600);
            }
        }, 500);
    }
}