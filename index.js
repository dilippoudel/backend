
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors())
const requestLogger = (req,res,next) =>{
    console.log('Method: ', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}
app.use(requestLogger)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    },
    {
        id: 4,
        content: "Learning FullStack is not easy.",
        date: "2019-05-30T19:20:14.298Z",
        important: true
      },
  ]
app.get('/', (req,res)=>{
    res.send('<h1>Hello World</h1>')
})
app.get('/api/notes',(req,res)=>{
    res.json(notes)
})
// fetching single resources
app.get('/api/notes/:id',(req,res)=> {
    const id = Number(req.params.id);
    const note = notes.find(n=>n.id=== id)
    if(note){
        res.json(note)
    } else{
        res.status(404).end()
    }
})

// creating new note
const generateID = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)) : 0
    return maxId + 1
}

app.post('/api/notes',(req,res)=> {
     const body = req.body;
     if(!body.content) {
         return res.status(400).json({
             error: 'Content Missing'
         })
     }
     const note = {
         content: body.content,
         important: body.important || false, // if the value is not provided than default value set to false
         date: new Date(),
         id: generateID()
     }    
    notes = notes.concat(note)
    res.json(note)
})


// deleting resources
app.delete('/api/notes/:id',(req,res)=> {
    const id = Number(req.params.id)
    notes = notes.filter(n=>n.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)