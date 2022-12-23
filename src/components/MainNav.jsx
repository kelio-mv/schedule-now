import NavItem from "./MainNavItem";
import "./MainNav.css";

export default function MainNav(props) {
  const childProps = {
    selected: props.selected,
    onClick: (name) => name !== props.selected && props.onChange(name),
  };

  return (
    <nav id="main-nav">
      <NavItem text="Hoje" imgSrc="today.png" name="today" {...childProps} />
      <NavItem text="Tarefas" imgSrc="task.png" name="tasks" {...childProps} />
      <NavItem
        text="Tarefas recorrentes"
        imgSrc="recurring.png"
        name="recurring-tasks"
        {...childProps}
      />
      <NavItem
        text="Nova tarefa"
        imgSrc="new-task.png"
        name="new-task"
        onClick={props.displayEditor}
      />
    </nav>
  );
}
