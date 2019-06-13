import React, {Component} from 'react';
import axios from 'axios';
import Calendar from '../Calendar/Calendar';
import './App.css';

class App extends Component {

  state = {
    shiftData: [],
    newShift: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      employeeName: ''
    }
  }
  
  componentDidMount = () => {
    this.fetchShifts();
  }

  handleChange = property => event => {
    this.setState({
      newShift: {
        ...this.state.newShift,
        [property]: event.target.value
      }
    })
  }

  handleSubmit = () => {
    let postData = {
      start: this.state.newShift.startDate + 'T' + this.state.newShift.startTime + ':00.000Z',
      end: this.state.newShift.endDate + 'T' + this.state.newShift.endTime + ':00.000Z',
      title: this.state.newShift.employeeName
    }

    axios.post('/api/shift', postData).then(response => {
      if (response.data === 'Created') {
        alert('shift created!');
        this.fetchShifts();
      } else {
        alert('cannot create shift due to overlap!');
      }
    });
  }

  fetchShifts = () => {
    axios.get('/api/shift').then(response => {
      // console.log('response from fetch request:', response.data);
      this.setState({
        shiftData: response.data
      })
    }).catch(err => {
      console.log('error from fetch request', err);
    })
  }

  render() {

    console.log(this.state.shiftData);
    return (
      <div className="App">
        <header>
          <div className="logo"></div>
          <div className="title">
            <h1>When I Work</h1>
            <h2>Mini API</h2>
            <h3>Built by Thomas Roselyn</h3>
          </div>
        </header>
        <main>
          <div className="shiftForm">
            <input
              type="text"
              placeholder="employee name"
              value={this.state.newShift.employeeName}
              onChange={this.handleChange('employeeName')} />
            <input
              type="date"
              value={this.state.newShift.startDate}
              onChange={this.handleChange('startDate')} />
            <input
              type="time"
              value={this.state.newShift.startTime}
              onChange={this.handleChange('startTime')} />
            <input
              type="date"
              value={this.state.newShift.endDate}
              onChange={this.handleChange('endDate')} />
            <input
              type="time"
              value={this.state.newShift.endTime}
              onChange={this.handleChange('endTime')} />
            <button onClick={this.handleSubmit}>add new shift</button>
          </div>
          <div className="shiftList">
            {this.state.shiftData &&
              this.state.shiftData.map(shift => {
                return <p key={shift.id}>start: {shift.start}, end: {shift.end}</p>
              })
            }
          </div>
          <Calendar events={this.state.shiftData}/>
        </main>
      </div>
    );
  }

}

export default App;
