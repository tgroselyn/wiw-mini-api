import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state = {
        events: this.props.events
        // || [
            // {
            //     start: new Date(),
            //     end: new Date(moment().add(1, "days")),
            //     title: "Some title"
            // }
        // ]
    };

    render() {
        const formattedEvents = this.props.events.map(event => {
            return {
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.title
            }
        })

        return (
            <BigCalendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={formattedEvents}
            />
        );
    }
}

export default Calendar;