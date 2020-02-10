import express from 'express'

import Validation from 'folktale/validation'
import { validator, didItValidate } from '../../utils/validator'
import controllers from './resources.controller'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasName = req => !!req.body.name

const resourceInfoValidator = validator('Missing resource Info', hasBody)
const nameValidator = validator('Missing name', hasName)

const resourceValidationResult = req =>
  Success()
    .concat(resourceInfoValidator(req))
    .concat(nameValidator(req))

const validateResource = (req, res, next) => {
  const didResourceValidate = didItValidate(resourceValidationResult(req))

  if (!didResourceValidate) {
    res.status(400).json({ errors: resourceValidationResult(req).value })
  } else {
    next()
  }
}

router
  .route('/')
  .get(controllers.getMany)
  .post(validateResource, controllers.createOne)

export default router
