const express = require('express')
const { json } = require('body-parser') //DESTRUCTURING .JSON OFF OF BODY-PARSER
const app = express()

app.use(json())

//HERE IS WHERE YOUR INTERNAL API REQUESTS WOULD GO

const port = 3333
app.listen(port, () => console.log(`magic is happening on ${port}`))

// Create - post
// Read - get
// Update - put
// Delete - delete

// REMEMBER YOU WILL START TWO SERVERS, ONE WITH NPM START ON THE FRONT END AND ONE WITH NODEMON PATH/TO/SERVER