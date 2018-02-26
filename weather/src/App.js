import React, { Component } from 'react';
import logo from './logo.svg';
import locationService from './services/locations'
import observationService from './services/observations'
import Location from './components/location'
import TimePicker from 'react-bootstrap-time-picker'
import DatePicker from 'react-date-picker'
import './App.css'
class App extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      locations :[]
    }
    this.submitObservation = this.submitObservation.bind(this)
  }
componentDidMount() {
  locationService.getAll().then(locations => {
    this.setState({ locations })
  })
}
async submitObservation(obs) {
  console.log(obs)
  obs = await observationService.create(obs)
  console.log(obs)
  const findId = (a) =>{
    return a._id === obs.location._id
  }
  const location = this.state.locations.find(findId)
  const index = this.state.locations.findIndex(findId)
  let tempLoc = Object.assign({}, location)
  tempLoc.observations = tempLoc.observations.concat(obs)
  const tempLocations = this.state.locations.slice(0)
  tempLocations[index] = tempLoc
  this.setState({locations:tempLocations})
}

  render() {
    //console.log(this.state.locations)
    return (
      <div className="App">
        <h1 className="App-header"> Weather app </h1>
        <div className="App-locations-title"> Locations </div>
        <div className="App-locations">
          {this.state.locations.map(loc =>
            <Location key={loc._id} location={loc} send={this.submitObservation} />)}
        </div>
      </div>
    );
  }
}

export default App;
