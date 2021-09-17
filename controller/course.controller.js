import Border from '../models/border.model'
import Course from '../models/course.model'
import Record from '../models/record.model'

/**
 * get courses details
 * @method GET 
 * @route /api/courses 
 */
export const getCourses = (req, res) => {
  const { date, courseName } = req.body
  let query = {};
  if (!date && !courseName) query = {}
  else if (!date) query = { courseName }
  else if (!courseName) query = { date }
  else query = { date, courseName }

  Course.find(query, (err, data) => {
    if (err) return res.status(500).json({ err })
    return res.status(200).json({ data })
  })
}

/**
 * create new course
 * @method POST
 * @route /api/courses
 */
export const createCourse = async (req, res) => {
  const { date, courseName, price } = req.body
  try {
    const query = { date, courseName }
    const isExist = await Course.findOne(query)
    if (isExist) {
      res.status(400)
      let error = `${courseName} course for ${date} already exists.`
      throw error
    }
    const newCourse = Course({ date, courseName, price })
    const course = await newCourse.save()
    if (course) {
      return res.status(200).json({
        message: "Course Added Successfully.",
        course
      })
    }
  } catch (error) {
    if (!res.status) res.status = 500
    return res.json({ error })
  }
}

/**
 * update price of a meal
 * @method PUT 
 * @route /api/courses 
 */
export const updateCourse = async (req, res) => {
  const { courseId, price } = req.body
  try {
    const query = { _id: courseId }
    const update = { price }
    const priceUpdated = await Course.findOneAndUpdate(query, update, { new: true })
    if (priceUpdated) {
      return res.status(200).json({
        message: "Course price update successfull.."
      })
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
}