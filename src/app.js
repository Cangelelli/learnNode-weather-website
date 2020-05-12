const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define Paths 
const publicdirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up hbs engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicdirectorypath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'christopher'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'christopher',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
            title: "help",
            name: "christopher"
        })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Submission Requires an Address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if(error){ 
                return res.send({error})
            }


        res.send({ 
            forecast: forcastData,
            location,
            address: req.query.address
        })
           
        })
    })
})

app.get('/products', (req, res) => {
   if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
   }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'christopher',
        errorMessage: 'Help not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found',
        name: 'chrisopher',
        errorMessage: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up motherfucker')
})