import db from '../../data/dbConfig'

export const get = () => db('resources')

const getById = id =>
  db('resources')
    .where({ id })
    .first()

export const insert = project =>
  db('resources')
    .insert(project)
    .then(id => getById(id[0]))

export default {
  get,
  getById,
  insert,
}
