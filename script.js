const API_KEY = "290168397c3f47c09ac203633250402";

document.getElementById("btn-weather").addEventListener("click", Weather);
document
  .getElementById("city-name")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      Weather();
    }
  });
async function Weather() {
  const cityName = document.getElementById("city-name").value.trim();
  let result = document.getElementById("weather-output");
  result.innerHTML = "";

  if (!cityName) {
    result.textContent = "Enter Your City Name !";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `The city is not available/Api error. Status: ${response.status}`
      );
    }
    const data = await response.json();
    console.log(data);
    let output = `
        <p>${data.location.name}, ${data.location.country}</p>
        <p>${data.current.temp_c}&deg;C</p>
        <p>${data.location.localtime}</p>
    `;
    result.innerHTML = output;
  } catch (err) {
    result.textContent = `Error: ${err.message}`;
  }
}
