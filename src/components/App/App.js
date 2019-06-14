import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import Login from '../Login/Login';
import AddShiftForm from '../AddShiftForm/AddShiftForm';
import Calendar from '../Calendar/Calendar';
import './App.css';

class App extends Component {

  //store the shift data here after pulling it from the API
  state = {
    shiftData: []
  }
  
  //on mount, request shift data
  componentDidMount = () => {
    this.fetchShifts();
  }

  //request shift data from the API, then store it in local state
  fetchShifts = () => {
    axios.get('/api/shift').then(response => {
      this.setState({ shiftData: response.data });
    }).catch(err => { console.log(err); });
  }

  //request that the API delete all existing shifts
  //run get user first to make sure logged in user is a manager
  deleteShifts = () => {
    axios.delete('/api/shift').then(response => {
      this.fetchShifts();
    }).catch(err => {
      console.log(err);
      alert('must be a manager to delete shifts');
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          {/* when i work logo */}
          <div className="logo"></div>
          <div>
            <h1>When I Work</h1>
            <h2>Mini API</h2>
            <h3 className="byline">Built by Thomas Roselyn</h3>
          </div>
        </header>
        <main>
          {/* login component */}
          <Login />
          {/* add shift form component */}
          <AddShiftForm fetchShifts={this.fetchShifts}/>
          {/* shift list created by mapping through locally stored shift data */}
          <div className="shiftList">
            <h2>List View</h2>
            {this.state.shiftData &&
              this.state.shiftData.map(shift => {
                return <p key={shift.id}>{shift.title}: {moment(shift.start).format('lll')} to {moment(shift.end).format('lll')}</p>
              })
            }
            {/* button to delete all shifts */}
            <button onClick={this.deleteShifts}>Delete All Shifts</button>
          </div>
          <div className="shiftCalendar">
            <h2>Calendar View</h2>
            {/* shift calendar component, passing in shift data on props */}
            <Calendar events={this.state.shiftData} />
          </div>
        </main>
        <footer>
          <h3 className="byline">Thanks for viewing!</h3>
        </footer>
      </div>
    );
  } //end of render
}

export default App;
