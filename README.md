# lybrary-management-system
    This is a lybrary management API backend which is used for management of Users and books

# Routes & the endpoint

# /users
    GET: get the list of all registered users
    POST: create, or register a new user

# /users/{id}
    GET: get a user by their ID
    PUT: update a user's data by their ID
    DELETE: deleting a user by their ID (check if the user still has any issued book) && (if the user have to pay any fine/penalty)

# /users/subscription-details/{id}
    GET: get a user's subscription details by their id
        >> date of subscription: 
        >> Valid till?: 
        >>Fine (if any):

# /books
    GET: get all the books in the system
    POST: add new books in the system

# /books/{id}
    GET: get a book by its id
    PUT: update a book details by it's id
    DELETE: delete a book's info ny it's id

# /books/issued
    GET: get all the issued books

# /books/issued/fineAmount
    GET: get the fine amount of the issued books

# /subscription
    >> Basic -> 3 months
    >> Standard -> 6 months
    >> Premium -> 12 months

    > > if any user misses the renewal date, he should be collected with $100
    > > if any user misses his subscription, he is expeced to pay $100
    > > if any user misses both subscription and renewal date, he should be collected with $200

## Commands:
    npm init
    npm i express
     npm i nodemon --save-dev

    npm run dev

    if we delete the node_modulues and package-lock.json, we can restore them using ->  npm i
    