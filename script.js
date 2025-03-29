document.addEventListener("DOMContentLoaded", function () {
	let tours = [
		{
			name: "Kotor",
			country: "Montenegro",
			date: "Aug 13 - Jul 20",
			price: 850,
			image: "images/Kotor1.png",
			image_class: "",
			coords: [42.4637, 18.7712]
		},
		{
			name: "Zadar",
			country: "Croatia",
			date: "Jun 3 - Jun 10",
			price: 700,
			image: "images/Zadar1.png",
			image_class: "",
			coords: [44.1194, 15.2318]
		},
		{
			name: "Ravenna",
			country: "Italy",
			date: "Jul 10 - Jul 17",
			price: 750,
			image: "images/Ravenna1.png",
			image_class: "",
			coords: [44.4184, 12.2047]
		},
		{
			name: "Palma",
			country: "Spain",
			date: "Jul 10 - Jul 17",
			price: 690,
			image: "images/Palma1.png",
			image_class: "",
			coords: [39.5696, 2.6502]
		},
		{
			name: "Herceg-Novi",
			country: "Montenegro",
			date: "Jun 3 - Jun 10",
			price: 710,
			image: "images/Herceg-Novi1.png",
			image_class: "",
			coords: [42.4584, 18.5344]
		},
		{
			name: "Venice",
			country: "Italy",
			date: "Aug 13 - Jul 20",
			price: 810,
			image: "images/Venice1.png",
			image_class: "",
			coords: [45.4408, 12.3155]
		},
		{
			name: "Marseille",
			country: "France",
			date: "Jul 10 - Jul 17",
			price: 760,
			image: "images/Marseille1.png",
			image_class: "",
			coords: [43.2965, 5.3698]
		},
		{
			name: "Barcelona",
			country: "Spain",
			date: "Aug 13 - Jul 20",
			price: 800,
			image: "images/Barcelona1.png",
			image_class: "",
			coords: [41.3784, 2.1915]
		},
		{
			name: "Durres",
			country: "Albania",
			date: "Jun 3 - Jun 10",
			price: 850,
			image: "images/Durres1.png",
			image_class: "",
			coords: [41.3231, 19.4543]
		}
	];	

	let cardsContainer = document.querySelector(".cards-container");
	let mapContainer = document.getElementById("map");
	let mapOverlay = document.getElementById("map-overlay");
	let map = L.map("map", {
		center: [42.0, 5.0],
		zoom: 5,
		minZoom: 4,
		maxZoom: 6,
		zoomSnap: 0.5,
		zoomDelta: 0.5,
		inertia: true,
		inertiaDeceleration: 2000
	});

	mapOverlay.addEventListener("click", () => {
		mapOverlay.style.display = "none";
	});

	mapContainer.addEventListener("mouseleave", () => {
		mapOverlay.style.display = "flex";
	});
	
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

	tours.forEach(tour => {
		let card = document.createElement("div");
		let mapCard = document.createElement("div");

		tour.image_class = tour.name + "-image";

		card.classList.add("card");
		card.innerHTML = `
			<img class="${tour.image_class}" src="${tour.image}" alt="${tour.name}">
			<h2>${tour.name}</h2>
			<p>${tour.country}, ${tour.name}</p>
			<p>${tour.date}</p>
			<div class="price-and-buy">
				<span>${tour.price}$</span>
				<button class="reserve-btn">Reserve</button>
			</div>
		`;

		card.querySelector(".reserve-btn").addEventListener("click", () => {
			reserveTour(tour);
		});

		cardsContainer.appendChild(card);

		// map
		mapCard.classList.add("map-card");
		mapCard.innerHTML = `
			<h2>${tour.name}</h2>
			<p>${tour.country}, ${tour.name}</p>
			<p>${tour.date}</p>
			<div class="price-and-buy">
				<span>${tour.price}$</span>
				<button class="reserve-btn">Reserve</button>
			</div>
		`;

		mapCard.querySelector(".reserve-btn").addEventListener("click", () => {
			reserveTour(tour);
		});

		L.marker(tour.coords)
            .addTo(map)
            .bindPopup(mapCard);
	});
});

function reserveTour(tour) {
	let reservedTours = JSON.parse(localStorage.getItem("reservedTours")) || [];
	
	if (!reservedTours.some(t => t.name === tour.name)) {
		reservedTours.push(tour);
		localStorage.setItem("reservedTours", JSON.stringify(reservedTours));
		
		window.location.href = "bookings.html";
	}

	else {
		alert("Tour is already reserved!");
	}
}
