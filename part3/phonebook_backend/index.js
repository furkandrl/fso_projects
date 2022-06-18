const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors=require('cors')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('build'))

let persons = [  
    {
        "name": "Arto Hellas",
        "number": "45-15-118",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "deneme",
        "number": "05325320000",
        "id": 7
      },
      {
        "name": "Furkan Dereli",
        "number": "507507507",
        "id": 11
      }
    ]


const generateId=()=>{
    const maxId=persons.length>0
    ? Math.floor(Math.random(...persons.map(p=>p.id))*500)
    :0
    return maxId
}        

app.post('/api/persons', (request,response)=>{
    const body=request.body
    const duplicateCheck=(p)=>{
        return(
            persons.find(person=>person.name===p)
        )
    }

    if(!body.name||!body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })}else if(duplicateCheck(body.name)){
            return response.status(400).json({
                error: 'name already exists'}
                )
        }
    
    
    const person={
        name: body.name,
        number: body.number||'no number added',
        id: generateId()
    }

    persons=persons.concat(person)
   
    
    response.json(person)
   

})




app.get('/api', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const info= "Phonebook has info for"+" " +persons.length+" " +"people"+  
    " "+Date()
    response.send(info)
})

app.get('/api/persons', (request, response)=>{
    response.json(persons)})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person=persons.find(person=>
        person.id===id)
    
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
        
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person =>person.id !== id)
  
    response.status(204).end()
  })
          

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})
