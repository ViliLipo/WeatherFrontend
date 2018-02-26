

const filter24h = (observationList) => {
  const now = Date.now()
  const f = (obs) => {
    const dif = now - Date.parse(obs.time)
    // DEBUG: console.log(dif)
    return dif <= (24*60*60*1000)
  }
  //console.log(observationList)
  //console.log(observationList.filter(f))
  try {
      return observationList.filter(f)
  }catch (exception) {
    //console.log("empty array")
    return []
  }
}
const latest = (observationList) => {
  //console.log("Latest")
  //console.log(observationList)
  const reducer = (a, b) => {
    let dateA = new Date(a.time)
    let dateB = new Date(b.time)
    if( dateA > dateB) {
      return a
    }else
    return b
  }
  try {
      return observationList.reduce(reducer)
  }catch (exception) {
    //console.log("empty array")
    return []
  }

}


const maxTemp = (observationList) => {
  const reducer = (a , b) => {
    if (a.temperature > b.temperature) {
      return a
    } else {
      return b
    }
  }
  try {
      return observationList.reduce(reducer)
  } catch(exception) {
    return []
  }

}

const minTemp = (observationList) => {
  const reducer = (a, b) => {
    if( a.temperature < b.temperature) {
      return a
    } else {
      return b
    }
  }
  try {
      return observationList.reduce(reducer)
  } catch (exception) {
    return []
  }
}

export default {
  filter24h, maxTemp, minTemp, latest
}
