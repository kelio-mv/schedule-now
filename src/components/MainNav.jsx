import { useState } from "react";
import NavItem from "./MainNavItem";
import "./MainNav.css";

export default function MainNav(props) {
    function handleClick(itemName) {
        if (itemName === selected) return;
        setSelected(itemName);
        props.onChange(itemName);
    }

    const [selected, setSelected] = useState("home");
    const childProps = { onClick: handleClick, selected };

    return (
        <nav id="main-nav">
            <NavItem name="home" {...childProps}>
                <img src="/home.png" alt="home-icon" />
                <p>Início</p>
            </NavItem>

            <NavItem name="tasks" {...childProps}>
                <img src="/task.png" alt="checklist-icon" />
                <p>Tarefas</p>
            </NavItem>

            <NavItem name="recurring-tasks" {...childProps}>
                <img src="/recurring.png" alt="recurring-icon" />
                <p>Tarefas recorrentes</p>
            </NavItem>

            <NavItem name="new-task" onClick={props.displayEditor}>
                <img src="/new-task.png" alt="new-task-icon" />
                <p>Nova tarefa</p>
            </NavItem>
        </nav>
    );
}
