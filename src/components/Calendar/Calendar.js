import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

//use moment as the localizer
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {

    render() {
        //map over events handed down on props from App
        //format the information in a way big calendar can parse
        const formattedEvents = this.props.events.map(event => {
            return {
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.title
            }
        })

        return (
            //big calendar component with formatted events
            <BigCalendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={formattedEvents}
            />
        );
    } //end render
}

export default Calendar;