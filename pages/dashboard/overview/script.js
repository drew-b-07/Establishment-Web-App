//SCRIPT

const deviceStatus = "online";
const lastActive = "22:00:00 2025-10-22";

const statusIndicator = document.getElementById("status-indicator");
const statusText = document.getElementById("status-text");
const lastActiveElement = document.getElementById("last-active");

const logoutButton = document.getElementById("logout-button");

// Set last active time
lastActiveElement.textContent = lastActive;

// Apply color and label based on status
if (deviceStatus === "online") {
    statusIndicator.style.backgroundColor = "#33cc33"; // green = "online"
    statusText.textContent = "Online";
} else {
    statusIndicator.style.backgroundColor = "#888888"; // gray = "offline"
    statusText.textContent = "Offline";
}

//Logout Button with Condition

logoutButton.addEventListener("click", function(){
    const confirmLogout = confirm("Are you sure you want to logout?")

    if(confirmLogout){
        window.location.href= "../../login/index.html";
        return;
    }
});

// Fetch history data from database.
const api_key = "pk.8329f7efe1c3c979a63e9e427efbffcc";
const history = [ // Example ONly
  { 
    alert_id: "hahahha",
    est_user_id: "kobepogi123",
    establishment_name: "Blessed David Dorm", 
    date: "2025-10-03", 
    time: "23:12:14", 
    owner_first_name: "Kobe",
    owner_last_name: "Tuazon",
    email: "kobepogi@gmail.com", 
    phone_number: "09123456789",
    est_user_lat: "14.997106",
    est_user_lng: "120.651287",
    has_responded: false
  },
  { 
    alert_id: "hahahha",
    est_user_id: "kobepogi123",
    establishment_name: "Blessed David Dorm", 
    date: "2025-10-03", 
    time: "23:12:14", 
    owner_first_name: "Kobe",
    owner_last_name: "Tuazon",
    email: "kobepogi@gmail.com", 
    phone_number: "09123456789",
    est_user_lat: "14.997106",
    est_user_lng: "120.651287",
    has_responded: false
  },
  { 
    alert_id: "hahahha1",
    est_user_id: "kobepogi1234",
    establishment_name: "Kobe's Dorm",
    date: "2025-10-04", 
    time: "23:12:14",
    owner_first_name: "Kobe",
    owner_last_name: "Tuazon",
    email: "kobepogi@gmail.com", 
    phone_number: "09123456789", 
    est_user_lat: "14.996588",
    est_user_lng: "120.652317",
    has_responded: true 
  }
];

const history_images = [ // Fetched when opened a history.
  { alert_id: "hahahha", img_url: "https://th.bing.com/th/id/OIP.AQ0oM-9Ju1X6an0V3VUaswHaHa?w=218&h=218&c=7&r=0&o=7&pid=1.7&rm=3", pos: 1 },
  { alert_id: "hahahha", img_url: "https://th.bing.com/th/id/OIP.aC6e5nrwEQyWRAkJ-lctRgHaHk?w=180&h=184&c=7&r=0&o=7&pid=1.7&rm=3", pos: 2 },
  { alert_id: "hahahha", img_url: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-icon-design-template-e0cf5f579779601ac472995db06ade04_screen.jpg?ts=1676231833", pos: 3 },
  { alert_id: "hahahha", img_url: "https://th.bing.com/th/id/OIP.JfhqWpPEW-FkzT5_xYuQDgHaHa?w=179&h=180&c=7&r=0&o=7&pid=1.7&rm=3", pos: 4 },
  { alert_id: "hahahha", img_url: "https://th.bing.com/th/id/OIP.O9X67MCDTAx9vI-ru8xDIQAAAA?w=181&h=181&c=7&r=0&o=7&pid=1.7&rm=3", pos: 5 },
  { alert_id: "hahahha1", img_url: "../../../assets/images/history-icon-yellow.png", pos: 1 },
  { alert_id: "hahahha1", img_url: "../../../assets/images/manage-profile-icon-yellow.png", pos: 2 },
  { alert_id: "hahahha1", img_url: "../../../assets/images/overview-icon-yellow.png", pos: 3 },
  { alert_id: "hahahha1", img_url: "../../../assets/images/settings-icon-yellow.png", pos: 4 },
  { alert_id: "hahahha1", img_url: "../../../assets/images/user-icon.png", pos: 5 }
];

const establishments_dropdown_menu = document.getElementById("establishments_dropdown_menu");
const history_table = document.getElementById("history_table");

const image_container = document.getElementById("image_container");
const img_current_pos = document.getElementById("img_current_pos");
const img_total = document.getElementById("img_total");
const back_image = document.getElementById("back_image");
const next_image = document.getElementById("next_image");

const establishment_name = document.getElementById("establishment_name");
const owner_name = document.getElementById("owner_name");
const owner_email = document.getElementById("owner_email");
const owner_pn = document.getElementById("owner_pn");
const history_time = document.getElementById("history_time");
const history_date = document.getElementById("history_date");


function showAllHistory() {
  // Clear existing options
  establishments_dropdown_menu.innerHTML = "";

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select Establishment";
  establishments_dropdown_menu.appendChild(defaultOption);

  // ✅ Remove duplicates by est_user_id
  const uniqueEstablishments = new Set();

  history.forEach(e => {
    if (!uniqueEstablishments.has(e.est_user_id)) {
      uniqueEstablishments.add(e.est_user_id);

      const option = document.createElement("option");
      option.value = e.est_user_id;
      option.textContent = e.establishment_name;
      establishments_dropdown_menu.appendChild(option);
    }
  });

  // Initially show all history
  renderTable(history);
}

function renderTable(data) {
  const tbody = history_table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear existing rows

  data.forEach(e => {
    const tr = document.createElement("tr");
    tr.classList.add("history-row");
    tr.addEventListener("click", () => {
      openHistoryDetails(e);
    });

    const idCell = document.createElement("td");
    idCell.textContent = e.alert_id;
    idCell.style.display = "none";
    tr.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.classList.add("est-name-history-list");
    nameCell.textContent = e.establishment_name;
    tr.appendChild(nameCell);

    const timeCell = document.createElement("td");
    timeCell.classList.add("time-history-list");
    timeCell.textContent = e.time;
    tr.appendChild(timeCell);

    const dateCell = document.createElement("td");
    dateCell.classList.add("date-history-list");
    dateCell.textContent = e.date;
    tr.appendChild(dateCell);

    tbody.appendChild(tr);
  });
}

establishments_dropdown_menu.addEventListener("change", (e) => {
  const selectedId = e.target.value;
  if (selectedId === "") {
    renderTable(history); // show all again
  } else {
    const filtered = history.filter(h => h.est_user_id === selectedId);
    renderTable(filtered);
  }
});

showAllHistory();