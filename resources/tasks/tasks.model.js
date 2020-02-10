import db from '../../data/dbConfig'

export const get = () =>
  db('tasks')
    .join('projects', 'tasks.project_id', 'projects.id')
    .select(
      'tasks.id',
      'tasks.description',
      'tasks.notes',
      'tasks.completed',
      'projects.name as ProjectName',
      'projects.description as ProjectDescription'
    )

const getById = id =>
  db('tasks')
    .where({ id })
    .first()

export const insert = project =>
  db('tasks')
    .insert(project)
    .then(id => getById(id[0]))

export default {
  get,
  getById,
  insert,
}
