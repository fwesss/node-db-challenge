exports.seed = knex =>
  knex('projects').insert([
    { name: 'Big Project', description: 'Very difficult', completed: false },
    { name: 'Small Project', description: 'Not so difficult', completed: true },
    {
      name: 'Pointless Assignment',
      description: 'So tedious',
      completed: false,
    },
  ])
