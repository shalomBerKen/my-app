// /server/index.js

const express = require('express');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Routes
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');
const taskUsersRoutes = require('./routes/taskUsers');
const communitiesRoutes = require('./routes/communities');
const usersCommunitiesRoutes = require('./routes/usersCommunities');

app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);
app.use('/taskUsers', taskUsersRoutes);
app.use('/communities', communitiesRoutes);
app.use('/usersCommunities', usersCommunitiesRoutes);


app.use('*', (req, res)=>{res.send("Hello!")})
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
