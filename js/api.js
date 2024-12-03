//Weather API
const apiKeyW = 'f3183bd954c14319846220121240212';

const locacionInput = document.getElementById('locacion');
const btnSearch = document.getElementById('btn-search');
const temperaturaL = document.getElementById('temperatura');
const iconWeather = document.getElementById('icono-clima');
const descripcionL = document.getElementById('descripcion');

btnSearch.addEventListener('click', BuscarClima);

function BuscarClima() {
    const locacion = locacionInput.value;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKeyW}&lang=es&q=${encodeURIComponent(locacion)}`)
    .then(response => response.json())
    .then(data => {
        const { locacion, current } = data;
        const temperatura = current.temp_c;

        temperaturaL.textContent = `${temperatura}°C`;
        descripcionL.textContent = current.condition.text;

        const icono = current.condition.icon;
        const URLicon = `https:${icono}`;
        iconWeather.setAttribute('src', URLicon);
        iconWeather.setAttribute('alt', current.condition.text);
     })
     .catch(error => console.error('Error:', error));


}


// Photos API

const requestUrl =
      'https://api.unsplash.com/search/photos?query=christmas&client_id=XGfsjSVNvC6nyI9cQcChmOUH4zh-TP_QNZMqDRK36EU';
    const getImagesButton = document.querySelector('.getImagesButton');
    const imageToDisplay = document.querySelector('.imageToDisplay');

    getImagesButton.addEventListener('click', async () => {
      let randomImage = await getNewImage();
      imageToDisplay.src = randomImage;
    });

    async function getNewImage() {
      let randomNumber = Math.floor(Math.random() * 10);
      return fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          let allImages = data.results[randomNumber];
          return allImages.urls.regular;
        });
    }


// Holiday API

const holidayInput = document.getElementById('holiday-info');
const holidayBtn = document.getElementById('btn-holiday');

const apiKeyHoliday = 'c2393182-c2b5-43a8-901e-303724cd5a33'; 

holidayBtn.addEventListener('click', BuscarFestividades);

function BuscarFestividades() {
    const country = 'US'; 
    const year = 2023

    fetch(`https://holidayapi.com/v1/holidays?key=${apiKeyHoliday}&country=${country}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            const holidays = data.holidays;
            if (holidays && holidays.length > 0) {
                let holidaysText = '';
                holidays.forEach(holiday => {
                    holidaysText += `<p>${holiday.date}: ${holiday.name}</p>`;
                });
                holidayInput.innerHTML = holidaysText;
            } else {
                holidayInput.innerHTML = 'No se encontraron festividades para este año.';
            }
        })
        .catch(error => {
            console.error('Error al obtener las festividades:', error);
            holidayInput.innerHTML = 'Error al obtener las festividades.';
        });
}


