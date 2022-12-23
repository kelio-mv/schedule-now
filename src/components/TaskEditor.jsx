import React from "react";
import "./TaskEditor.css";

export default class TaskEditor extends React.Component {
  constructor(props) {
    super();

    this.state = {
      name: "",
      recurring: null,
      frequency: null,
      scheduledDays: [],
      reminder: null,
      time: "",
      date: "",
    };
    if (props.editing) {
      this.state = { ...this.state, ...JSON.parse(localStorage.tasks)[props.taskIndex] };
    }

    this.weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  }

  handleWeekDayChange = (day, checked) => {
    // The day is a number between 0 and 6
    if (checked) {
      this.setState({ scheduledDays: [...this.state.scheduledDays, day] });
    } else {
      this.setState({ scheduledDays: this.state.scheduledDays.filter((e) => e !== day) });
    }
  };

  saveTask = () => {
    // Check name
    if (this.state.name.length === 0) {
      alert("Defina um nome para sua tarefa!");
      return;
    }
    // Check type
    if (this.state.recurring === null) {
      alert("Defina um tipo para sua tarefa!");
      return;
    }
    // Check frequency when type is recurring
    if (this.state.recurring && !this.state.frequency) {
      alert("Defina uma frequência para sua tarefa!");
      return;
    }
    // Check selected days when type is recurring and frequency is weekly
    if (
      this.state.recurring &&
      this.state.frequency === "weekly" &&
      this.state.scheduledDays.length === 0
    ) {
      alert("Selecione pelo menos um dia da semana!");
      return;
    }
    // Check reminder
    if (this.state.reminder === null) {
      alert("Defina se sua tarefa terá um lembrete ou não!");
      return;
    }
    // Check time if reminder is enabled
    if (this.state.reminder && !this.state.time) {
      alert("Defina um horário pro lembrete!");
      return;
    }
    // Check date if reminder is enabled and type is not recurring
    if (this.state.reminder && !this.state.recurring && !this.state.date) {
      alert("Defina uma data pro lembrete!");
      return;
    }
    // If no errors are found then setup the task object
    const task = {
      name: this.state.name,
      recurring: this.state.recurring,
      reminder: this.state.reminder,
      status: "unchecked",
    };

    if (task.recurring) {
      task.statusLastUpdate = null;
      task.frequency = this.state.frequency;
      if (task.frequency === "weekly") {
        task.scheduledDays = this.state.scheduledDays;
      }
    } else {
      if (task.reminder) {
        task.date = this.state.date;
      }
    }
    if (task.reminder) {
      task.time = this.state.time;
      task.lastNotification = null;
    }
    // And finally save it
    let newTasks = JSON.parse(localStorage.tasks);

    if (this.props.editing) {
      newTasks[this.props.taskIndex] = task;
    } else {
      newTasks = [...newTasks, task];
    }
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    this.props.closeModal();
  };

  deleteTask = () => {
    const newTasks = JSON.parse(localStorage.tasks);
    newTasks.splice(this.props.taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    this.props.closeModal();
  };

  render() {
    const state = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          {/* Name */}
          <p className="label">Nome</p>
          <img
            src="close.png"
            alt="close-icon"
            className="close-btn"
            onClick={this.props.closeModal}
          />

          <input
            type="text"
            value={state.name}
            onInput={(e) => this.setState({ name: e.target.value })}
          />
          <hr />

          {/* Type */}
          <p className="label">Tipo</p>
          <div className="radio-inputs-container">
            <div>
              <input
                type="radio"
                id="radio-task"
                name="type"
                checked={state.recurring === false}
                onChange={() => this.setState({ recurring: false })}
              />
              <label htmlFor="radio-task">Tarefa comum</label>
            </div>
            <div>
              <input
                type="radio"
                id="radio-recurring-task"
                name="type"
                checked={state.recurring === true}
                onChange={() => this.setState({ recurring: true })}
              />
              <label htmlFor="radio-recurring-task">Tarefa recorrente</label>
            </div>
          </div>
          <hr />

          {/* Frequency */}
          {state.recurring && (
            <>
              <p className="label">Frequência</p>
              <div className="radio-inputs-container">
                <div>
                  <input
                    type="radio"
                    id="radio-daily"
                    name="frequency"
                    checked={state.frequency === "daily"}
                    onChange={() => this.setState({ frequency: "daily" })}
                  />
                  <label htmlFor="radio-daily">Diária</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="radio-weekly"
                    name="frequency"
                    checked={state.frequency === "weekly"}
                    onChange={() => this.setState({ frequency: "weekly" })}
                  />
                  <label htmlFor="radio-weekly">Semanal</label>
                </div>
              </div>

              {/* Week Days */}
              {state.frequency === "weekly" && (
                <div className="week-days-container">
                  {this.weekDays.map((day, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`week-day-${day}`}
                        checked={state.scheduledDays.includes(index)}
                        onChange={(e) => this.handleWeekDayChange(index, e.target.checked)}
                      />
                      <label htmlFor={`week-day-${day}`}>{day}</label>
                    </div>
                  ))}
                </div>
              )}

              <hr />
            </>
          )}

          {/* Reminder */}
          {/* Inputs are disabled until type is set */}
          <p className="label">Lembrete</p>
          <div className="radio-inputs-container">
            <div>
              <input
                type="radio"
                id="radio-remember-yes"
                name="reminder"
                checked={state.reminder === true}
                disabled={state.recurring === null}
                onChange={() => this.setState({ reminder: true })}
              />
              <label
                htmlFor="radio-remember-yes"
                className={state.recurring === null ? "disabled" : null}
              >
                Sim
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="radio-remember-no"
                name="reminder"
                checked={state.reminder === false}
                disabled={state.recurring === null}
                onChange={() => this.setState({ reminder: false })}
              />
              <label
                htmlFor="radio-remember-no"
                className={state.recurring === null ? "disabled" : null}
              >
                Não
              </label>
            </div>
          </div>

          {/* Set date (when the task is not recurring) */}
          {state.reminder && !state.recurring && (
            <input
              type="date"
              value={state.date}
              onChange={(e) =>
                this.setState({
                  date: e.target.value,
                })
              }
            />
          )}

          {/* Set time */}
          {state.reminder && (
            <input
              type="time"
              value={state.time}
              onChange={(e) =>
                this.setState({
                  time: e.target.value,
                })
              }
            ></input>
          )}

          <hr />
          <div className="buttons">
            {this.props.editing && (
              <button className="delete" onClick={this.deleteTask}>
                Excluir
              </button>
            )}
            <button className="save" onClick={this.saveTask}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
