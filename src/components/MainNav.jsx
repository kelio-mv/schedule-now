import NavItem from "./MainNavItem";
import "./MainNav.css";

export default function MainNav(props) {
    const childProps = {
        selected: props.selected,
        onClick: (name) => name !== props.selected && props.onChange(name),
    };

    return (
        <nav id="main-nav">
            <NavItem name="today" {...childProps}>
                <img src="today.png" alt="today-icon" />
                <p>Hoje</p>
            </NavItem>

            <NavItem name="tasks" {...childProps}>
                <img src="task.png" alt="task-icon" />
                <p>Tarefas</p>
            </NavItem>

            <NavItem name="recurring-tasks" {...childProps}>
                <img src="recurring.png" alt="recurring-task-icon" />
                <p>Tarefas recorrentes</p>
            </NavItem>

            <NavItem name="new-task" onClick={props.displayEditor}>
                <img src="new-task.png" alt="new-task-icon" />
                <p>Nova tarefa</p>
            </NavItem>
        </nav>
    );
}
