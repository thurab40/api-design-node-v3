export const getOne = model => async (req, res) => {
  const id = req.params.id // grab the id from the request
  const userId = req.user._id

  const doc = await model
    .findOne({
      _id: id,
      createdBy: userId
    })
    .exec()

  if (!doc) {
    return res.status(404).end()
  }

  // return the doc
  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id

  const docs = await model
    .find({
      createdBy: userId
    })
    .exec()

  // return the docs
  res.status(200).json({ data: docs })
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id

  const doc = await model.create({
    ...req.body, // object spread
    createdBy: userId
  })

  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOneAndUpdate(
    {
      _id: id,
      createdBy: userId
    },
    req.body, // to get back the updated object we have to do this
    { new: true }
  )

  if (!doc) {
    return res.status(404).end()
  }

  // return the doc
  res.status(201).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model
    .findOneAndRemove({ _id: id, createdBy: userId })
    .exec()

  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
