const API_KEY = "MY_API_KEY";  

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `<h2>❌ City not found!</h2>`;
      setBackground("default");
      return;
    }

    const condition = data.weather[0].main.toLowerCase();
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <h3>${temp}°C | ${desc}</h3>
    `;

    setBackground(condition);
  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML = `<h2>⚠️ Error fetching weather</h2>`;
    setBackground("default");
  }
}

function setBackground(condition) {
  let imageName = "default";

  if (condition.includes("clear")) imageName = "clear";
  else if (condition.includes("cloud")) imageName = "cloud";
  else if (condition.includes("rain")) imageName = "rain";
  else if (condition.includes("snow")) imageName = "snow";
  else if (condition.includes("thunder")) imageName = "thunder";
  else if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    imageName = "mist";
  }

  const bgPath = `${imageName}.jpg`;  // ✅ direct filename, no folder
  console.log("Setting background:", bgPath);

  document.body.style.backgroundImage = `url('${bgPath}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

// Allow pressing "Enter" to trigger search
document.getElementById("cityInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent page reload
    getWeather();
  }
});
