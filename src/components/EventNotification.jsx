import React from "react";
import "./EventNotification.css";

export default class EventNotification extends React.Component {
  eventNotificationRef = React.createRef();

  componentDidMount() {
    setTimeout(() => this.eventNotificationRef.current.classList.remove("disabled"));
    setTimeout(() => this.eventNotificationRef.current.classList.add("disabled"), 3000);
  }

  render() {
    return (
      <div className="event-notification-parent">
        <div className="event-notification disabled" ref={this.eventNotificationRef}>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}
