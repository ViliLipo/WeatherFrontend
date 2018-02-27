import React from 'react'
import TimePicker from 'react-bootstrap-time-picker'
import DatePicker from 'react-date-picker'
import './form.css'

 class NewObservationForm extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       time: new Date(0),
       date: new Date(),
       temperature:0,
       message: null,
       error: null
     }
     this.handleTimeChange = this.handleTimeChange.bind(this)
   }

   handleTempChange = (event) => {
     console.log(event.target.name)
     this.setState({[event.target.name]:event.target.value})
   }
   handleTimeChange = (time) => {
     console.log(time)
     this.setState({time})
   }
   handleDateChange = (date) =>{
     this.setState({date})
     console.log(date)
   }
   submit = (event) => {
     event.preventDefault()
    if( 80 < this.state.temperature < -70) {
      this.setState({error:"Check temperature"})
      setTimeout(() => {
        this.setState({error:null})
      }, 5000)
      return
    }
    let da = new Date()
    //console.log("date", this.state.date)
    //console.log("time", this.state.time)
    da = da.setTime(this.state.date)
    da = da + this.state.time * 1000
    //console.log("combine?" , new Date(da))
    if (da > new Date()) {
      this.setState({error:"It is not allowed to observe the future"})
      setTimeout(() => {
        this.setState({error:null})
      }, 5000)
      return
    }
    const observation = {
      location : this.props.location,
      temperature : this.state.temperature,
      time : da
    }
    this.props.send(observation)
    this.setState({
      time: new Date(),
      date:new Date(),
      temperature:0,
      message: "Submitted new observation"
    })
    setTimeout(() => {
      this.setState({message:null})
    }, 5000)
   }
   render() {
     return (
       <div className="Form-all">
          <p> Add new observation </p>
          <form onSubmit={this.submit}>
            <div>
              temperature
              <input className="Form-temperature" type="number"
               name="temperature"
               value={this.state.temperature}
               onChange={this.handleTempChange}
              />
            </div>
            <div>
              <DatePicker value={this.state.date}
               onChange={this.handleDateChange} className="Form-date"/>
              <TimePicker className="Form-time"value={this.state.time}
              onChange={this.handleTimeChange}
               step={1}/>
               <button className="Form-submit" type="submit"> submit</button>
            </div>
          </form>
            {this.state.message && <div className="Form-message">
          {this.state.message} </div>}
          {this.state.error && <div className="Form-error">
        {this.state.error} </div>}
       </div>
     )
   }
 }


export default NewObservationForm
