import { useState, useRef } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import MainNav from "./components/MainNav";
import MainArea from "./components/MainArea";
import "./App.css";

export default function App() {
  // If there is no attribute "tasks" in localStorage it means this is the
  // first time the user is running the app.
  const [isFirstTime, setIsFirstTime] = useState(!localStorage.tasks);
  const [display, setDisplay] = useState("today");
  const mainAreaRef = useRef();

  return isFirstTime ? (
    <WelcomeScreen onClose={() => setIsFirstTime(false)} />
  ) : (
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

// Mostrar aviso ao: criar tarefa, editar tarefa, excluir tarefa
// Bug da data e hora e trim
