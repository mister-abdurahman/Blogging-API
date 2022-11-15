This is a Blogging-API that allows new users to sign up, create an account and sign in using the jwt strategy and authentication. Registered Users that are logged in can do special functionalities like creating, publishing or deleting a blog.
Blogs can also be sorted based on authors, titles and tags. JWT authentication is used to protect certain routes that require the JWT token to be accessed. 

API Functionalities:
To Sign Up, Go to the /auth/signup route. Then input your Email and Password.
To Log in, Go to the /auth/login route. Then input your registered Email and correct password  
Only authenticated users can create a blog and the required fields to create a blog are: title, author, state, tags, body and author_id   
Authenticated routes can only be accessed by logged in users whereby their generated token upon logging in is used to access authenticated routes. Note that the token should be added in the bearer authentication and expires after an hour.
When the owner of a blog wants to get his blog he should input his author_id in the /order/:id route to get all his blogs  
To delete a blog. Use the id of the intended blog in the req.params field 
