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
_______________________________________________________________________

## MOVIES
```
All the endpoints below require Authentication via jwt so make sure u log in and obtain the jwt token to include in the headers like 
Authorization: Bearer <Your Token here>
```
### 1. All Movies/ All Series

ENDPOINT: api/movies/or api/series/


method: GET

request body: 
```json
None
```

response: 200 OK
```json
    {
    "count": 18,
    "next": "http://127.0.0.1:8000/api/movies/all/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Harry Potter and the Deathly Hallows: Part 2",
            "country": "United Kingdom, United States",
            "year": 2011,
            "genre": {
                "id": 1,
                "name": "adventure"
            },
            "is_movie": true,
            "is_series": false,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "id": 1,
                    "source_channel": "Man of Recaps",
                    "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
                    "video_id": "GE6WKfIrmks"
                }
            ]
        },
         ...]
    }

```

### 2. Series / Movie Detial view


ENDPOINT: api/movies/<moviename>/ or api/series/<seriesname>/


method: GET

request body: 
```json
None
```

response: 200 OK
```json
    {
    "id": 2,
    "name": `the movie name OR the series name`,
    "country": "Japan",
    "year": 2020,
    "genre": {
        "id": 2,
        "name": "action"
    },
    "is_movie": false,
    "is_series": true,
    "poster_url": "https://m.media-amazon.com/images/M/MV5BYmMzODA4M2MtMjBmNC00YjFhLTg4NzgtODgyNzE4NWQxMThmXkEyXkFqcGc@._V1_SX300.jpg",
    "youtube_details": [
        {
            "id": 2,
            "source_channel": "Man of Recaps",
            "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
            "video_id": "W6U-iB3HY1w"
        }
    ]
}
```
Incase the movie or series is not found


response: 404 Not Found


```json
{
    "detail": "No Movies matches the given query."
}
```



### 3. Series / Movie Searching


ENDPOINT: api/movies/search/ or api/series/search/


In query params
```
q=?`The movie name`
```
method: GET

request body: 
```json
None
```

response: 200 OK
```json
    {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "name": "Alice in Borderland",
            "country": "Japan",
            "year": 2020,
            "genre": {
                "id": 2,
                "name": "action"
            },
            "is_movie": false,
            "is_series": true,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BYmMzODA4M2MtMjBmNC00YjFhLTg4NzgtODgyNzE4NWQxMThmXkEyXkFqcGc@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "id": 2,
                    "source_channel": "Man of Recaps",
                    "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
                    "video_id": "W6U-iB3HY1w"
                }
            ]
        }
    ]
}
```
Incase the movie or series is not found:
response: 404 Not Found
```json
    {
    "message": "No results for `Movie / Seriesname`."
    }
```


### 4. Recent Series or Movies


ENDPOINT: api/movies/recents/ or api/series/recents/


method: GET

request body: 
```json
None
```

response: 200 OK
```json
 {   
    "count": 18,
    "next": "http://127.0.0.1:8000/api/movies/recents/?page=2",
    "previous": null,
    "results": [
        {
            "id": 38,
            "name": "What We Hide",
            "country": "United States",
            "year": 2025,
            "genre": {
                "id": 5,
                "name": "drama"
            },
            "is_movie": true,
            "is_series": false,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BMjM0ZmE2MGMtM2ZjZS00ZDhkLWEwNjctNWRkOTk3MjdmYjE4XkEyXkFqcGc@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "id": 67,
                    "source_channel": "Film Recaps",
                    "source_channel_id": "UCjyv8n7SQOXD75SW0EiAYxA",
                    "video_id": "6I0d1CjpgNA"
                }
            ]
        }, 
        ....
        ]
    }
```


### 5.  Filter Series or Movies by genre


ENDPOINT: api/movies/filter/genre/ or api/series/filter/genre/


In the query params
```
?g=`The genre you want`
```

method: GET

request body: 
```json
None
```

response: 200 OK
```json
 {
    "count": 7,
    "next": "http://127.0.0.1:8000/api/movies/filter/genre/?g=Action&page=2",
    "previous": null,
    "results": [
        {
            "id": 5,
            "name": "Rogue One: A Star Wars Story",
            "country": "United States",
            "year": 2016,
            "genre": {
                "id": 2,
                "name": "action"
            },
            "is_movie": true,
            "is_series": false,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "id": 5,
                    "source_channel": "Man of Recaps",
                    "source_channel_id": "UCNCTxLZ3EKKry-oWgLlsYsw",
                    "video_id": "B7YH9WCJgPk"
                }
            ]
        },
        ...
    ]
}
```


Incase there is no movie from the genre you want

Response: 404 Not found
```json
{
    "message": "No movies with genre: `TrielGen` yet."
}
```


### 6.  Filter Series or Movies by year


ENDPOINT: api/movies/filter/year/ or api/series/filter/year/


In the query params
```
?y=`The year you want`
```

method: GET

request body: 
```json
None
```

response: 200 OK
```json
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 39,
            "name": "The Shining",
            "country": "United Kingdom, United States",
            "year": 1980,
            "genre": {
                "id": 5,
                "name": "drama"
            },
            "is_movie": true,
            "is_series": false,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BNmM5ZThhY2ItOGRjOS00NzZiLWEwYTItNDgyMjFkOTgxMmRiXkEyXkFqcGc@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "id": 68,
                    "source_channel": "Film Recaps",
                    "source_channel_id": "UCjyv8n7SQOXD75SW0EiAYxA",
                    "video_id": "3OqPkYQdU38"
                }
            ]
        }
    ]
}
```
Incase of No movies from a year

response: 404 Not Found

```json
{
    "message": "No movies from the year: `1880`."
}
```

### 7.  Filter Series or Movies by Country


ENDPOINT: api/movies/filter/country/ or api/series/filter/country/

In the query params
```
?c=`The country you want`
```

method: GET

request body: 
```json
None
```

response: 200 OK
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 43,
            "name": "The Exit 8",
            "country": "Japan",
            "year": 2025,
            "genre": {
                "id": 2,
                "name": "action"
            },
            "is_movie": true,
            "is_series": false,
            "poster_url": "https://m.media-amazon.com/images/M/MV5BMTkyN2ZjM2YtNTE2Yi00MzNjLWIzYzEtOWNhNzgzNjE0OTJjXkEyXkFqcGc@._V1_SX300.jpg",
            "youtube_details": [
                {
                    "id": 72,
                    "source_channel": "Film Recaps",
                    "source_channel_id": "UCjyv8n7SQOXD75SW0EiAYxA",
                    "video_id": "YRdwA-1lPgI"
                }
            ]
        }, ...
    ]
}
```
Incase of No movies from a year

response: 404 Not Found

```json
{
    "message": "No movies from the country: `China`."
}

```







