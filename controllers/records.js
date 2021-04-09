const Record = require('../models/Record')

// @desc      Create multiple weather records
// @route     -
// @access    No open access
exports.createRecords = async (cityDataArray) => {
  const promises = cityDataArray.map(cityData => {
    const weatherElement = cityData.weatherElement
    const dateTime = cityData.time.obsTime.split(' ')
    const record = {
      city: cityData.parameter[0].parameterValue,
      windSpeed: weatherElement[2].elementValue,
      temperature: weatherElement[3].elementValue,
      humidity: weatherElement[4].elementValue,
      pressure: weatherElement[5].elementValue,
      maxTemp: weatherElement[14].elementValue,
      minTemp: weatherElement[16].elementValue,
      weather: weatherElement[20].elementValue,
      obsTime: new Date(dateTime[0] + 'T' + dateTime[1] + '.000+08:00')
    }
    // create a record
    return Record.create(record)
  })
  return await Promise.all(promises)
}
