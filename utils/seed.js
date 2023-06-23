const connection = require('../config/connection');
const { User, Application } = require('../models');
const { getRandomName, getRandomApplications } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Application.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const applications = getRandomApplications(10);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      firstName: first, 
      lastName: last, 
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.insertMany(users); 
  await Application.insertMany(applications); 

  console.table(users);
  console.table(applications);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});