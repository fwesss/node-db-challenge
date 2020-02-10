import express from 'express'

import Validation from 'folktale/validation'
import { validator, didItValidate } from '../../utils/validator'
import controllers from './tasks.controller'
import { getById as getProjectById } from '../projects/projects.model'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasDescription = req => !!req.body.description
const hasProjectId = req => !!req.body.project_id

const taskInfoValidator = validator('Missing task Info', hasBody)
const descriptionValidator = validator('Missing description', hasDescription)
const projectIdValidator = validator('Missing project_id', hasProjectId)

const taskValidationResult = req =>
  Success()
    .concat(taskInfoValidator(req))
    .concat(descriptionValidator(req))
    .concat(projectIdValidator(req))

const validateTask = (req, res, next) => {
  const didTaskValidate = didItValidate(taskValidationResult(req))

  if (!didTaskValidate) {
    res.status(400).json({ errors: taskValidationResult(req).value })
  } else {
    next()
  }
}

const validateProjectId = async (req, res, next) => {
  const { project_id: projectId } = req.body

  try {
    const project = await getProjectById(projectId)
    if (project) {
      next()
    } else {
      res.status(404).json({ message: 'Invalid project ID' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'The information could not be retrieved.', error })
  }
}

router
  .route('/')
  .get(controllers.getMany)
  .post(validateTask, validateProjectId, controllers.createOne)

export default router
