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
		document.getElementById('loader').style.display = "none";
	}
}


// connects to API to fetch data.
const f = fetch('https://migrationtechtracker-api.herokuapp.com/api/countries').then((data) => {
	collection = data.json();
	return collection;
}).then((data) => {
	// load back as backdrop
	map = new L.Map('leaflet', {
		layers: [
			new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
				'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			})
		],
		zoomControl: false,
		center: [30, 20],
		zoom: ((width/100) * 0.10), 	// calculate zoom based on user's page width
	});


	// attributes of map.
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	// map.scrollWheelZoom.disable();
	// map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();

	lite = L.icon({
		iconUrl: 'public/lite.png',
		iconSize: [30, 30], // size of the icon
		tooltipAnchor: [0, 0] // points the the tip of the leaf
	});

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
			<div id="info"><div id="subtitle">Department</div> ${usecase.department}</div>
			<div id="info"><div id="subtitle">Details</div> ${usecase.details}<br/></div>
			<div id="info"><div id="subtitle">Sources</div></div>`

			usecase.source.forEach((source) => {
				if (source.link) {
					popupText += `<a href=${source.link}>${source.title}</a><br/>`
				}
				else {
					popupText += `${source.title}`
				}
			})

		})
		var popup = L.marker([country.latitude, country.longitude], { icon: lite }).addTo(map).bindPopup(popupText);
		popup.addEventListener('popupclose', resetCenter);

		// closes pop ups on mouse-out
		map.on({
			mouseout: function() {
				popup.closePopup();
			}
		})
	})
	loadOverLay();
	
	return true;
})


function resetCenter() {
	console.log("pop up was closed.");
	map.panTo([30, -10]);
}

function mapFocus(){
	document.getElementById("overlayText").style.display = "none";
}

function resetMap(){
	document.getElementById("overlayText").style.display = "block";	
}

function mapResize() {
	// set the zoom level to 10
	// map.setZoom((1/width ));  
}

// Function to mock up loading

function loadOverLay() {
	document.getElementById('maptext').innerHTML = `Innovative technologies have
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
	document.getElementById('maptitle').innerHTML = ` Migration Tech Tracker`;
	document.getElementById('titleLine').style.display = "block";
}
  
