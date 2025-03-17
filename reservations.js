document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".cards-container");

    let reservedTours = JSON.parse(localStorage.getItem("reservedTours")) || [];

    reservedTours.forEach(tour => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img class="${tour.image_class}" src="${tour.image}" alt="${tour.name}">
            <h2>${tour.name}</h2>
            <p>${tour.country}, ${tour.name}</p>
            <p>${tour.date}</p>
            <div class="price-and-buy">
                <button class="delete-btn">Delete</button>
            </div>
        `;

        card.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTour(tour.name);
        });

        container.appendChild(card);
    });
});

// Функція для видалення туру з localStorage
function deleteTour(tourName) {
    let reservedTours = JSON.parse(localStorage.getItem("reservedTours")) || [];
    reservedTours = reservedTours.filter(t => t.name !== tourName);
    localStorage.setItem("reservedTours", JSON.stringify(reservedTours));

    // Перезавантажуємо сторінку, щоб оновити список
    location.reload();
}
