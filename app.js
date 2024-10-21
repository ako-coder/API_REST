require('babel-register')
const {success, error} = require('functions')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const app = express()

const members = [
    {
        id: 1,
        name: 'John'
    },

    {
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jack'
    }
]

app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/api/v1/members/:id', (req, res) => {

    let index = getIndex(req.params.id)

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        res.json(success(members[index]))
    }
})

app.put()

app.get('/api/v1/members/', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(0, req.query.max)))
    } else if (req.query.max != undefined) {
        res.json(error('Wrong max value'))
    } else {
        res.json(success(members))
    }
})

app.post('/api/v1/members', (req, res) => {
    if (req.body.name) {

        for (let i = 0; i < members.length; i++) {
            if (members[i].name === req.body.name) {
                res.json(error('name already taken'))
            }
        }

        let member = {
            id: (members.length) + 1,
            name: req.body.name
        }

        members.push(member)

        res.json(success(member))

    } else {
        res.json(error('no name value'))
    }
})

app.listen(8080, () => console.log('Started on port 8080.'))

function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id)
            return i
    }
    return 'wrong id'
}