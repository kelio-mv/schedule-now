import { useRef } from "react";
import "./DateTimeInput.css";

export function DateInput(props) {
  // Functions
  const formatValue = (value) => ("0" + value.replace(/\D/g, "")).slice(-2);
  const formatYear = (value) => parseInt(value.replace(/\D/g, ""));
  const setState = (data) => {
    const [year, month, day] = props.value.split("-");
    data.day = data.day === undefined ? day : data.day;
    data.month = data.month === undefined ? month : data.month;
    data.year = data.year === undefined ? year : data.year;
    props.onChange(data.year + "-" + data.month + "-" + data.day);
  };

  // State values
  const [day, month, year] = props.value.split("-").reverse();

  // Refs
  const monthRef = useRef();
  const yearRef = useRef();

  return (
    <div className="datetime-input mx-auto">
      <input
        type="text"
        placeholder="DD"
        value={day}
        onChange={(e) => {
          const [rawInput, formattedInput] = [e.target.value, formatValue(e.target.value)];
          if ((day > 9 && rawInput.length === 3) || formattedInput > 31) {
            return;
          }
          if (formattedInput < 1) {
            setState({ day: "" });
            return;
          }
          setState({ day: formattedInput });

          if (formattedInput > 3) {
            monthRef.current.focus();
          }
        }}
      />
      <input
        ref={monthRef}
        type="text"
        placeholder="MM"
        value={month}
        onChange={(e) => {
          const [rawInput, formattedInput] = [e.target.value, formatValue(e.target.value)];
          if ((month > 9 && rawInput.length === 3) || formattedInput > 12) {
            return;
          }
          if (formattedInput < 1) {
            setState({ month: "" });
            return;
          }
          setState({ month: formattedInput });

          if (formattedInput > 1) {
            yearRef.current.focus();
          }
        }}
      />
      <input
        ref={yearRef}
        type="text"
        placeholder="AAAA"
        style={{ width: "3.75em" }}
        value={year}
        onChange={(e) => {
          const [rawInput, formattedInput] = [e.target.value, formatYear(e.target.value)];
          if (rawInput.length > 4) {
            return;
          }
          // The formatYear convert the value to int so that the zeros are removed from start
          // If an empty string is passed, then it'll return NaN
          if (formattedInput < 1 || isNaN(formattedInput)) {
            setState({ year: "" });
            return;
          }
          setState({ year: formattedInput });
        }}
      />
    </div>
  );
}

export function TimeInput(props) {
  const formatValue = (value) => ("00" + value.replace(/\D/g, "")).slice(-2);
  const minuteRef = useRef();

  return (
    <div className="datetime-input mx-auto">
      <input
        type="text"
        placeholder="HH"
        value={props.value.split(":")[0]}
        onChange={(e) => {
          const [currHour, currMinute] = props.value.split(":");
          const [rawInput, formattedInput] = [e.target.value, formatValue(e.target.value)];
          // Prevent inserting numbers when
          // - The hour has two digits and the user is trying to add another one e.g.
          // hour is set to 12 and the user press 3.
          // - The user input is greater than 23.
          if ((currHour > 9 && rawInput.length === 3) || formattedInput > 23) {
            return;
          }
          props.onChange(formattedInput + ":" + currMinute);
          if (formattedInput > 2) {
            minuteRef.current.focus();
          }
        }}
      />
      <input
        ref={minuteRef}
        type="text"
        placeholder="MM"
        value={props.value.split(":")[1]}
        onChange={(e) => {
          const [currHour, currMinute] = props.value.split(":");
          const [rawInput, formattedInput] = [e.target.value, formatValue(e.target.value)];
          // Similar to hour input prevent
          if ((currMinute > 9 && rawInput.length === 3) || formattedInput > 59) {
            return;
          }
          props.onChange(currHour + ":" + formattedInput);
        }}
      />
    </div>
  );
}
