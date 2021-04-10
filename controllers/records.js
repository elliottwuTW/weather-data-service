const Record = require('../models/Record')
const asyncWrapper = require('../middleware/asyncWrapper')

// @desc      Create multiple weather records
// @route     -
// @access    No open access
exports.createRecords = async (cityDataArray) => {
  const promises = cityDataArray.map(cityData => {
    const weatherElement = cityData.weatherElement
    const dateTime = cityData.time.obsTime.split(' ')
    const record = {
      city: cityData.parameter[0].parameterValue,
      city_en: getCityEnName(cityData.stationId),
      windSpeed: weatherElement[2].elementValue,
      temperature: weatherElement[3].elementValue,
      humidity: weatherElement[4].elementValue,
      pressure: weatherElement[5].elementValue,
      maxTemp: weatherElement[14].elementValue,
      minTemp: weatherElement[16].elementValue,
      weather: weatherElement[20].elementValue,
      // UTC+08:00
      obsTime: new Date(dateTime[0] + 'T' + dateTime[1] + '.000+08:00')
    }
    // create a record
    return Record.create(record)
  })
  return await Promise.all(promises)
}

// @desc      Get the latest weather data of cities
// @route     GET /api/v1/records/latest
// @access    Protected
exports.getLatestRecords = asyncWrapper(async (req, res, next) => {
  const selectedFields = ['city', 'windSpeed', 'temperature', 'humidity', 'pressure', 'maxTemp', 'minTemp', 'weather', 'obsTime'].join(' ')

  let records
  if (req.query.city) {
    // query weather data of a specific city
    records = await Record.find({ city_en: req.query.city })
      .sort('-createdAt')
      .select(selectedFields)
      .limit(1)
  } else {
    // query all cities weather data
    const recordPromises = ['Taipei', 'NewTaipei', 'Taoyuan'].map(city =>
      Record.find({ city_en: city })
        .sort('-createdAt')
        .select(selectedFields)
        .limit(1))
    records = await Promise.all(recordPromises)
    // flatten
    records = records.map(recordArr => recordArr[0])
  }

  return res.status(200).json({
    status: 'success',
    data: records
  })
})

/**
 * Functions
 */
function getCityEnName (stationId) {
  let cityEnName
  switch (stationId) {
    // 臺北
    case '466920':
      cityEnName = 'Taipei'
      break
    // 板橋
    case '466880':
      cityEnName = 'NewTaipei'
      break
    // 新屋
    case '467050':
      cityEnName = 'Taoyuan'
      break
    default:
      break
  }
  return cityEnName
}
