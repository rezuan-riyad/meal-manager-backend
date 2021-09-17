import Border from '../models/border.model'
import Course from '../models/course.model'
import Record from '../models/record.model'

/**
 * get all meal records depending on query
 * @method GET
 * @route /api/records 
 */
export const getRecords = async (req, res) => {
  const { date, border } = req.body
  let query = {};
  if (!date && !border) query = {}
  else if (!date) query = { border }
  else if (!border) query = { date }
  else query = { date, border }

  Record
    .find(query)
    .populate('border')
    .populate('takenCourses.course')
    .exec((err, data) => {
      if (err) return res.status(500).json({ err })
      return res.status(200).json({ data })
    })
}

/**
 * default insertion for a particular date
 * @method POST
 * @route /api/default-record-insert/:date
 */
export const defaultRecordInsert = async (req, res) => {
  const date = req.params.date

  try {
    const record = await Record.findOne({ date })
    if (record) {
      res.status(200)
      let message = `Default records for ${date} already inserted.`;
      return res.json({ message })
    }

    const borders = await Border.find()
    const courses = await Course.find({ date })
    if (courses.length == 0) {
      return res.status(400).json({
        message: `Course Data Insertion for ${date} is required first.`
      })
    }

    if (borders && courses && !record) {
      const takenCourses = courses.map(course => {
        return {
          course: course._id
        }
      })
      borders.forEach(async (border) => {
        const id = border._id
        const record = Record({ date, border: id, takenCourses })
        record.save()
      })
      return res.status(200).json({
        message: "Successfully saved"
      })
    }
  } catch (error) {
    if (!res.status) res.status = 500
    return res.json({ error })
  }
}

/**
 * create new meal record
 * @method POST
 * @route /api/create-record
 */
export const createRecord = async (req, res) => {
  const { date, border, takenCourses } = req.body

  try {
    const newRecord = Record({ date, border, takenCourses })
    const duplicate = await Record.findOne({
      date, border
    })
    if (duplicate) throw 'Record Already Exists.'
    const record = await newRecord.save()
    if (record) {
      return res.status(200).json({
        message: "New Record Saved Successfully",
        record
      })
    }
  } catch (error) {
    return res.status(400).json({
      error
    })
  }
}

/**
 * update amount of meal ordered by a border
 * @method PUT
 * @route /api/records
 */
export const updateRecord = async (req, res) => {
  const { date, border, takenCourses } = req.body
  try {
    takenCourses.forEach(async (elem) => {
      const query = { date, border, "takenCourses.course": elem.course }
      const update = { "takenCourses.$.total": elem.total }
      const updatedRecord = await Record.updateOne(query, update)
    })
  } catch (error) {
    if (!res.status) res.status = 500
    return res.json({ error })
  }
}

/**
 * get total course taken and price each day
 * @method GET 
 * @route /api/summery/:date
 */
export const getRecordSummery = async (req, res) => {
  const date = req.params.date
  const data = await Record.aggregate([ 
    { $match: { date: date } }
  ])
  if(data){
    return res.status(200).json({ data })
  }
}