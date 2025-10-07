### 1. Register

ENDPOINT: api/auth/register
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

ENDPOINT: api/auth/login
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
