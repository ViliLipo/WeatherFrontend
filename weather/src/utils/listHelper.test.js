import listHelper from './list_helper'

const obslist = [
  {
    temperature:1,
    time: new Date()
  },
  {
    temperature:3,
    time: new Date(0)
  },
  {
    temperature:0,
    time: new Date(new Date() -(25*60*60*1000))
  },
  {
    temperature:-5,
    time : (new Date(new Date() -(12*60*60*1000)))
  }
]

describe('maxTemp', () => {
  test('Finds the right one. It should be 3', () => {
    const result = listHelper.maxTemp(obslist)
    expect(result.temperature).toBe(3)
  })
})

describe('minTemp', () => {
  test('Finds the right one should be -5', () => {
    const result = listHelper.minTemp(obslist)
    expect(result.temperature).toBe(-5)
  })
})
describe('filter24h', () => {
  test('Works in normal use case', () => {
    const result = listHelper.filter24h(obslist)
    console.log(result)
    expect(result.length).toBe(2)
    expect(result[0].temperature).toBe(1)
    expect(result[1].temperature).toBe(-5)
  })
})
