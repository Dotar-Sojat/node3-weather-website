const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { readFileSync } = require('fs')

const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const helpPagePath = path.join(__dirname, '../public/help.html')
const aboutPagePath = path.join(__dirname, '../public/about.html')
const errorPagePath = path.join(__dirname, '../public/404.html')

// Set up handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(helpPagePath))
app.use(express.static(aboutPagePath))
app.use(express.static(errorPagePath))

// Setup static directoru to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Rhas al Ghul'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        image: 'robot.png'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Joe',
        message: 'Really need help'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     address: req.query.address,
    //     location: 'Tucson',
    //     forecast: 'It is raining'
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) =>{
    res.render('error',{
        title: 'Help 404',
        message: 'Help article not found'
    })
})

app.get('*',(req, res) =>{
    res.render('error',{
        title: '404',
        message: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})