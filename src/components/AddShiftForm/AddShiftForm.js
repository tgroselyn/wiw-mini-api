import React, {Component} from 'react';
import axios from 'axios';

class AddShiftForm extends Component {

    //store shift info locally before posting
    state = {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        employeeName: ''
    }

    //update local state values when input fields change
    handleChange = property => event => {
        this.setState({
            [property]: event.target.value
        });        
    } //end handleChange

    //handleSubmit checks that the user is logged in as a manager
    //then, it bundles the post data and sends it to the API
    handleSubmit = () => {
            //format object to send
            let postData = {
                start: this.state.startDate + ' ' + this.state.startTime,
                end: this.state.endDate + ' ' + this.state.endTime,
                title: this.state.employeeName
            }
            axios.post('/api/shift', postData).then(response => {
                if (response.data === 'Created') {
                    //tell the user if shift created
                    alert('shift created!');
                    //and get an updated shift list
                    this.props.fetchShifts();
                } else if (response.data === 'Overlap'){
                    //tell the user the request failed
                    alert('cannot create an overlapping shift');
                } //end if/else
            }).catch(err => {
                console.log(err);
                //tell the user the request failed
                alert('must be a manager to create a shift');
            });
    } //end handleSubmit

    render() {
        return (
            <div className="addShiftForm">
                <h2>Add New Shift</h2>
                <div className="addShiftFormGroup">
                    <label>Employee name: </label>
                    <input
                        type="text"
                        placeholder="employee name"
                        value={this.state.employeeName}
                        onChange={this.handleChange('employeeName')} />
                </div>
                <div className="addShiftFormGroup">
                    <label>Start date and time: </label>
                    <input
                        type="date"
                        value={this.state.startDate}
                        onChange={this.handleChange('startDate')} />
                    <input
                        type="time"
                        value={this.state.startTime}
                        onChange={this.handleChange('startTime')} />
                </div>
                <div className="addShiftFormGroup">
                    <label>End date and time: </label>
                    <input
                        type="date"
                        value={this.state.endDate}
                        onChange={this.handleChange('endDate')} />
                    <input
                        type="time"
                        value={this.state.endTime}
                        onChange={this.handleChange('endTime')} />
                </div>
                <div className="addShiftFormGroup">
                    <button onClick={this.handleSubmit}>Add Shift</button>
                </div>
            </div>
        )
    } //end render
}

export default AddShiftForm;