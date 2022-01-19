var map;
var collection = [];

var width = document.documentElement.clientWidth;

window.onload = async () => {
  var done = await f;

  // Once all data is retrieved
  if (done) {
    document.getElementById("loader").style.display = "none";
  }
};

// connects to API to fetch data.
const f = fetch("https://migrationtechtracker-api.herokuapp.com/api/countries")
  .then((data) => {
    collection = data.json();
    return collection;
  })
  .then((data) => {
    // load map as backdrop
    map = new L.Map("leaflet", {
      layers: [
        // Find layers here for the map: https://leaflet-extras.github.io/leaflet-providers/preview/
        // new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        // 	'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // })
        // new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        // 	'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // })
        // new L.tileLayer(
        //   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        //   {
        //     attribution:
        //       "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
        //   }
        // ),
        new L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
          }
        ),
      ],
      zoomControl: true,
      center: [30, 20],
      zoom: (width / 100) * 0.1, // calculate zoom based on user's page width
    });

    // attributes of map.
    // map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    // map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();

    // Variable holding every polygon(country outline) with their hover state
    var gjsonMarker = [];

    // for each country in the database create the popup and polygon
    data.forEach((country) => {
      let popupText = `
		  <h3>${country.country}</h3>`;

      // for each usecase
      country.usecase.forEach((usecase) => {
        if (usecase.organization) {
          popupText += `<hr/><div id="organization"><b>${usecase.title}</b></div>`;
        } else {
          popupText += `<hr/>
			<div id="title"><b>${usecase.title}</b> </div>`;
        }
        popupText += `
			<div id="info"><div id="subtitle">Department</div> ${usecase.department}</div>
			<div id="info"><div id="subtitle">Details</div> ${usecase.details}<br/></div>
			<div id="info"><div id="subtitle">Sources</div></div>`;

        usecase.source.forEach((source) => {
          if (source.link) {
            popupText += `<a href=${source.link}>${source.title}</a><br/>`;
          } else {
            popupText += `${source.title}`;
          }
        });
      });

      let feature = JSON.parse(country.feature);
      feature.properties.popupContent = popupText;
      gjsonMarker.push(feature);
    });

    // function to add each geojson to the map with its own event
    gpsMarker = new L.geoJson(gjsonMarker, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent, {
            closeButton: false,
            offset: L.point(0, -20),
          });
          layer.on("onclick", function () {
            layer.openPopup();
          });
          layer.on("mouseover", function () {
            layer.setStyle({ color: "#ffa300", weight: 2, opacity: 1 });
          });
          layer.on("mouseout", function () {
            layer.setStyle({ color: "#3388FF", weight: 2, opacity: 1 });
          });
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
    });

    map.addLayer(gpsMarker);
    return true;
  });
