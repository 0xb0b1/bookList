const express = require('express')
const { v4: uuidv4 } = require('uuid')
// const mongoose = require('mongoose')
// const cors = require('cors')


// initializes the express application
const app = express()

// create an Array to store the projects
const projects =  []

// converts API responses to JSON for easy use
app.use(express.json())


app.get('/projects', (request, response) => {
    const { title }= request.query

    const results = title 
        ? projects.filter(project => project.title.includes(title))
        : projects

    return response.json(results)
})


app.post('/projects', (request, response) => {
    const { title, owner } = request.body

    const project = { id: uuidv4(), title, owner }

    projects.push(project)

    return response.json(project)
})


app.put('/projects/:id', (request, response) => {
    const { id } = request.params
    const { title, owner } = request.body

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project

    return response.json(project)
})


app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})


// sets the port number depending if we are in production or development
const port = process.env.PORT || 5000


// initializes the server and logs a message
server = app.listen(port, () => console.log(`Server running on port ${port}`))

