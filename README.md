## Rest API Popular Endpoint Formats

> https://api.example.com/v1/items

> https://example.com/api/v1/items

## Rest API Success Responses

Response is always contain `message` field, to warn user which have been
affected

1- GET - Get single item - HTTP Response Code: **200**

```javascript
HTTP/1.1 200
Content-Type: application/json

{
	"message": "success",
	"data": {
		"id": 10,
		"name": "shirt",
		"color": "red",
		"price": "$23"
	}
}
```

2- GET - Get item list - HTTP Response Code: **200**

```javascript
HTTP/1.1 200
Pagination-Count: 100
Pagination-Page: 5
Pagination-Limit: 20
Content-Type: application/json

{
	"message": "success",
	"data": {
		"current": 5,
		"total": 64,
		"size": 20,
		"hasNext": true,
		"hasPrevious": true,
		"data": [
			{
				"id": 10,
				"name": "shirt",
				"color": "red",
				"price": "$123"
			},
			{
				"id": 11,
				"name": "coat",
				"color": "black",
				"price": "$2300"
			}
		]
	}
}
```

3- POST - Create a new item - HTTP Response Code: **201**

```javascript
HTTP/1.1  201
Location: /v1/items/12
Content-Type: application/json

{
    "message": "The item was created successfully"
}
```

4- PATCH - Update an item - HTTP Response Code: **200/204**

> If updated entity is to be sent after the update

```javascript
HTTP/1.1  200
Content-Type: application/json

{
	"message": "success",
	"data": {
	    "id": 10,
	    "name": "shirt",
	    "color": "red",
	    "price": "$23"
	}
}
```

> If updated entity is not to be sent after the update

```javascript
HTTP/1.1  204
Content-Type: application/json

{
	"message": "success",
}
```

5- DELETE - Delete an item - HTTP Response Code: **204**

```javascript
HTTP/1.1  204

{
	"message": "success",
}
```

## Rest API Error Responses

When your API encounters an error, it should return a response with the
appropriate status code and a well-structured error object.

1- GET - HTTP Response Code: **404**

```javascript
HTTP/1.1  404
Content-Type: application/json

{
    "message": "The item does not exist" /* skip or optional error message */
}
```

2- DELETE - HTTP Response Code: **404**

```javascript
	HTTP/1.1  404
	Content-Type: application/json

	{
	    "message": "The item does not exist", /* skip or optional error message */
	    "error": {
		     "code": "ERR_NOT_FOUND",
		     "message": "The item does not exist"
	    }
	}
```

3- POST - HTTP Response Code: **400**

```javascript
HTTP/1.1  400
Content-Type: application/json

{
	"error": {
		"code": "ERR_INVALID_INPUT",
		"message": "Invalid input data.",
		"details": {
			"email": [
				{
					"message": "Oops! The value is invalid",
					"code": 34,
					"field": "email"
				}
			],
			"phoneNumber": [
				{
					"message": "Oops! The format is not correct",
					"code": 35,
					"field": "phoneNumber"
				}
			]
		}
	}
}
```

4- PATCH - HTTP Response Code: **400/404**

```javascript
HTTP/1.1  400
Content-Type: application/json

{
	"error": {
		"code": "ERR_INVALID_INPUT",
		"message": "Invalid input data.",
		"details": {
			"phoneNumber": [
				{
					"message": "Oops! The format is not correct",
					"code": 35,
				}
			]
		}
	}
}


HTTP/1.1  404
Content-Type: application/json

{
	"error": {
		"code": "ERR_NOT_FOUND",
		"message": "The item does not exist",
	}
}
```

5- VERB Unauthorized - HTTP Response Code: **401**

```javascript
HTTP/1.1  401
Content-Type: application/json

{
	"error": {
		"code": "ERR_INCORRECT_CREDENTIAL",
		"message": "Incorrect authentication credentials",
	}
}
```

6- VERB Forbidden - HTTP Response Code: **403**

```javascript
HTTP/1.1  403
Content-Type: application/json

{
	"error": {
		"code": "ERR_FORBIDDEN",
		"message": "The request is understood, but it has been refused or access is not allowed",
	}
}
```

7- VERB Conflict - HTTP Response Code: **409**

```javascript
HTTP/1.1  409
Content-Type: application/json

{
	"error": {
		"code": "ERR_CONFLICT",
		"message": "Any message which should help the user to resolve the conflict",
	}
}
```

8- VERB Too Many Requests - HTTP Response Code: **429**

```javascript
HTTP/1.1  429
Content-Type: application/json

{
	"error": {
		"code": "ERR_RATE_LIMIT",
		"message": "The request cannot be served due to the rate limit having been exhausted for the resource",
	}
}
```

9- VERB Internal Server Error - HTTP Response Code: **500**

```javascript
HTTP/1.1  500
Content-Type: application/json

{
	"error": {
		"code": "ERR_INTERNAL_SERVER",
		"message": "Something is broken",
	}
}
```

10- VERB Service Unavailable - HTTP Response Code: **503**

```javascript
HTTP/1.1  503
Content-Type: application/json

{
    "error": {
		"code": "ERR_SERVICE_UNAVAILABLE",
		"message": "The server is up, but overloaded with requests. Try again later!",
	}
}
```

## Validation Error Format

```javascript
HTTP/1.1  400
Content-Type: application/json

{
	"error": {
		"code": "ERR_INVALID_INPUT",
		"message": "Invalid input data.",
		"details": {
			"phoneNumber": [
				{
					"message": "Oops! The format is not correct",
					"code": 35,
				}
			]
		}
	}
}
```

## References

PATCH with partial json can be used for updating the resource:
https://tools.ietf.org/html/rfc7396

Avoid using 'X-' in custom headers: https://tools.ietf.org/html/rfc6648

Fork:
https://github.com/cryptlex/rest-api-response-format#rest-api-error-responses
Error handling:
https://codedamn.com/news/backend/advanced-error-handling-in-rest-apis Api
Example: https://www.postman.com/twitter/workspace/twitter-s-public-workspace
