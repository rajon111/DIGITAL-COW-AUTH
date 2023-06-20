## Live Link: https://cow-hut-auth-backend-six.vercel.app/

## Application Routes:

##  User
<hr>

* api/v1/auth/signup (POST)
* api/v1/users (GET)
* api/v1/users/64907a57a5f0e982679aa71b(Single GET)
* api/v1/users/64907a57a5f0e982679aa71b(PATCH)
* api/v1/users/64907a57a5f0e982679aa71b(DELETE)

## Cows
<hr>

* api/v1/cows (POST)
* api/v1/cows (GET)
* api/v1/cows/64918196af0f53901375f8b3 (Single GET)
* api/v1/cows/64918196af0f53901375f8b3 (PATCH)
* api/v1/cows/64918196af0f53901375f8b3 ( DELETE)

Pagination and Filtering routes of Cows

* api/v1/cows?pag=1&limit=10
* api/v1/cows?sortBy=price&sortOrder=asc
* api/v1/cows?minPrice=20000&maxPrice=70000
* api/v1/cows?location=Dhaka
* api/v1/cows?searchTerm=Dha

## Orders
<hr>

* api/v1/orders (POST)
* api/v1/orders (GET)