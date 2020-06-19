const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];

// async function playVideoFromCamera() {
//   try {
//     const constraints = { video: true, audio: { echoCancellation: true } };
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     // const constraints = {
//     //   video: {
//     //     cursor: "always" | "motion" | "never",
//     //     displaySurface: "application" | "browser" | "monitor" | "window",
//     //   },
//     // };
//     // const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
//     const videoElement = document.querySelector("video#localVideo");
//     videoElement.srcObject = stream;
//   } catch (error) {
//     console.error("Error opening video camera.", error);
//   }
// }

// playVideoFromCamera();

const socket = io.connect(location.host);

socket.on("connect", (socket) => {
  console.log("Client socket connected");
});

socket.on("update-user-list", ({ users }) => {
  updateUserList(users);
});

socket.on("remove-user", ({ socketId }) => {
  const elToRemove = document.getElementById(socketId);

  if (elToRemove) {
    elToRemove.remove();
  }
});

socket.on("call-made", (data) => {
  if (getCalled) {
    const confirmed = confirm(
      `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
    );

    if (!confirmed) {
      socket.emit("reject-call", {
        from: data.socket
      });

      return;
    }
  }

  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("make-answer", {
    answer,
    to: data.socket
  });
  getCalled = true;
})

function updateUserList(socketIds) {
  const activeUserContainer = document.getElementById("active-user-container");

  socketIds.forEach((socketId) => {
    const alreadyExistingUser = document.getElementById(socketId);
    if (!alreadyExistingUser) {
      const userContainerEl = createUserItemContainer(socketId);
      activeUserContainer.appendChild(userContainerEl);
    }
  });
}

function createUserItemContainer(socketId) {
  const userContainerEl = document.createElement("div");

  const usernameEl = document.createElement("p");

  userContainerEl.setAttribute("class", "active-user");
  userContainerEl.setAttribute("id", socketId);
  usernameEl.setAttribute("class", "username");
  usernameEl.innerHTML = `Socket: ${socketId}`;
  userContainerEl.appendChild(usernameEl);

  userContainerEl.addEventListener("click", () => {
    // unselectUsersFromList();
    // userContainerEl.setAttribute("class", "active-user active-user--selected");
    // const talkingWithInfo = document.getElementById("talking-with-info");
    // talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
    callUser(socketId);
  });
  return userContainerEl;
}

async function callUser(socketId) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socket.emit("call-user", {
    offer,
    to: socketId,
  });
}

async function unselectUsersFromList() {
  return;
}
