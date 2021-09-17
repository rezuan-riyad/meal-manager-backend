import Border from '../models/border.model'

export const getAllBorders = async (req, res) => {
  Border.find((err, data) => {
    if(err) return res.status(500).json({ err })
    return res.status(200).json({ borders: data })
  })
}

export const createBorder = async (req, res) => {
  const { borderName } = req.body
  try {
    const query = { name: borderName }
    const isExist = await Border.findOne(query)
    if (isExist) {
      res.status(400)
      throw 'Border Already Registered.'
    }
    const border = await Border(query).save()
    if (border) {
      return res.status(200).json({
        message: "Border Registered Successfylly."
      })
    }
  } catch (error) {
    if (!res.status) res.status = 500
    return res.json({ error })
  }
}

