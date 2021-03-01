/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { checkState } from './data';

export const mymap = L.map('map', {
  center: [0, 0],
  zoom: 1,
  worldCopyJump: true,
});

export function clearMap() {
  mymap.eachLayer((l) => mymap.removeLayer(l));
}

export function drawMap(countries, activeColumn, currentArray,
  drawSelectedTable, clearMainChart, drawChartsForSelectedCountry) {
  const layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  mymap.addLayer(layer);
  addMarkers(countries, activeColumn);
  selectCountryOnMapClick(currentArray, drawSelectedTable,
    clearMainChart, drawChartsForSelectedCountry);
}

export function redrawPopup(elem, currentArray) {
  mymap.closePopup();
  const countryObject = currentArray.find((el) => el.country === elem);
  mymap.setView(countryObject.coords, 3);
  const vals = Object.values(mymap._layers);
  vals[0]._latlng = { lat: 0, lng: 0 };
  const cc = vals.find((el) => el._latlng.lat === countryObject.coords[0]
  && el._latlng.lng === countryObject.coords[1]);
  cc.openPopup();
}

function addMarkers(countries, activeColumn) {
  let currentMark;
  const coef2 = countries[0].coef2;
  let coef = 10 * coef2;
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].flag !== '') {
      const latlngs = L.latLng(...countries[i].coords);
      if (activeColumn === 'Cases') {
        currentMark = countries[i].cases_c;
      } else if (activeColumn === 'Deaths') {
        currentMark = countries[i].deaths_c;
        coef = 0.3 * coef2;
      } else {
        currentMark = countries[i].recovered_c;
      }
      L.circle(latlngs, currentMark / coef, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        className: countries[i].id,
      }).addTo(mymap).bindPopup(`${countries[i].country}<br>${activeColumn}: ${currentMark}`);
    }
  }
}

function countryNameById(id, currentArray) {
  const countryObject = currentArray.find((el) => el.id === id);
  return countryObject.country;
}

function selectCountryOnMapClick(currentArray, drawSelectedTable,
  clearMainChart, drawChartsForSelectedCountry) {
  const countriesOnMap = document.querySelectorAll('.leaflet-clickable');
  for (let i = 0; i < countriesOnMap.length; i++) {
    countriesOnMap[i].addEventListener('click', (e) => {
      const currElem = document.querySelector('.selected-table td.country');
      const currCountry = countryNameById(e.target.classList[0], currentArray);
      currElem.innerText = currCountry;
      drawSelectedTable();
      let k = 1;
      k = checkState(k);
      clearMainChart();
      drawChartsForSelectedCountry(currCountry, k);
    });
  }
}

export function resizeMap(zoom) {
  mymap._onResize();
  mymap.setZoom(zoom);
}
