import express from 'express'
import morgan from 'morgan'

import projectRouter from './resources/projects/projects.router'
import resourceRouter from './resources/resources/resources.router'

const server = express()

const jsonSyntaxErrorHandler = (error, _req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: 'JSON syntax error' })
  } else {
    next()
  }
}

server.use(morgan('dev'))
server.use(express.json())
server.use(jsonSyntaxErrorHandler)

server.use('/api/projects', projectRouter)
server.use('/api/resources', resourceRouter)

server.get('/', (_req, res) => res.send(`<h2>Sprint!</h2>`))

export default server
