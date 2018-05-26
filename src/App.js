import React, { Component } from 'react';
import './App.css';

function toLetter(num) {
  if (num < 26) {
    return String.fromCharCode(65 + num);
  } else {
    return 'A' + String.fromCharCode(65 + num - 26);
  }
}

const Room = ({ event, section, checkedin, clickHandler }) => {
  return <p
    className={checkedin ? "room checkedin" : "room"}
    onClick={() => { clickHandler(event, section) }}>
    {section}
  </p>;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      sizes: {
        oo: 34,
        ext: 33,
        oi: 33,
        dec: 33,
      },
      checkedin: {
        oo: {},
        oi: {},
        dec: {},
        ext: {}
      }
    };



    const eventList = {};
    for (var event in this.state.sizes) {
      if (this.state.sizes.hasOwnProperty(event)) {
        eventList[event] = [];
        for (let i = 0; i < this.state.sizes[event]; i++) {
          eventList[event].push(toLetter(i));
        }
      }
    }
    this.state.eventList = eventList;
    this.checkinRoom = this.checkinRoom.bind(this);
  }

  checkinRoom(event, room) {
    const checkedin = Object.assign({}, this.state.checkedin);
    checkedin[event][room] = !checkedin[event][room]
    this.setState({ checkedin: checkedin });
  }

  render() {
    const checkedinCounts = {};

    const filterCount = (obj, key) => {
      return Object.keys(obj[key])
        .filter((k) => obj[key][k])
        .length
    }

    for (var event in this.state.checkedin) {
      if (this.state.checkedin.hasOwnProperty(event)) {
        checkedinCounts[event] = filterCount(this.state.checkedin, event)
      }
    }

    return (
      <div className="App">
        {Object.keys(this.state.eventList).map((event) => {
          return <div key={event} className="competition-event">
            <h1>{event.toUpperCase()} ({this.state.sizes[event] - checkedinCounts[event]})</h1>
            {this.state.eventList[event].map((room) =>
              <Room
                key={event + "-" + room}
                event={event}
                section={room}
                checkedin={this.state.checkedin[event][room]}
                clickHandler={this.checkinRoom} />)}
          </div>
        })
        }
      </div>
    );
  }
}

export default App;
