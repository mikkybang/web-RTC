async function playVideoFromCamera() {
  try {
    const constraints = { video: true, audio: { echoCancellation: true } };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // const constraints = {
    //   video: {
    //     cursor: "always" | "motion" | "never",
    //     displaySurface: "application" | "browser" | "monitor" | "window",
    //   },
    // };
    // const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
    const videoElement = document.querySelector("video#localVideo");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
}

playVideoFromCamera();


const socket = io.connect(location.host);

socket.on("connect", socket => {
  console.log("Client socket connected")
})

socket.on("update-user-list", ({ users }) => {
  updateUserList(users);
 });
  
 socket.on("remove-user", ({ socketId }) => {
  const elToRemove = document.getElementById(socketId);
  
  if (elToRemove) {
    elToRemove.remove();
  }
 });

socket.emit("test", {
  to: "to"
});
