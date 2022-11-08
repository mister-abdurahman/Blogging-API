const app = require("./index")
require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()
 
app.get('/', (req, res) => {
    res.send('Welcome to the blog API, Log in or Sign up to access your blogs');
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
