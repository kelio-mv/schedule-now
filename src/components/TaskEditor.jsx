import React from "react";
import { Select, Option } from "./Select";
import { DateInput, TimeInput } from "./DateTimeInput";
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
      time: ":",
      date: "--",
    };
    if (props.editing) {
      this.state = { ...this.state, ...JSON.parse(localStorage.tasks)[props.taskIndex] };
    }

    this.weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  }

  handleWeekDayChange = (day, checked) => {
    // Toggle the state of the component
    checked = !checked;
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
          <p className="editor-label">Nome</p>
          <img src="close.png" className="editor-close-btn" onClick={this.props.closeModal} />

          <input
            className="editor-task-name"
            type="text"
            value={state.name}
            onInput={(e) => this.setState({ name: e.target.value })}
          />
          <hr />

          {/* Type */}
          <p className="editor-label">Tipo</p>
          <Select>
            <Option
              text="Tarefa comum"
              selected={state.recurring === false}
              onClick={() => this.setState({ recurring: false })}
            />
            <Option
              text="Tarefa recorrente"
              selected={state.recurring === true}
              onClick={() => this.setState({ recurring: true })}
            />
          </Select>
          <hr />

          {/* Frequency */}
          {state.recurring && (
            <>
              <p className="editor-label">Frequência</p>
              <Select>
                <Option
                  text="Diária"
                  selected={state.frequency === "daily"}
                  onClick={() => this.setState({ frequency: "daily" })}
                />
                <Option
                  text="Semanal"
                  selected={state.frequency === "weekly"}
                  onClick={() => this.setState({ frequency: "weekly" })}
                />
              </Select>

              {/* Week Days */}
              {state.frequency === "weekly" && (
                <Select>
                  {this.weekDays.map((day, index) => (
                    <Option
                      key={index}
                      text={day}
                      selected={state.scheduledDays.includes(index)}
                      onClick={(selected) => this.handleWeekDayChange(index, selected)}
                    />
                  ))}
                </Select>
              )}

              <hr />
            </>
          )}

          {/* Reminder */}
          {/* Inputs are disabled until type is set */}
          <p className="editor-label">Lembrete</p>
          <Select disabled={state.recurring === null}>
            <Option
              text="Sim"
              selected={state.reminder === true}
              onClick={() => this.setState({ reminder: true })}
            />
            <Option
              text="Não"
              selected={state.reminder === false}
              onClick={() => this.setState({ reminder: false })}
            />
          </Select>

          {/* Set date (when the task is not recurring) */}
          {state.reminder && !state.recurring && (
            <DateInput value={state.date} onChange={(date) => this.setState({ date })} />
          )}

          {/* Set time */}
          {state.reminder && (
            <TimeInput value={state.time} onChange={(time) => this.setState({ time })} />
          )}
          <hr />

          {/* Footer */}
          <div className="editor-footer">
            {this.props.editing && (
              <button className="editor-footer-btn-delete" onClick={this.deleteTask}>
                Excluir
              </button>
            )}
            <button className="editor-footer-btn-save" onClick={this.saveTask}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
