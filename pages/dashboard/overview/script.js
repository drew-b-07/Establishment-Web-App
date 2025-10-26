//SCRIPT

const deviceStatus = "online";
const lastActive = "22:00:00 2025-10-22";

const statusIndicator = document.getElementById("status-indicator");
const statusText = document.getElementById("status-text");
const lastActiveElement = document.getElementById("last-active");

const logoutButton = document.getElementById("logout-button");
const closeBtn = document.getElementById('closeBtn');

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
    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){
        window.location.href= "../../login/index.html";
        return;
    }
});

// Add click event to hide overlay
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

//  Sample Data for Testing (Replace this with database fetch later)
const history_data = [
  {
    alert_id: "alert01",
    alert_type: "burning",
    establishment_name: "Blessed David Dorm",
    date: "2025-10-25",
    time: "16:40:00",
  },
  {
    alert_id: "alert02",
    alert_type: "vape",
    establishment_name: "Kobe's Dorm",
    date: "2025-10-22",
    time: "18:22:00",
  },
];

const history_images = [
  { alert_id: "alert01", img_url: "https://picsum.photos/seed/1/600/400", pos: 1 },
  { alert_id: "alert01", img_url: "https://picsum.photos/seed/2/600/400", pos: 2 },
  { alert_id: "alert02", img_url: "https://picsum.photos/seed/3/600/400", pos: 1 },
  { alert_id: "alert02", img_url: "https://picsum.photos/seed/4/600/400", pos: 2 },
];


//  DOM ELEMENTS (For easy reference)
const modal = document.getElementById("alert_modal");
const alertType = document.getElementById("alert_type");
const alertDate = document.getElementById("alert_date");
const alertTime = document.getElementById("alert_time");
const alertImg = document.getElementById("alert_img");
const imgPosition = document.getElementById("img_position");
const prevImg = document.getElementById("prev_img");
const nextImg = document.getElementById("next_img");
const deleteAlert = document.getElementById("delete_alert");
const historyTable = document.getElementById("history_table").querySelector("tbody");
const historyTableBody = document.getElementById("history_body");

let currentImages = [];
let currentPos = 1;


//  RENDER HISTORY TABLE
function renderHistoryTable(data) {
  historyTable.innerHTML = "";

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("history-row");

    // Add cells
    const nameCell = document.createElement("td");
    nameCell.textContent = item.establishment_name;

    const timeCell = document.createElement("td");
    timeCell.textContent = item.time;

    const dateCell = document.createElement("td");
    dateCell.textContent = item.date;

    const arrowCell = document.createElement("td");
    arrowCell.textContent = ">";

    // Append cells
    tr.append(nameCell, timeCell, dateCell, arrowCell);

    // 💡 Event: Open modal on click
    tr.addEventListener("click", () => openHistoryDetails(item));

    historyTable.appendChild(tr);
  });
}

//  OPEN MODAL FUNCTION
function openHistoryDetails(historyItem) {
  modal.style.display = "flex";

  // Populate modal data
  alertType.textContent =
    historyItem.alert_type.charAt(0).toUpperCase() + historyItem.alert_type.slice(1);
  alertDate.textContent = new Date(historyItem.date).toDateString();
  alertTime.textContent = historyItem.time;

  // Load matching images
  currentImages = history_images.filter(
    (img) => img.alert_id === historyItem.alert_id
  );
  currentPos = 1;

  showImage(currentPos);
}

// Dynamically create rows
history_data.forEach(item => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.time}</td>
    <td>${new Date(item.date).toDateString()}</td>
    <td class="right-arrow">&gt;</td>
  `;
  
  tr.addEventListener("click", () => openHistoryDetails(item));
  historyTableBody.appendChild(tr);
});

//  DISPLAY IMAGE FUNCTION
function showImage(pos) {
  const imgData = currentImages[pos - 1];
  if (imgData) {
    alertImg.src = imgData.img_url;
    imgPosition.textContent = `${pos} / ${currentImages.length}`;
  }
}

//  IMAGE NAVIGATION BUTTONS
prevImg.addEventListener("click", () => {
  if (currentPos > 1) {
    currentPos--;
    showImage(currentPos);
  }
});

nextImg.addEventListener("click", () => {
  if (currentPos < currentImages.length) {
    currentPos++;
    showImage(currentPos);
  }
});

//  CLOSE MODAL WHEN CLICKING OUTSIDE
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

//  DELETE BUTTON FUNCTION (Placeholder)
deleteAlert.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete this history?");

    if(confirmDelete){
      alert("This alert history deleted.");
      modal.style.display = "none";
    }
});

//  INITIAL LOAD
renderHistoryTable(history_data);