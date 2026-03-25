const API_URL = "http://localhost:8080/events";

// ADD EVENT
async function addEvent() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const eventDate = document.getElementById("eventDate").value;

    if (!title || !description) {
        alert("Title and Description required!");
        return;
    }

    const event = { title, description, location, eventDate };

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

// LOAD EVENTS
async function loadEvents() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    data.forEach(event => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
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

// DELETE EVENT
async function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadEvents();
}

// UPDATE EVENT (FIXED 🔥)
async function updateEvent(id) {
    const title = prompt("Enter new title:");
    const description = prompt("Enter new description:");
    const location = prompt("Enter new location:");
    const eventDate = prompt("Enter new date:");

    if (!title || !description) {
        alert("Update cancelled or invalid input");
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            location,
            eventDate
        })
    });

    loadEvents();
}

// CLEAR FORM
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
    document.getElementById("eventDate").value = "";
}

// AUTO LOAD
window.onload = loadEvents;