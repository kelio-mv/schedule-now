import "./NoTaskScreen.css";

export default function NoTaskScreen(props) {
  const noTaskSaved = localStorage.tasks === "[]";

  if (noTaskSaved) {
    return (
      <div id="no-task-screen">
        <img src="new-task.png" />
        <p>Hum... Parece que você não tem nenhuma tarefa.</p>
        <p>Clique em "Nova tarefa" na barra de navegação para criar uma.</p>
      </div>
    );
  } else {
    switch (props.display) {
      case "today":
        return (
          <div id="no-task-screen">
            <img src="today.png" />
            <p>Não há nenhuma tarefa agendada para hoje!</p>
          </div>
        );

      case "tasks":
        return (
          <div id="no-task-screen">
            <img src="task.png" />
            <p>Não há nenhuma tarefa comum!</p>
          </div>
        );

      case "recurring-tasks":
        return (
          <div id="no-task-screen">
            <img src="recurring.png" />
            <p>Não há nenhuma tarefa recorrente!</p>
          </div>
        );
    }
  }
}
