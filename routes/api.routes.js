const router = require("express").Router()
import { createBorder, getAllBorders } from '../controller/border.controller'
import { createCourse, updateCourse, getCourses } from '../controller/course.controller'
import {
  createRecord, getRecords, updateRecord,
  defaultRecordInsert, getRecordSummery
} from '../controller/record.controller'

router.get('/borders', getAllBorders)
router.post('/create-border', createBorder)

router.get('/courses', getCourses)
router.post('/create-course', createCourse)
router.put('/courses', updateCourse)

router.get('/records/:date', getRecords)
router.post('/create-record', createRecord)
router.put('/records', updateRecord)
router.post('/default-record-insert/:date', defaultRecordInsert)

router.get('/summery/:date', getRecordSummery)

module.exports = router
