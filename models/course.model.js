import mongoose, { Schema } from "mongoose";

const course = new Schema({
  date: {
    type: Date,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: null
  }
})

const Course = mongoose.model('Course', course)
export default Course