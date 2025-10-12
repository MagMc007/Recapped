## AUTHENTICATION
### 1. Register

ENDPOINT: api/auth/register/
method: POST

request body: 
```json
{
    "username": "mag",
    "email": "mag@mag.com",
    "password": "qwerty1234@#"
}
```

response: 201 CREATED
```json
{
    "user": {
        "id": 1,
        "username": "mag"
    },
    "refresh": "eyJ.............4BDwN6wZ6qrUx_sgJBA",
    "access_token": "eyJhbGciO................YDhpHZPO8KCe6zYu0QS2zWv6zya9f7w"
}
```
### 2. Login

ENDPOINT: api/auth/login/
method: POST

request body: 
```json
{
    "username": "mag",
    "password": "qwerty1234@#"
}
```

response: 200 OK
```json
{
    "user": {
        "id": 1,
        "username": "mag"
    },
    "refresh": "eyJ.............4BDwN6wZ6qrUx_sgJBA",
    "access_token": "eyJhbGciO................YDhpHZPO8KCe6zYu0QS2zWv6zya9f7w"
}
```
 ===========================================================

## MOVIES
### 1. All Movies

ENDPOINT: api/movies/all/
method: GET

request body: 
```json
None
```

response: 200 OK
```json
[
    {
        "id": 1,
        "name": "Harry Potter and the Deathly Hallows: Part 2",
        "country": "United Kingdom, United States",
        "year": 2011,
        "genre": {
            "name": "adventure"
        },
        "is_movie": true,
        "is_series": false,
        "poster_url": "https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg",
        "youtube_details": [
            {
                "source_channel": "Man of Recaps",
                "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
                "video_id": "GE6WKfIrmks"
            }
        ]
    }, ....
]
```