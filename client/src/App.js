import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./App.css";

const SOCKETIO = "http://localhost:9090"

function App() {
const userVideo = useRef();
const partnerVideo = useRef();
const socket = useRef();



  return <div className="App"></div>;
}

export default App;
