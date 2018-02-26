import React from 'react'
import helper from '../utils/list_helper'
import NewObservationForm from './newObservationForm'
import './location.css'
 class Location extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       highlighted :false
     }
     //console.log(props.location.observations)
     this.toggleHighlight = this.toggleHighlight.bind(this)
   }

   toggleHighlight = () => {
     //console.log("toggle")
     this.setState({highlighted: !this.state.highlighted})
   }

   renderDetailed(location) {
     console.log(location)
     console.log(location.observations)
     const maxTemp = helper
       .maxTemp(helper.filter24h(location.observations)).temperature
     const minTemp = helper
       .minTemp(helper.filter24h(location.observations)).temperature
     const current = helper.latest(location.observations).temperature
     return (
       <div className="Location-all">
        <div className="Location-city" onClick={this.toggleHighlight}>
         {location.city}
        </div>
        <div className="Location-temperatures">
          {current !== undefined &&<div>
            Current temperature {current}
          </div>}
          {maxTemp !== undefined && <div>
            Maximium temperature in the last 24h is {maxTemp}
          </div>}
          {minTemp !== undefined && <div>
            Minimium temperature in the last 24h is {minTemp}
          </div>}
        </div>
        <NewObservationForm send={this.props.send} location={location} />
       </div>
     )
   }
   render() {
     return (
       <div className="Location-all">
          {!this.state.highlighted &&
            <div className="Location-city" onClick={this.toggleHighlight}> {this.props.location.city} </div>}
          {this.state.highlighted && this.renderDetailed(this.props.location)}
       </div>
     )
   }

 }

 export default Location
