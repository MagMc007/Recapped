## AUTHENTICATION
#### The url documentation below are for user authentication and security.

### 1. Register
#### This endpoint registers user to the DB.
#### ENDPOINT: api/auth/register/


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
#### This Endpoint is for logging users in.
#### ENDPOINT: api/auth/login/


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
#### The url documentation below are for movie related functionalities included in the project.
```
All the endpoints below require Authentication via jwt so make sure you log in and obtain the jwt token to include in the headers like 
Authorization: Bearer <Your Token here>
```
### 1. All Movies/ All Series
#### Gets all the movies/ series.

#### ENDPOINT: api/movies/ or api/series/


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
            ],
            "average_rating": 4.0
        },
         ...]
    }

```

### 2. Series / Movie Detail view
#### Gets the details for a single movie/series.

#### ENDPOINT: api/movies/movie_name/ or api/series/series_name/


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
    ],
    "average_rating": null
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
#### This endpoint is for searching a movie/series.

#### ENDPOINT: api/movies/search/ or api/series/search/


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
            ],
            "average_rating": null
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
#### Gets all the recent movies in order of the year

#### ENDPOINT: api/movies/recents/ or api/series/recents/


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
            ],
            "average_rating": null
        }, 
        ....
        ]
    }
```


### 5.  Filter Series or Movies by genre
#### Returns the filtered movie/series based on the given genre.

#### ENDPOINT: api/movies/filter/genre/ or api/series/filter/genre/


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
            ], 
            "average_rating": 4.0
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
#### Returns the movies/series filtered for the specific year provided

#### ENDPOINT: api/movies/filter/year/ or api/series/filter/year/


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
            ],
            "average_rating": 4.0
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
#### Returns movies/series from the provided country.

#### ENDPOINT: api/movies/filter/country/ or api/series/filter/country/

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
            ],
            "average_rating": 4.0
        }, ...
    ]
    
}
```
Incase of no movies from a year

response: 404 Not Found

```json
{
    "message": "No movies from the country: `China`."
}

```
_______________________________________________________________________

## Reviews

### 1. Rate a movie or series
#### Rates movies/series from with a provided score.

#### ENDPOINT: api/reviews/movies/movie_name/ratings/ or api/reviews/series/series_name/ratings/

method: POST

request body: 
```json
 {
    "score": 4
 }
```

response: 201 CREATED

### 2. Get the rating of a movie or series
#### provides the rating of a movie from users

#### ENDPOINT: api/reviews/moviesmovie_name/ratings/ or api/reviews/series/series_name/ratings/

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
            "id": 1,
            "user": {
                "id": 2,
                "username": "mag2",
                "email": "mag2@mag.com"
            },
            "movie": "Harry Potter and the Deathly Hallows: Part 2 | United Kingdom, United States | 2011",
            "score": 4
        }
    ]
    }
```





