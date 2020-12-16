import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./App.css";

const SOCKETIO = "http://localhost:9090";

function App() {
  const [stream, setSteam] = useState();
  const [yourId, setYourId] = useState("");
  const [users, setUsers] = useState({});
  const [receivingCall, setRecevingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(SOCKETIO);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setSteam(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
      .catch((err) => {
        alert("Could not get media stream");
      });
  }, []);

  let UserVideo;
  if (stream) {
    UserVideo = <video playsInline muted ref={userVideo} autoPlay></video>;
  }
  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <video playsInline ref={partnerVideo} autoPlay></video>;
  }

  return (
    <div className="App">
      {UserVideo}
      {PartnerVideo}
    </div>
  );
}

export default App;
