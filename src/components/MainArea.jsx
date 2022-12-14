import React from "react";
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import NoTaskScreen from "./NoTaskScreen";
import EventNotification from "./EventNotification";
import "./MainArea.css";

export default class MainArea extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: this.getTasks(),
      displayEditor: false,
      editing: false,
      currentTaskIndex: null,
      eventMessage: null,
    };
  }

  componentDidMount() {
    this.runNotifier();
    this.notifierInterval = setInterval(this.runNotifier, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.notifierInterval);
  }

  runNotifier = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString().slice(0, 5);
    const notifOptions = { body: `ScheduleNow - ${currentTime}`, icon: "today.png" };
    const tasks = JSON.parse(localStorage.tasks);
    let lateTasks = 0;

    tasks.forEach((task) => {
      if (!task.reminder) return;

      if (
        !task.recurring &&
        !task.lastNotification &&
        new Date().getTime() >= new Date(`${task.date}T${task.time}`).getTime()
      ) {
        new Notification(task.name, {
          ...notifOptions,
          body: `Schedule Now - ${task.date.split("-").reverse().join("/")} ${task.time}`,
        });
        task.lastNotification = currentDate;
      } else if (
        task.recurring &&
        task.lastNotification !== currentDate &&
        (task.frequency === "daily" ||
          (task.frequency === "weekly" && task.scheduledDays.includes(new Date().getDay())))
      ) {
        if (task.time === currentTime) {
          new Notification(task.name, notifOptions);
          task.lastNotification = currentDate;
        } else if (
          new Date(`2022-01-01T${currentTime}`).getTime() >
          new Date(`2022-01-01T${task.time}`).getTime()
        ) {
          lateTasks++;
          task.lastNotification = currentDate;
        }
      }
    });
    if (lateTasks > 0) {
      new Notification(`Voc?? tem ${lateTasks} tarefa(s) pendente(s).`, notifOptions);
    }
    // If something changed localStorage will be updated
    if (JSON.stringify(tasks) !== localStorage.tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  getTasks() {
    // This will reset recurring tasks' status marked as complete or incomplete in another day.
    const currentDate = new Date().toLocaleDateString();
    const tasks = JSON.parse(localStorage.tasks).map((task) => {
      if (task.recurring && task.statusLastUpdate !== currentDate) {
        task.status = "unchecked";
      }
      return task;
    });
    // If something changed localStorage will be updated
    if (JSON.stringify(tasks) !== localStorage.tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    // Each task will store their current position in the localStorage.tasks
    // So when the user interact with some task - the app knows where to find it
    const sortedTasks = tasks.map((task, index) => ({ ...task, index }));
    // Tasks will generally be sorted from the earliest to the latest time
    // If both are common tasks with reminder then the older one comes first
    // Tasks without reminders are always after all the tasks with reminder
    sortedTasks.sort((t1, t2) => {
      if (!t1.reminder) return 1;
      if (!t2.reminder) return -1;

      let time1, time2;

      if (!t1.recurring && !t2.recurring) {
        time1 = new Date(`${t1.date}T${t1.time}`).getTime();
        time2 = new Date(`${t2.date}T${t2.time}`).getTime();
      } else {
        time1 = new Date(`2022-01-01T${t1.time}`).getTime();
        time2 = new Date(`2022-01-01T${t2.time}`).getTime();
      }

      return time1 - time2;
    });

    return sortedTasks;
  }

  shouldRenderTask(task) {
    switch (this.props.display) {
      case "today":
        if (task.recurring) {
          switch (task.frequency) {
            case "daily":
              return true;

            case "weekly":
              return task.scheduledDays.includes(new Date().getDay());

            default:
              return false;
          }
        } else {
          if (!task.reminder) return false;
          const [year, month, day] = task.date.split("-").map((e) => parseInt(e));
          const currentDate = new Date();
          return (
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth() + 1 &&
            day === currentDate.getDate()
          );
        }

      case "tasks":
        return !task.recurring;

      case "recurring-tasks":
        return task.recurring;

      default:
        return false;
    }
  }

  getMainAreaContent() {
    let tasks = this.state.tasks.filter((task) => this.shouldRenderTask(task));
    tasks = tasks.map((task) => (
      <Task
        key={task.index}
        openTask={() =>
          this.setState({
            displayEditor: true,
            editing: true,
            currentTaskIndex: task.index,
          })
        }
        changeStatus={() => this.changeStatus(task.index)}
        {...task}
      />
    ));
    return tasks.length === 0 ? <NoTaskScreen display={this.props.display} /> : tasks;
  }

  changeStatus(taskIndex) {
    const newTasks = JSON.parse(localStorage.tasks);
    const currentStatus = newTasks[taskIndex].status;
    const nextStatus = {
      unchecked: "complete",
      complete: "incomplete",
      incomplete: "unchecked",
    };

    newTasks[taskIndex].status = nextStatus[currentStatus];
    // This will save the update date, so that if the task is recurring
    // it will have its status redefined in the next day.
    if (newTasks[taskIndex].recurring) {
      newTasks[taskIndex].statusLastUpdate = new Date().toLocaleDateString();
    }
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    this.setState({ tasks: this.getTasks() });
  }

  render() {
    // The task itself decides if it should be rendered or not,
    // based on what is being displayed.
    return (
      <main id="main-area">
        {this.getMainAreaContent()}

        {this.state.displayEditor && (
          <TaskEditor
            editing={this.state.editing}
            taskIndex={this.state.currentTaskIndex}
            onClose={(eventMessage) => {
              this.setState({
                displayEditor: false,
                editing: false,
                currentTaskIndex: null,
                tasks: this.getTasks(),
                eventMessage,
              });
              setTimeout(() => this.setState({ eventMessage: null }), 3500);
            }}
          />
        )}

        {this.state.eventMessage && <EventNotification text={this.state.eventMessage} />}
      </main>
    );
  }
}
