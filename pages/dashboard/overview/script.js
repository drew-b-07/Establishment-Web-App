import supabase from "../../../utils/supabase.js";
import { protectPage } from "../../../utils/auth-guard.js";

window.addEventListener("DOMContentLoaded", async () => {
  await protectPage();

  const { data } = await supabase.auth.getUser();
  const { data: establishment_user, error } = await supabase.from("establishment_users").select("email").eq("email", data.user.email);

  if(error) {
    alert(error);
    return;
  }

  if(establishment_user.length === 0) {
    location.replace("../input_credentials/index.html");
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert('Logout failed: ' + error.message);
  } else {
    window.location.replace('/pages/login/index.html');
  }
});

async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if(error) {
    alert(error);
    location.replace("/pages/login/index.html");
  }

  return data.user;
}

async function getDeviceId() {
  const { data:device, error } = await supabase.from("establishments_devices").select("id").eq("est_user_id", user.id);
  if(error) {
    alert(error);
    location.replace("/pages/login/index.html");
  }

  return device;
}

const user = await getUser();
const device = (await getDeviceId())[0].id;

// Replace with your cluster details
const brokerUrl = "wss://f1b5b539bd3f4ade802600d72948b4f5.s1.eu.hivemq.cloud:8884/mqtt";

// const brokerUrl = "wss://f1b5b539bd3f4ade802600d72948b4f5.s1.eu.hivemq.cloud:8884/mqtt";

const options = {
  username: "smokeandfiremqtt",
  password: "Smoke&Fire.MQTT.W/HiveMQ12345",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(brokerUrl, options);

console.log(mqtt.connect);
console.log(client.stream);


/*
client.on("connect", () => {
  console.log("Web Dashboard connected to MQTT");
  
  // Subscribe to a device topic
  client.subscribe(`est/devices/${device}/heartbeat`, (err) => {
    if (!err) console.log("Subscribed to telemetry");
  });
});

client.on("message", (topic, payload) => {
  const message = JSON.parse(payload.toString());

  if (topic.endsWith("/heartbeat")) {
    document.getElementById("status").textContent = "Online";
    document.getElementById("last_active").textContent = new Date().toLocaleString();

    console.log("Online");
    console.log(new Date().toLocaleString());
  }

  else if (topic.endsWith("/readings")) {
    document.getElementById("temp_value").textContent = message.temp + "°C";
    document.getElementById("humid_value").textContent = message.humid + "%RH";
    document.getElementById("aqi_value").textContent = message.aqi;

    console.log(message.temp + " C");
    console.log(message.humid + "%RH");
    console.log(message.aqi);
    console.log(message.aqi_eq);
    
  }

  else if (topic.endsWith("/alerts")) {
    console.log("🚨 ALERT:", message);
    // You could insert alert row into UI table or notify user
  }

  console.log("📨", topic, message);
});
*/
client.on("connect", () => {
  console.log("✅ Web Dashboard connected to MQTT");

  console.log(device);

  // Subscribe to all topics for this device
  client.subscribe(`est/device/${device}/heartbeat`, (err) => {
    if(err) console.log("WHY?");

    client.publish(`est/device/${device}/heartbeat`, "hello from browser");
  });
  client.subscribe(`est/device/${device}/readings`);
  client.subscribe(`est/device/${device}/alerts`);

  console.log("📡 Subscribed to:", `est/device/${device}/#`);
});


client.on("message", (topic, payload) => {
  let message = payload.toString();
  console.log(topic);
  // try { message = JSON.parse(payload.toString()); }
  // catch { return console.warn("Invalid JSON:", payload.toString()); }


  // HEARTBEAT
  if (topic.endsWith("/heartbeat")) {
    // document.getElementById("status").textContent = "Online";
    // document.getElementById("last_active").textContent = new Date().toLocaleString();
    console.log("💓 Heartbeat received");
  }

  // READINGS
  else if (topic.endsWith("/readings")) {
    document.getElementById("temp_value").textContent = message.temperature + "°C";
    document.getElementById("humid_value").textContent = message.humidity + "%RH";
    document.getElementById("aqi_value").textContent = message.aqi;
    console.log("🌡 Temp:", message.temperature);
    console.log("💧 Humid:", message.humidity);
    console.log("🟢 AQI:", message.aqi, message.aqi_eq);
  }

  // ALERTS
  else if (topic.endsWith("/alerts")) {
    console.log("🚨 ALERT:", message.alert);
    // Show toast / push notification / UI popup here.
  }

  console.log("📨 Topic:", topic, "Message:", message);
});