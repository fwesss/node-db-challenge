import express from 'express'

import Validation from 'folktale/validation'
import { validator, didItValidate } from '../../utils/validator'
import controllers from './projects.controller'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasName = req => !!req.body.name

const projectInfoValidator = validator('Missing project Info', hasBody)
const nameValidator = validator('Missing name', hasName)

const projectValidationResult = req =>
  Success()
    .concat(projectInfoValidator(req))
    .concat(nameValidator(req))

const validateProject = (req, res, next) => {
  const didProjectValidate = didItValidate(projectValidationResult(req))

  if (!didProjectValidate) {
    res.status(400).json({ errors: projectValidationResult(req).value })
  } else {
    next()
  }
}

router
  .route('/')
  .get(controllers.getMany)
  .post(validateProject, controllers.createOne)

export default router
