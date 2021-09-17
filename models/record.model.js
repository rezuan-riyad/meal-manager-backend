import mongoose, { Schema } from 'mongoose'
import Border from './border.model'
import Course from './course.model'

const record = new Schema({
  date: {
    type: Date,
    required: true
  },
  border: {
    type: Schema.Types.ObjectId,
    ref: "Border",
    required: true
  },
  takenCourses: [{
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course"
    },
    total: {
      type: Number,
      required: true,
      default: 1,
    }
  }]
})

const Record = mongoose.model('Record', record)
export default Record