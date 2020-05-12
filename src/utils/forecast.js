const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=3cd6777d5108786bf19b7fd2bcd28578&query=' + latitude + ',' + longitude + '&units=s'

    request({ url, json: true}, (error, { body }) => {

        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('unable to deal with this shit', undefined)
        } else {
            callback(undefined, 
                `Today we can expect ${body.current.weather_descriptions[0]} skies. It is currently ${body.current.temperature} Kelvin. There is a ${body.current.precip} chance of rain today`
            )   

    }
    })
}

module.exports = forecast