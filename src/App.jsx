import { useState, useRef } from "react";
import MainNav from "./components/MainNav";
import MainArea from "./components/MainArea";
import "./App.css";

export default function App() {
    const [display, setDisplay] = useState("home");
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
                onChange={(itemName) => setDisplay(itemName)}
                displayEditor={() => mainAreaRef.current.setState({ displayEditor: true })}
            />
            <MainArea ref={mainAreaRef} display={display} />
        </>
    );
}

// Adicionar icone nas notif
// Melhorar design do date & time ou criar componentes
// Avisar sobre importância de ativar notificação
// a
