import db from '../../data/dbConfig'

export const get = () => db('projects')

export const getById = id =>
  db('projects')
    .where({ id })
    .first()

export const insert = project =>
  db('projects')
    .insert(project)
    .then(id => getById(id[0]))

export default {
  get,
  getById,
  insert,
}
