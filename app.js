document.getElementById('locationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const location = document.getElementById('locationInput').value;

    // Get current date in the required format (DD-MM-YYYY)
    const currentDate = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
    
    // Construct the API URL with dynamic parameters
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${location}&country=&method=8`;

    try {
        // Fetch prayer times data from API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.data && data.data.timings) {
            const prayerTimes = data.data.timings;

            // Display prayer times in the HTML
            const prayerTimesDisplay = document.getElementById('prayerTimes');
            prayerTimesDisplay.innerHTML = '<h2>Today\'s Prayer Times</h2>';
            prayerTimesDisplay.innerHTML += `<p>Fajr: ${prayerTimes.Fajr}</p>`;
            prayerTimesDisplay.innerHTML += `<p>Dhuhr: ${prayerTimes.Dhuhr}</p>`;
            prayerTimesDisplay.innerHTML += `<p>Asr: ${prayerTimes.Asr}</p>`;
            prayerTimesDisplay.innerHTML += `<p>Maghrib: ${prayerTimes.Maghrib}</p>`;
            prayerTimesDisplay.innerHTML += `<p>Isha: ${prayerTimes.Isha}</p>`;
        } else {
            throw new Error('Unable to fetch prayer times.');
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        // Display an error message to the user
        const prayerTimesDisplay = document.getElementById('prayerTimes');
        prayerTimesDisplay.innerHTML = '<p>Failed to fetch prayer times. Please try again later.</p>';
    }
});