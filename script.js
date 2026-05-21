const formularz = document.getElementById('reservationForm');
const wynik = document.getElementById('result');

formularz.addEventListener('submit', function(e) {
    e.preventDefault();

    const cenaKategorii = parseFloat(document.getElementById('category').value);
    const dataOdbioru = new Date(document.getElementById('pickup').value);
    const dataZwrotu = new Date(document.getElementById('return').value);

    const roznicaCzasu = dataZwrotu - dataOdbioru;
    const liczbaDni = Math.ceil(roznicaCzasu / (1000 * 60 * 60 * 24));

    if (liczbaDni <= 0) {
        wynik.innerHTML = 'Data zwrotu musi być późniejsza niż data odbioru!';
        wynik.style.color = 'red';
        return;
    }

    let kosztCalkowity = liczbaDni * cenaKategorii;
    let rabat = 0;

    if (liczbaDni > 5) {
        rabat = kosztCalkowity * 0.10;
        kosztCalkowity -= rabat;
    }

    wynik.style.color = 'black';
    wynik.innerHTML = `
        <h3>Podsumowanie rezerwacji</h3>
        <p><strong>Liczba dni:</strong> ${liczbaDni}</p>
        <p><strong>Koszt podstawowy:</strong> ${(liczbaDni * cenaKategorii).toFixed(2)} zł</p>
        <p><strong>Rabat:</strong> ${rabat.toFixed(2)} zł</p>
        <p><strong>Łączny koszt:</strong> ${kosztCalkowity.toFixed(2)} zł</p>
    `;
});