// load back ass backdrop
var map = new L.Map('leaflet', {
	layers: [
		new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
		})
	],
	center: [40, 20],
	zoom: 1.5
});

var lite = L.icon({
	iconUrl: '../lite.png',
	iconSize: [20, 20], // size of the icon
	tooltipAnchor: [0, 0] // points the the tip of the leaf
});

var collection = [];
// connects to API to fetch data.
fetch('https://migrationtechtracker-api.herokuapp.com/api/countries').then((data) => {
	collection = data.json();
	return collection;
}).then((data) => {
	collection = data;
	// for each country
	data.forEach((country) => {

		let popupText = `
		<h3>${country.country}</h3>`;

		// for each usecase
		country.usecase.forEach((usecase) => {
			if (usecase.organization) {
				popupText += `<hr/><div id="organization"><b>${usecase.title}</b></div>`
			}
			else {
				popupText += `<hr/>
			<div id="title"><b>${usecase.title}</b> </div>`;
			}
			popupText += `
			<div id="subtitle">Department</div> ${usecase.department}<br/>
			<div id="subtitle">Details</div> ${usecase.details}<br/>
			<div id="subtitle">Sources</div>`

			usecase.source.forEach((source) => {
				if (source.link) {
					popupText += `<a href=${source.link}>${source.title}</a><br/>`
				}
				else {
					popupText += `${source.title}`
				}
			})

		})
		L.marker([country.latitude, country.longitude], { icon: lite }).addTo(map).bindPopup(popupText);
	})

})


// attributes of map.
// map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
if (map.tap) map.tap.disable();




//green icon
// var greenMarkerGoodTooltips = L.marker([51.475, -0.075], { icon: greenIcon }).addTo(map);
// greenMarkerGoodTooltips.bindTooltip("left", { direction: "left" }).openTooltip();
// greenMarkerGoodTooltips.bindTooltip("right", { direction: "right" }).openTooltip();
// greenMarkerGoodTooltips.bindTooltip("top", { direction: "top" }).openTooltip();
// greenMarkerGoodTooltips.bindTooltip("bottom", { direction: "bottom" }).openTooltip();



//this is a marker



	// L.marker([-40.9006, 174.8860]).addTo(map).bindPopup("I am a popup.").openPopup();




//aonther marker
// var marker = new L.marker([39.5, -77.3], { opacity: 0.01 }); //opacity may be set to zero
// marker.bindTooltip("<b>My HTML is here!!!!</b>", { permanent: true, className: "my-label", offset: [0, 0] });
// marker.addTo(map);


