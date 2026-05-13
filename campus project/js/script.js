const API_URL = "http://localhost:8080/events";

/* ================== ADD EVENT ================== */
async function addEvent() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const eventDate = document.getElementById("eventDate").value;
    const imageUrl = document.getElementById("imageUrl").value;

    if (!title || !description) {
        alert("Title and Description required!");
        return;
    }

    const event = { title, description, location, eventDate, imageUrl };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    });

    clearForm();
    loadEvents();
}

/* ================== LOAD EVENTS ================== */
async function loadEvents() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const eventList = document.getElementById("eventList");
    if (!eventList) return;

    eventList.innerHTML = "";

    data.forEach(event => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            ${event.imageUrl ? `<img src="${event.imageUrl}" class="card-img">` : ""}
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><b>Location:</b> ${event.location || "N/A"}</p>
            <p><b>Date:</b> ${event.eventDate || "N/A"}</p>

            <div class="btn-group">
                <button onclick="updateEvent(${event.id})">Edit</button>
                <button onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        `;

        eventList.appendChild(div);
    });
}

/* ================== DELETE ================== */
async function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadEvents();
}

/* ================== UPDATE ================== */
async function updateEvent(id) {
    const title = prompt("New title:");
    const description = prompt("New description:");
    const location = prompt("New location:");
    const eventDate = prompt("New date:");
    const imageUrl = prompt("New image URL:");

    if (!title || !description) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            location,
            eventDate,
            imageUrl
        })
    });

    loadEvents();
}

/* ================== IMAGE PREVIEW ================== */
function previewImage() {
    const url = document.getElementById("imageUrl").value;
    const img = document.getElementById("preview");

    if (!img) return;

    if (url) {
        img.src = url;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }
}

/* ================== CLEAR FORM ================== */
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("imageUrl").value = "";

    const img = document.getElementById("preview");
    if (img) img.style.display = "none";
}

/* ================== 🔥 HERO IMAGE SLIDER ================== */
/* 🔥 HERO BACKGROUND SLIDER */
/* 🔥 UNIQUE HERO IMAGES (Dashboard only) */
const heroImages = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", // conference talk
  "https://images.unsplash.com/photo-1552664730-d307ca884978",     // presentation room
  "https://images.unsplash.com/photo-1531482615713-2afd69097998", // hackathon vibe
  "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2", // workshop
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7"  // campus activity
];

let heroIndex = Math.floor(Math.random() * heroImages.length);

function changeHeroBackground() {
    const hero = document.querySelector(".hero-banner");
    if (!hero) return;

    hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    heroIndex = (heroIndex + 1) % heroImages.length;
}

window.onload = function () {
    loadEvents();

    changeHeroBackground();            // first load
    setInterval(changeHeroBackground, 4000); // smoother timing
};
