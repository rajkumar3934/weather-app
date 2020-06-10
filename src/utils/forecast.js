const request = require('request')

const forecast = (lat, lon, callback) =>{
    
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon='+lon+'&units=metric&APPID=5c178e41c27051d61754e6590f46b2f2'
   
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('No internet connection', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,'the temperature is '+body.main.temp + ' and there is a '+body.weather[0].description)
        }

    })

}
module.exports = forecast