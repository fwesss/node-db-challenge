export const getMany = model => async (_req, res) => {
  try {
    const items = await model.get()
    res.status(200).json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be retrieved.' })
  }
}

export const getOne = model => async (req, res) => {
  const { id } = req.params

  try {
    const item = await model.getById(id)
    if (item) {
      res.status(200).json(item)
    } else {
      res.status(404).json({
        message: 'The item with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'The information could not be retrieved.', error })
  }
}

export const createOne = model => async (req, res) => {
  const { body } = req

  try {
    const item = await model.insert(body)
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'The information could not be posted.', error })
  }
}

export const updateOne = model => async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const updated = await model.update(id)(body)
    if (updated) {
      res.status(200).json(updated)
    } else {
      res.status(404).json({
        message: 'The item with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'The information could not be modified.', error })
  }
}

export const removeOne = model => async (req, res) => {
  const { id } = req.params
  try {
    const count = await model.remove(id)
    if (count) {
      res.status(200).json({ message: `This item has been deleted` })
    } else {
      res.status(404).json({
        message: 'The item with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'The information could not be modified.', error })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
