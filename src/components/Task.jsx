export default function Task(props) {
    const shouldRender = () => {
        switch (props.display) {
            case "home":
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
    };
    const imgName = props.recurring ? "recurring" : "task";

    return (
        shouldRender() && (
            <div className="task">
                <img src={`${imgName}.png`} alt="curved-arrows-icon" className="type-img" />
                <div className="info" onClick={props.openTask}>
                    <p className="name">{props.name}</p>
                    {props.reminder && <p className="time">{props.time}</p>}
                </div>
                <div className="grow"></div>
                <img
                    src={`${props.status}.png`}
                    alt="task-status"
                    className="status-img"
                    onClick={props.changeStatus}
                />
            </div>
        )
    );
}
