require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Courses = require('./models/course')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/courses', (request, response) => {
    Courses.find({}).then(courses => {
        response.json(courses)
    })
})

app.get('/api/courses/fall2023', (request, response) => {
    Courses.find({ term: "fall2023" }).then(courses => {
        response.json(courses)
    })
})

app.get('/api/courses/winter2024', (request, response) => {
    Courses.find({ term: 'winter2024'}).then(courses => {
        response.json(courses)
    })
})

app.post('/api/courses', (request, response) => {
    const body = request.body

    body.forEach(c => {
        const course = new Courses({
            subject: c.Subject,
            title: c.Title,
            credits: c.Credits,
            schedule: c.Schedule,
            instructor: c.Instructor,
            days: c.Days,
            start_time: String(c.Time).substring(0, 5),
            end_time: String(c.Time).substring(8, 13),
            term: c.Term
        })
        course.save()
    })
    response.json(body)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Running server on port'. PORT)
})

