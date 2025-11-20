"use strict";

// --- Configuration ---
const room = "tp3-room"; // Nom de la salle en dur pour simplifier
const socket = io.connect();

// Configuration STUN (Essentiel pour passer les NAT)
const rtcConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

// Variables globales
let localStream;
let rtcPeerConnection;
let dataChannel;
let isCaller = false;

// Éléments du DOM
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const sendButton = document.getElementById("sendButton");
const dataInput = document.getElementById("dataChannelSend");
const messagesDiv = document.getElementById("messages");

// --- 1. Capture des Médias (Extension Audio/Video) ---
async function startCapture() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    localStream = stream;
    localVideo.srcObject = stream;
    // On se connecte au serveur de signalisation une fois la cam prête
    socket.emit("create or join", room);
  } catch (e) {
    console.error("Erreur média:", e);
    alert("Impossible d'accéder à la caméra/micro");
  }
}

startCapture();

// --- 2. Gestion Signalisation (Socket.io) ---

socket.on("created", (room) => {
  console.log("Room créée, je suis l'initiateur");
  isCaller = true;
});

socket.on("joined", (room) => {
  console.log("Rejoint la room");
  isCaller = false;
});

socket.on("ready", () => {
  console.log("Les deux pairs sont là, on démarre WebRTC");
  if (isCaller) {
    createPeerConnection();
    // Le créateur initie le DataChannel
    createDataChannel();
    // Création de l'offre SDP
    rtcPeerConnection
      .createOffer()
      .then((offer) => rtcPeerConnection.setLocalDescription(offer))
      .then(() => {
        socket.emit("message", {
          type: "offer",
          sdp: rtcPeerConnection.localDescription,
        });
      });
  }
});

// Réception des messages de signalisation (SDP ou ICE)
socket.on("message", async (message) => {
  if (!rtcPeerConnection) createPeerConnection();

  if (message.type === "offer") {
    if (!isCaller) {
      await rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(message.sdp)
      );
      const answer = await rtcPeerConnection.createAnswer();
      await rtcPeerConnection.setLocalDescription(answer);
      socket.emit("message", {
        type: "answer",
        sdp: rtcPeerConnection.localDescription,
      });
    }
  } else if (message.type === "answer") {
    await rtcPeerConnection.setRemoteDescription(
      new RTCSessionDescription(message.sdp)
    );
  } else if (message.type === "candidate") {
    if (message.candidate) {
      await rtcPeerConnection.addIceCandidate(
        new RTCIceCandidate(message.candidate)
      );
    }
  }
});

// --- 3. WebRTC Core ---

function createPeerConnection() {
  if (rtcPeerConnection) return;

  rtcPeerConnection = new RTCPeerConnection(rtcConfig);

  // Gestion des candidats ICE (Traversée NAT)
  rtcPeerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("message", { type: "candidate", candidate: event.candidate });
    }
  };

  // Quand le flux distant arrive
  rtcPeerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  // Ajout de notre flux local à la connexion
  localStream.getTracks().forEach((track) => {
    rtcPeerConnection.addTrack(track, localStream);
  });

  // Si on n'est PAS l'initiateur, on attend le DataChannel via cet event
  rtcPeerConnection.ondatachannel = (event) => {
    setupDataChannel(event.channel);
  };
}

// --- 4. Data Channel (Chat) ---

function createDataChannel() {
  dataChannel = rtcPeerConnection.createDataChannel("chat");
  setupDataChannel(dataChannel);
}

function setupDataChannel(channel) {
  dataChannel = channel;
  dataChannel.onopen = () => {
    console.log("DataChannel ouvert !");
    dataInput.disabled = false;
    sendButton.disabled = false;
  };
  dataChannel.onmessage = (event) => {
    appendMessage("Pair: " + event.data);
  };
}

// Envoi du message
sendButton.onclick = () => {
  const data = dataInput.value;
  if (dataChannel && dataChannel.readyState === "open") {
    dataChannel.send(data);
    appendMessage("Moi: " + data);
    dataInput.value = "";
  }
};

function appendMessage(msg) {
  const p = document.createElement("p");
  p.innerText = msg;
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
