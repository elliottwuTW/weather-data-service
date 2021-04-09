const getData = require('./getData')
const { createRecords } = require('../controllers/records')

module.exports = async function () {
  try {
    // ['臺北', '板橋', '新屋']
    const result = await getData(['%E6%96%B0%E5%B1%8B', '%E8%87%BA%E5%8C%97', '%E6%9D%BF%E6%A9%8B&'])
    await createRecords(result.records.location)
  } catch (err) {
    console.log('*** Error:')
    console.log(err)
    console.log('**********')
  }
}
