import { useState, useRef } from "react";
import MainNav from "./components/MainNav";
import MainArea from "./components/MainArea";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("today");
  const mainAreaRef = useRef();
  // If there is no attribute "tasks" in localStorage then create one
  if (!localStorage.tasks) {
    localStorage.setItem("tasks", "[]");
  }
  // Ask for notification permission
  Notification.requestPermission();

  return (
    <>
      <MainNav
        selected={display}
        onChange={(name) => setDisplay(name)}
        displayEditor={() => mainAreaRef.current.setState({ displayEditor: true })}
      />
      <MainArea ref={mainAreaRef} display={display} />
    </>
  );
}

// Avisar sobre importância de ativar notificação

// Feedback Vinicius:
// tive dificuldade em entender o ícone de incompleto,
// ver se o lembrete foi criado ou não e onde ficou
