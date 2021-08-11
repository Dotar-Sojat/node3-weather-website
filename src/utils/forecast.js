const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=885a9c8432b00f1f9c20fb7aeb9fdac4&units=f&query=${long},${lat}&units=f`

    request({url, json:true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to forecast services',undefined)
        } else if (body.error) {
            callback('Unable to find coordinates',undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                precipitation: body.current.precip
            })
        }
    })
}

module.exports = forecast