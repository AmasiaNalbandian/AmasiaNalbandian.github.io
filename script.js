var map;
var lite;
var collection = [];

document.getElementById("overlayText").style.display = "none";
var width = document.documentElement.clientWidth;

window.onload = async () => {
  var done = await f;

  // Once all data is retrieved
  if (done) {
    document.getElementById("overlayText").style.display = "block";
    document.getElementById("loader").style.display = "none";
  }
};

// connects to API to fetch data.

var egypt = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "EGY",
      properties: {
		name: "Egypt",
		popupContent: "",
	  },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [34.9226, 29.50133],
            [34.64174, 29.09942],
            [34.42655, 28.34399],
            [34.15451, 27.8233],
            [33.92136, 27.6487],
            [33.58811, 27.97136],
            [33.13676, 28.41765],
            [32.42323, 29.85108],
            [32.32046, 29.76043],
            [32.73482, 28.70523],
            [33.34876, 27.69989],
            [34.10455, 26.14227],
            [34.47387, 25.59856],
            [34.79507, 25.03375],
            [35.69241, 23.92671],
            [35.49372, 23.75237],
            [35.52598, 23.10244],
            [36.69069, 22.20485],
            [36.86623, 22],
            [32.9, 22],
            [29.02, 22],
            [25, 22],
            [25, 25.6825],
            [25, 29.238655],
            [24.70007, 30.04419],
            [24.95762, 30.6616],
            [24.80287, 31.08929],
            [25.16482, 31.56915],
            [26.49533, 31.58568],
            [27.45762, 31.32126],
            [28.45048, 31.02577],
            [28.91353, 30.87005],
            [29.68342, 31.18686],
            [30.09503, 31.4734],
            [30.97693, 31.55586],
            [31.68796, 31.4296],
            [31.96041, 30.9336],
            [32.19247, 31.26034],
            [32.99392, 31.02407],
            [33.7734, 30.96746],
            [34.26544, 31.21936],
            [34.9226, 29.50133],
          ],
        ],
      },
    },
  ],
};
const f = fetch("https://migrationtechtracker-api.herokuapp.com/api/countries")
  .then((data) => {
    collection = data.json();
    return collection;
  })
  .then((data) => {
    // load back as backdrop
    map = new L.Map("leaflet", {
      layers: [
        // Find layers here for the map: https://leaflet-extras.github.io/leaflet-providers/preview/
        // new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        // 	'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // })
        // new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        // 	'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // })
        new L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
          }
        ),
      ],
      zoomControl: true,
      center: [30, 20],
      zoom: (width / 100) * 0.1, // calculate zoom based on user's page width
    });

    L.geoJson(egypt, {}).addTo(map);

    // Variable holding every polygon
    var gjsonMarker = [
      {
        type: "Feature",
        properties: {
          name: "Egypt",
          popupContent: "Portoferraio",
        },
		geometry: {
			type: "Polygon",
			coordinates: [
			  [
				[34.9226, 29.50133],
				[34.64174, 29.09942],
				[34.42655, 28.34399],
				[34.15451, 27.8233],
				[33.92136, 27.6487],
				[33.58811, 27.97136],
				[33.13676, 28.41765],
				[32.42323, 29.85108],
				[32.32046, 29.76043],
				[32.73482, 28.70523],
				[33.34876, 27.69989],
				[34.10455, 26.14227],
				[34.47387, 25.59856],
				[34.79507, 25.03375],
				[35.69241, 23.92671],
				[35.49372, 23.75237],
				[35.52598, 23.10244],
				[36.69069, 22.20485],
				[36.86623, 22],
				[32.9, 22],
				[29.02, 22],
				[25, 22],
				[25, 25.6825],
				[25, 29.238655],
				[24.70007, 30.04419],
				[24.95762, 30.6616],
				[24.80287, 31.08929],
				[25.16482, 31.56915],
				[26.49533, 31.58568],
				[27.45762, 31.32126],
				[28.45048, 31.02577],
				[28.91353, 30.87005],
				[29.68342, 31.18686],
				[30.09503, 31.4734],
				[30.97693, 31.55586],
				[31.68796, 31.4296],
				[31.96041, 30.9336],
				[32.19247, 31.26034],
				[32.99392, 31.02407],
				[33.7734, 30.96746],
				[34.26544, 31.21936],
				[34.9226, 29.50133],
			  ],
			],
		  },
      },
    
    ];
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
          layer.on("mouseout", function () {
            layer.closePopup();
          });
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
    });

    map.addLayer(gpsMarker);
    // map.fitBounds(gpsMarker.getBounds(), { padding: [0, 0] });


    // attributes of map.
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    // map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();

    lite = L.icon({
      iconUrl: "public/lite.png",
      iconSize: [30, 30], // size of the icon
      tooltipAnchor: [0, 0], // points the the tip of the leaf
    });

    // for each country
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
      var popup = L.marker([country.latitude, country.longitude], {
        icon: lite,
      })
        .addTo(map)
        .bindPopup(popupText);
      popup.addEventListener("popupclose", resetCenter);

      // closes pop ups on mouse-out
      map.on({
        mouseout: function () {
          popup.closePopup();
        },
      });
    });
    // Overlay text on the map
    // loadOverLay();

    return true;
  });

function resetCenter() {
  console.log("pop up was closed.");
  map.panTo([30, -10]);
}

function mapFocus() {
  document.getElementById("overlayText").style.display = "none";
}

function resetMap() {
  document.getElementById("overlayText").style.display = "block";
}

function mapResize() {
  // set the zoom level to 10
  // map.setZoom((1/width ));
}

// Function to mock up loading

function loadOverLay() {
  document.getElementById("maptext").innerHTML = `Innovative technologies have
	given rise to new ways to
	manage migration. These
	technologies are often
	deployed for purposes of
	efficiency, surveillance and
	tracking.<br/><br/>
	This tool tracks the
	development and deployment
	of technology in the migration
	sector to manage the flow of
	people across borders. The
	tool aims to capture key
	players, potential violations
	and leaders in the industry.`;
  document.getElementById("maptitle").innerHTML = ` Migration Tech Tracker`;
  document.getElementById("titleLine").style.display = "block";
}
