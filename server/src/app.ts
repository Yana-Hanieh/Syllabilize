//this file defines what the app does (middlewares, routes)
//its exports the Express app but never calls .listen()
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ClassroomRoutes from './routes/ClassroomRoutes';
import UserRoutes from './routes/UserRoute';
import CourseRoutes from './routes/CourseRouter';
import AuthRoutes from './routes/AuthRoute';
import './models/associations';
const app = express();

//middlewares provides a way to add and reuse common functionality across your application's routes and endpoints.
app.use(cors({
  origin: 'http://localhost:5173',//where the react dev server actually runs
  credentials:true, //allows cookies to be included in cross-origin requests
}));
app.use(express.json()); //express.json() returns a middleware function
app.use(cookieParser()); 

app.use('/api/classrooms', ClassroomRoutes);
app.use('/api/users',UserRoutes);
app.use('/api/courses',CourseRoutes);
app.use('/api/auth',AuthRoutes);


//routes
app.get('/api',(req, res)=> { //when a request(req) comes matching this path /api, respond (res) with status: ok
  res.json({status:'ok'});
})

export default app 