import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

function CalendarTab() {
  const [agenda, setAgenda] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((trainings) => {
        return setAgenda(
          trainings.map((training, index) => ({
            id: index,
            title:
              training.activity +
              " with " +
              training.customer.lastname +
              ", " +
              training.customer.firstname,
            start: moment(training.date)._d,
            end: moment(training.date).add(training.duration, "minutes")._d,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={agenda}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        style={{ height: "90vh" }}
      />
    </div>
  );
}

export default CalendarTab;
