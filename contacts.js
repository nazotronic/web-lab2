document.addEventListener("DOMContentLoaded", function () {
	let mapContainer = document.querySelector(".map-container");
	let mapDiv = document.getElementById("map");
	let mapCard = document.createElement("div");
	let mapOverlay = document.getElementById("map-overlay");
	let map = L.map("map", {
		center: [49.810, 24.004],
		zoom: 5,
		minZoom: 15,
		maxZoom: 18,
		zoomSnap: 0.5,
		zoomDelta: 0.5,
		inertia: true,
		inertiaDeceleration: 2000
	});

	mapOverlay.addEventListener("click", () => {
		mapOverlay.style.display = "none";

		mapContainer.classList.add("scale");
	});

	mapDiv.addEventListener("mouseleave", () => {
		mapOverlay.style.display = "flex";

		mapContainer.classList.remove("scale");
	});

	mapCard.classList.add("map-card");
		mapCard.innerHTML = `
			<h2>Our office</h2>
			<p>Львів</p>
			<p>вул. В.Великого 14</p>
		`;
	
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
	L.marker([49.810, 24.004])
            .addTo(map)
			.bindPopup(mapCard);
});