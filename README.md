## Weather data backend API
Backend API server for weather data service

### Server url
https://weather-data-service.herokuapp.com

### Endpoint
#### Auth
- Register an api key
  - HTTP Method: `POST`
  - Path: `/api/{version}/auth/register`
  - Body
    `{ email: YOUR_EMAIL }`

#### Weather Data
- Get weather data
  - HTTP Method: `GET`
  - Path: `/api/{version}/records/latest?city={cityEnglishName}`
  - Headers
    `x-api-key: YOUR_API_KEY`
  
  - Example
    `GET` `/api/v1/records/latest?city=NewTaipei`
    ```
    {
      "status": "success",
      "data": [
          {
              "_id": "6071421eda924814fc275b89",
              "city": "新北市",
              "windSpeed": "2.20",
              "temperature": "17",
              "humidity": "0.85",
              "pressure": "1019",
              "maxTemp": "17.80",
              "minTemp": "16.20",
              "weather": "陰",
              "obsTime": "2021-04-09T16:00:00.000Z
          }
      ]
    }
    ```

### Spec
#### Authentication
- Authenticated by API Key
  - Only allow requests with `x-api-key` header
- Registration
  - Using email
  - Once successful, `apiKey` will be sent as response

#### Weather data
- Only allow up to **25** api calls per day
- parameter definitions
  - `city`: city name
  - `windSpeed`: speed of wind (m/sec)
  - `temperature`: temperature in Celsius (degree)
  - `humidity`: relative humidity (0 ~ 1.0)
  - `pressure`: atmospheric pressure (HPa)
  - `maxTemp`: maximum temperature
  - `minTemp`: minimum temperature
  - `weather`: weather description,
  - `obsTime`: ISOString of observation time in UTC