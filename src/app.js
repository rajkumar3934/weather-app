const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather-app',
        name: 'Rajkumar'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Rajkumar'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
    
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return  res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData
            })
        })
    })
    //console.log(query.search.address)
    
})

app.get('/about/*', (req,res) => {
    res.render('404',{
        error: 'About page not found',
        title: '404',
        name: 'rajkumar'
    })

})

app.get('*', (req,res) => {
    res.render('404',{
        error: 'My 404 page',
        title: '404',
        name: 'rajkumar'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})