import mongoose, { Schema, model } from 'mongoose'

const border = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  isManager: {
    type: Boolean,
    default: false,
    required: true
  }
})

const Border = model('Border', border)
export default Border