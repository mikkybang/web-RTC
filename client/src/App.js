import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./App.css";

const SOCKETIO = "http://localhost:9090";

function App() {
  // const [stream, setSteam] = useState();
  // const [yourId, setYourId] = useState("");
  // const [users, setUsers] = useState([]);
  // const [receivingCall, setRecevingCall] = useState(false);
  // const [caller, setCaller] = useState("");
  // const [callerSignal, setCallerSignal] = useState();
  // const [callAccepted, setCallAccepted] = useState(false);

  // const userVideo = useRef();
  // const partnerVideo = useRef();
  let socket;
  //const

  useEffect(() => {
    socket = io(SOCKETIO, { transports: ["websocket"] });
    socket.on("clientCon", () => {
      console.log("client connn");
    });

    socket.emit("clientHere", { name: "Michael" });
  }, [SOCKETIO]);

  // useEffect(() => {
  //   // navigator.mediaDevices
  //   //   .getUserMedia({ video: true, audio: true })
  //   //   .then((stream) => {
  //   //     setSteam(stream);
  //   //     if (userVideo.current) {
  //   //       userVideo.current.srcObject = stream;
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("Could not get media stream");
  //   //   });
  //   // console.log(socket);
  //   // socket.on("connect", (socket) => {
  //   //   console.log("Client socket connected");
  //   // });

  //   // console.log(socket.current);

  //   // socket.current.on("yourId", (id) => {
  //   //   setYourId(id);
  //   // });

  //   // socket.current.on("users", (data) => {
  //   //   console.log(data.users);
  //   //   setUsers(data.users);
  //   // });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  // // let UserVideo;
  // // if (stream) {
  // //   UserVideo = <video playsInline muted ref={userVideo} autoPlay></video>;
  // // }
  // // let PartnerVideo;
  // // if (callAccepted) {
  // //   PartnerVideo = (
  // //     <video playsInline muted ref={partnerVideo} autoPlay></video>
  // //   );
  // // }

  // const callPeer = (key) => {};

  // const acceptCall = () => {};

  return (
    <div className="App">
      {/* <div className="video-wrapper">
        {UserVideo}
        {PartnerVideo}
      </div>

      {users.map((key) => {
        if (key == yourId) {
          return null;
        }
        return <button> call {key} </button>;
      })} */}
    </div>
  );
}

export default App;
