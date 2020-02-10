import server from './server'

const port = process.env.PORT || 4000

server.listen(port, () =>
  console.info(`\n*** Server Running on http://localhost:${port} ***\n`)
)
