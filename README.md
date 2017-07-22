# url-shortener-microservice

This is a URL shortener API build with Express. When a url is requested, the API will search in the database for that url. If it is found the API will return an object with the original and shortened url. Else, it will store it in the database and return the same object. If the shortened url is requested, the API will redirect to the original url.
