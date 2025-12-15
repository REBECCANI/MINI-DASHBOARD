const weatherCard = document.getElementById("weatherCard");
const currencyCard = document.getElementById("currencyCard");
const userCard = document.getElementById("userCard");

// Load all widgets on page load
loadWeather();
loadCurrency();
loadUser();


// --------------------------------------------------
// UTILITY HELPERS
// --------------------------------------------------

// Show loading text in any card
function showLoading(element) {
    element.innerHTML = `<p class="loading">Loading...</p>`;
}

// Show error message in any card
function showError(element, message = "Something went wrong") {
    element.innerHTML = `<p class="error">${message}</p>`;
}



// --------------------------------------------------
// 1️⃣ WEATHER SECTION
// --------------------------------------------------
async function loadWeather() {
    showLoading(weatherCard);

    const url = "https://api.open-meteo.com/v1/forecast?latitude=-1.95&longitude=30.06&current_weather=true";

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.current_weather) {
            showError(weatherCard, "No weather data.");
            return;
        }

        const w = data.current_weather;

        weatherCard.innerHTML = `
            <h3>Weather</h3>
            <p><strong>Temp:</strong> ${w.temperature}°C</p>
            <p><strong>Wind:</strong> ${w.windspeed} km/h</p>
            <p><strong>Time:</strong> ${w.time}</p>
        `;

    } catch (err) {
        showError(weatherCard, "Error loading weather");
        console.error(err);
    }
}



// --------------------------------------------------
// 2️⃣ CURRENCY SECTION
// --------------------------------------------------
async function loadCurrency() {
    showLoading(currencyCard);

    const url = "https://api.frankfurter.app/latest?from=USD&to=RWF,KES,EUR";

    try {
        const res = await fetch(url);
        const data = await res.json();

        const rates = data.rates;

        currencyCard.innerHTML = `
            <h3>Currency Rates (USD Base)</h3>
            <p><strong>USD → RWF:</strong> ${rates.RWF}</p>
            <p><strong>USD → KES:</strong> ${rates.KES}</p>
            <p><strong>USD → EUR:</strong> ${rates.EUR}</p>
        `;

    } catch (err) {
        showError(currencyCard, "Error loading currency");
        console.error(err);
    }
}



// --------------------------------------------------
// 3️⃣ RANDOM USER SECTION
// --------------------------------------------------
async function loadUser() {
    showLoading(userCard);

    const url = "https://randomuser.me/api/";

    try {
        const res = await fetch(url);
        const data = await res.json();

        const user = data.results[0];

        const name = `${user.name.first} ${user.name.last}`;
        const country = user.location.country;
        const picture = user.picture.large;

        userCard.innerHTML = `
            <h3>Random User</h3>
            <img src="${picture}" class="avatar">
            <h4>${name}</h4>
            <p>${country}</p>
        `;

    } catch (err) {
        showError(userCard, "Error loading user");
        console.error(err);
    }
}
const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀ Light Mode";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    toggleBtn.textContent = isDark ? "☀ Light Mode" : "🌙 Dark Mode";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});

