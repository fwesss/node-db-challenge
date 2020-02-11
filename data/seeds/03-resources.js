exports.seed = knex =>
  knex('resources').insert([
    {
      name: 'Computer',
      description: 'Can do anything',
    },
    {
      name: 'Smart friend',
      description: 'Knows everything',
    },
    {
      name: 'Pencil',
      description: 'Not good for much',
    },
  ])
