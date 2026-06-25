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
// Global variables: ___________________________________________________________________

		var counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		var rate = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		
		// Functions: __________________________________________________________________________
		
		function StartKillCounter() {
			var millions = [ 90000, 45895, 2262, 1244, 857, 691, 533, 515, 345, 292, 65, 63, 23, 16, 4, 4, 3, 2 ];
			var perSecond = 8;
			for (var i = 0; i < counts.length; ++i) 
				rate[i] = millions[i] * 1000000 / 365 / 24 / 60 / 60 / perSecond;
			setInterval(NewCounts, 1000 / perSecond);
		}
		
		function NewCounts() {
			var num, thous, str;
			for (var i = 0; i < counts.length; ++i) {
				counts[i] += rate[i];
				num = Math.round(counts[i]);
				str = "";
				while (num > 1000) {
					thous = num % 1000;
					if (thous < 10)
						thous = "00" + thous;
					else if (thous < 100)
						thous = "0" + thous;
					str = "," + thous + str;
					num = Math.floor(num / 1000);
				}
				str = num + str;
				// document.getElementById("count" + i).innerHTML = str;

                // document.querySelectorAll(".count" + i).innerHTML = str;
                //querySelectorAll() zwraca NodeList (listę wielu elementów), a nie pojedynczy element — więc ta linijka nic nie robi.  

                document.querySelectorAll(".count" + i).forEach(el => {
                    el.innerHTML = str;
                    });
                //querySelectorAll(".count" + i) → znajduje wszystkie elementy z klasą count0, count1, itd., a forEach(el => ...) → przechodzi po każdym z nich i ustawia innerHTML.

			}
		}


		StartKillCounter();
    