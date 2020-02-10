exports.seed = knex =>
  knex('tasks').insert([
    {
      project_id: 2,
      description: 'So much work',
      notes: 'I should really start this thing',
      completed: false,
    },
    {
      project_id: 2,
      description: 'Super fun',
      notes: "This wasn't too bad",
      completed: true,
    },
    {
      project_id: 1,
      description: 'Booooring',
      completed: false,
    },
  ])
