const router = require('express').Router();
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const teamsRoutes = require('./teams.routes');
const projectsRoutes = require('./projects.routes');
const ticketsRoutes = require('./tickets.routes');
const timeEntriesRoutes = require('./timeentries.routes');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/teams', teamsRoutes);
router.use('/projects', projectsRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/time-entries', timeEntriesRoutes);

module.exports = router;

