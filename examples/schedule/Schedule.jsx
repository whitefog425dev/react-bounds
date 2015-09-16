'use strict';

import React from 'react';
import ReactCSS from 'reactcss';
import bounds from 'react-bounds';

import ScheduleItem from './ScheduleItem.jsx';
import { Raised } from '../../modules/react-material-design';

class Schedule extends ReactCSS.Component {

  classes() {
    return {
      'default': {
        schedule: {
          Absolute: '20px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
        },
        heading: {
          fontSize: '20px',
          color: '#333',
          height: '60px',
          lineHeight: '30px',
          top: '0',
          left: '4px',
        },
        calendar: {
          flex: '1',
          display: 'flex',
          alignItems: 'stretch',
          height: '100%',
          boxShadow: 'inset 0 0 0 1px #ddd',
          borderRadius: '2px',
        },

        column: {
          flex: '2',
          borderRight: '1px solid #ddd',
          position: 'relative',
        },

        head: {
          padding: '16px',
          fontSize: '15px',
        },
        day: {
          float: 'left',
          color: '#bbb',
          textTransform: 'Capitalize',
          fontWeight: '300',
        },
        number: {
          float: 'right',
          color: '#333',
          fontWeight: '500',
        },
        clear: {
          clear: 'both',
        },
      },
      'list': {
        schedule: {
          display: 'block',
        },
        Item: {
          list: true,
        },
        column: {
          borderTop: 'none',
          borderRight: 'none',
          borderBottom: 'none',
        },

        timesColumn: {
          display: 'none',
        },
        title: {
          display: 'none',
        },
      },
    };
  }

  styles() {
    return this.css({
      'list': this.props.width < 520,
    });
  }

  static bounds() {
    return {
      'list': { maxWidth: 520 },
    };
  }

  render() {
    var schedule = [];

    for (var i = 0; i < this.props.days.length; i++) {
      var day = this.props.days[i];
      var thatDay = [];

      for (var apptID in this.props.appointments) {
        var appt = this.props.appointments[apptID];

        if (appt.date === day) {
          thatDay.push(
            <ScheduleItem is="Item" key={ apptID } {...appt} />
          );
        }
      }

      schedule.push(
        <div is="column" key={ i }>
          <div is="head">
            <div is="day">{ day }</div>
            <div is="number">{ this.props.numbers[i] }</div>
            <div is="clear" />
          </div>
          { thatDay }
        </div>
      );
    }

    return (
      <Raised>
        <div is="schedule">
          <div is="heading">My Schedule</div>
          <div is="calendar">
            { schedule }
          </div>
        </div>
      </Raised>
    );
  }
}

Schedule.defaultProps = {
  days: ['mon', 'tue', 'wed', 'thu', 'fri', /* 'sat', 'sun' */],
  numbers: [21, 22, 23, 24, 25],
  appointments: {
    1: {
      id: 1,
      date: 'mon',
      time: '2:30pm',
      label: 'Dr. Appt.',
      fromTop: 40,
      length: 2,
      type: 'dr',
    },
    2: {
      id: 2,
      date: 'tue',
      time: '1:00pm',
      label: 'Plumber',
      fromTop: 25,
      type: 'chore',
    },
    3: {
      id: 3,
      date: 'wed',
      time: '8:00am',
      label: 'Sick Day with Kids',
      fromTop: 0,
      length: 3,
      type: 'kids',
    },
    4: {
      id: 4,
      date: 'thu',
      time: '4:00pm',
      label: 'Dr. Followup',
      fromTop: 55,
      type: 'dr',
    },
    5: {
      id: 5,
      date: 'fri',
      time: '9:00am',
      label: 'Dry Cleaning',
      fromTop: 5,
      type: 'chore',
    },
  },
};

export default bounds(Schedule);
