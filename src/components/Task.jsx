export default function Task(props) {
  const imgName = props.recurring ? "recurring" : "task";

  return (
    <div className="task">
      <img src={`${imgName}.png`} className="task-type-img" />
      <div className="task-info" onClick={props.openTask}>
        <p className={"task-name " + (props.status === "unchecked" ? "" : "checked")}>
          {props.name}
        </p>
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
  );
}
