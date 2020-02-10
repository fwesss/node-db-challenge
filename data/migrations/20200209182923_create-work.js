exports.up = knex =>
  knex.schema
    .createTable('projects', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('description')
      table.boolean('completed').defaultTo(false)
    })
    .createTable('tasks', table => {
      table.increments()
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('description').notNullable()
      table.string('notes')
      table.boolean('completed').defaultTo(false)
    })
    .createTable('resources', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('description')
    })
    .createTable('project_resources', table => {
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resources.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })

exports.down = knex =>
  knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
