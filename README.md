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
```
All the endpoints below require Authentication via jwt so make sure u log in and obtain the jwt token
to include in the headers
```
### 1. All Movies

ENDPOINT: api/movies/all/ or api/movies/series/
method: GET

request body: 
```json
None
```

response: 200 OK
```json
[
    "count": 25,
    "next": "http://127.0.0.1:8000/api/movies/series/?page=3",
    "previous": "http://127.0.0.1:8000/api/movies/series/",
    "results": [
        {
            "id": 11,
            "name": "Wednesday",
            "country": "United States",
            "year": 2022,
            "genre": {
                "name": "comedy"
            },
            "is_movie": false,
            "is_series": true,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BMDE1NjNmZjgtZTg0OC00NjkxLWEzYzItMDNkMTc3YjgxZWQyXkEyXkFqcGc@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "source_channel": "Man of Recaps",
                    "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
                    "video_id": "ROgUFPA8A6k"
                },
                {
                    "source_channel": "Man of Recaps",
                    "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
                    "video_id": "0PJ3van5yds"
                },
                {
                    "source_channel": "Series Recap",
                    "source_channel_id": "UCkIsEaii5bDIvg4MhdsefNQ",
                    "video_id": "ykjI5czhT_o"
                },
                {
                    "source_channel": "Series Recap",
                    "source_channel_id": "UCkIsEaii5bDIvg4MhdsefNQ",
                    "video_id": "mjdSTYrrYzs"
                }
            ]
        },
        ...
]
```