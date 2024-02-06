const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');


//express app 
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Sanem:can9876@node2.3otf36w.mongodb.net/Node1?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=> app.listen(4000))
.catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');

//listen for requests
// app.listen(4000);

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
//Import route files
app.use('/auth', authRoutes);

app.get('/', (req,res) =>{
  res.render('index', {title: 'HOME'})
})

app.get('/doctor', (req,res) => {
   
//res.send('<p>Home page</p>');
res.render('doctor',{title: 'Doctor'});

});

app.get('/Patient', (req,res) =>{
  res.render('Patient', {title: 'Patient'})
})


app.get('/Reports', (req,res) => {
   // res.send('<p>about page</p>');
 res.render('Reports',{title: 'Reports'})
});

app.get('/about-us', (req,res) =>{
  res.render('About-us', {title:'About-us'})
})

app.get('/createdr', (req,res) =>{
  res.render('createdr',{title: 'createdr'})
})

app.get('/createpatient', (req,res) =>{
  res.render('createpatient',{title: 'createpatient'})
})

app.get('/fetchreports', (req,res) =>{
  const blogs = [
    {title:'Preetham', snippet: 'Status:Normal'},
    {title:'Vamshi', snippet: 'Status:Normal'},
    {title:'Niraaj', snippet:'Status:Normal' }
   ]
   res.render('fetchreports',{title: 'fetchreports', blogs})
})
//404 page
app.use((req,res) => {
    res.status(404).render('404',{title: '404'});
})