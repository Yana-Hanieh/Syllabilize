//this file defines what the app does (middlewares, routes)
//its exports the Express app but never calls .listen()
import express from 'express';
import ClassroomRoutes from './routes/ClassroomRoutes';
import StudentRoutes from './routes/StudentRoutes';
import CourseRoutes from './routes/CourseRouter';
import './models/associations';
const app = express();
app.use(express.json());

//middlewares provides a way to add and reuse common functionality across your application's routes and endpoints.
app.use(express.json()) //express.json() returns a middleware function
app.use ('/api/classrooms', ClassroomRoutes);
app.use('/api/students',StudentRoutes);
app.use('/api/courses',CourseRoutes);

//routes
app.get('/api',(req, res)=> { //when a request(req) comes matching this path /api, respond (res) with status: ok
  res.json({status:'ok'});
})

export default app 