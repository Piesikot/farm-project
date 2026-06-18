    let alert_window = document.querySelector('.alert');
    let alert_button = document.querySelector('#alert-button');
    
    // ⓘ  teraz jest tutaj warunek 'if (alert_window && alert_button)' potrzebny, bo global.js działa na wszystkich podstronach, i jeśli element alertu nie istnieje na podstronie, to powoduje to błąd i zatrzymuje cały skrypt, blokując licznik. Warunek  chroni skrypt przed błędem na stronach, gdzie alert nie istnieje — dzięki temu licznik i reszta kodu mogą działać dalej.
if (alert_window && alert_button){
    alert_button.addEventListener('click', (e) => {
        alert_window.style.display = 'none';
    } );
}

// 🟡licznik muszę przerobić, żeby session storage działało
// ===============================
// SESSION STORAGE – GLOBAL START
// ===============================

// 1. Pobierz zapisany czas startu
let start = sessionStorage.getItem("startTime");

// 2. Jeśli nie istnieje — ustaw go (pierwsze wejście na stronę)
if (!start) {
    sessionStorage.setItem("startTime", Date.now());
    start = sessionStorage.getItem("startTime");
}

// 3. Zamień na liczbę
const startTime = parseInt(start, 10);

// 4. Oblicz różnicę czasu (ms)
function getSessionTime() {
    return Date.now() - startTime;
}



// ADAPTT Kill Counter code
        (function () {
        // ID list present on this page: count1 .. count18
        var ids = [
            'count1','count2','count3','count4','count5','count6','count7','count8','count9',
            'count10','count11','count12','count13','count14','count15','count16','count17','count18'
        ];

        // Approximate annual "millions" for each id (numbers taken/adapted from the ADAPTT example where applicable).
        // These are 'millions per year' values; adjust if you want different speeds.
        var millionsMap = {
            // Top of page: psy, koty
            'count1': 16,   // dogs
            'count2': 4,    // cats
            // Livestock / other (adapted from ADAPTT mapping)
            'count3': 90000, // marine animals
            'count4': 45895, // chickens
            'count5': 2262,  // (used here for wild boar as placeholder)
            'count6': 1244,  // pigs
            'count7': 857,   // turkeys (or other)
            'count8': 691,   // geese
            'count9': 533,   // sheep
            'count10': 515,  // goats
            'count11': 345,  // cows and calves
            'count12': 292,  // rabbits
            'count13': 65,   // rodents
            'count14': 63,   // pigeons and other birds
            'count15': 23,   // buffaloes
            'count16': 16,   // horses
            'count17': 4,    // donkeys and mules
            'count18': 4     // camels and camelids
        };

        var counts = {};
        var rate = {};
        var perSecond = 8; // updates per second

        function StartKillCounter() {
            ids.forEach(function (id) {
                counts[id] = 0;
                var millions = millionsMap[id] || 0;
                rate[id] = millions * 1000000 / 365 / 24 / 60 / 60 / perSecond;
            });
            setInterval(NewCounts, 1000 / perSecond);
        }

        function NewCounts() {
            ids.forEach(function (id) {
                counts[id] += rate[id];
                var num = Math.round(counts[id]);
                var el = document.getElementById(id);
                if (el) {
                    // Use en-US to ensure comma thousands separator
                    el.textContent = num.toLocaleString('en-US');
                }
            });
        }

        // Start when DOM is ready (script is at bottom, but this is safe)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', StartKillCounter);
        } else {
            StartKillCounter();
        }
    })();

    