// 替换为你的OpenWeatherMap API Key
const API_KEY = '80441188dd59298e11ed05a60b505e66';

// API请求URL
function getWeatherApiUrl(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

// 获取天气数据并更新页面
async function fetchWeatherData() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    if (!latitude || !longitude) {
        alert('Please enter both latitude and longitude.');
        return;
    }

    try {
        const apiUrl = getWeatherApiUrl(latitude, longitude);
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-data').textContent = 'Failed to load weather data.';
    }
}

// 更新页面显示
function updateWeatherDisplay(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    const weatherInfo = `
        <div class="weather-card">
            <h2>❄️ ${data.name}</h2>
            <div class="weather-grid">
                <div class="weather-item">
                    <i class="fas fa-thermometer-half"></i>
                    <span>${data.main.temp}°C</span>
                </div>
                <div class="weather-item">
                    <i class="fas fa-cloud-sun"></i>
                    <span>${data.weather[0].description}</span>
                </div>
                <div class="weather-item">
                    <i class="fas fa-tint"></i>
                    <span>${data.main.humidity}%</span>
                </div>
                <div class="weather-item">
                    <i class="fas fa-wind"></i>
                    <span>${data.wind.speed} m/s</span>
                </div>
            </div>
        </div>
    `;
    weatherDataDiv.innerHTML = weatherInfo;
}

document.getElementById('latitude').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchWeatherData();
});

document.getElementById('longitude').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchWeatherData();
});
