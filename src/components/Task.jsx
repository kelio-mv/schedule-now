export default function Task(props) {
  function shouldRender() {
    switch (props.display) {
      case "today":
        if (props.recurring) {
          switch (props.frequency) {
            case "daily":
              return true;

            case "weekly":
              return props.scheduledDays.includes(new Date().getDay());

            default:
              return false;
          }
        } else {
          if (!props.reminder) return false;
          const [year, month, day] = props.date.split("-").map((e) => parseInt(e));
          const currentDate = new Date();
          return (
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth() + 1 &&
            day === currentDate.getDate()
          );
        }

      case "tasks":
        return !props.recurring;

      case "recurring-tasks":
        return props.recurring;

      default:
        return false;
    }
  }
  const imgName = props.recurring ? "recurring" : "task";

  return (
    shouldRender() && (
      <div className="task">
        <img src={`${imgName}.png`} className="task-type-img" />
        <div className="task-info" onClick={props.openTask}>
          <p className="task-name">{props.name}</p>
          {props.reminder && (
            <p className="task-time">
              <span>{props.time}</span>{" "}
              {!props.recurring && <span>{props.date.split("-").reverse().join(" / ")}</span>}
            </p>
          )}
        </div>
        <div style={{ flexGrow: 1 }} />
        <img src={`${props.status}.png`} className="task-status-img" onClick={props.changeStatus} />
      </div>
    )
  );
}
