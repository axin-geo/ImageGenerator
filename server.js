const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const fs = require('fs')
const multer = require('multer')
const { OpenAI } = require("openai")

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public')
    },
    filename:(req, file, cb) => {
        console.log('file', file)
        cb(null, Date.now() + "-" +file.originalname)
    }
})
const upload = multer({storage: storage}).single('file')
let filePath

app.post('/images', async (req, res)=> {

    try{
        const response = await openai.images.generate({
            prompt: req.body.message,
            n: 3,
            size: "1024x1024",
        });
        console.log(response.data)
        res.send(response.data)
    } catch (error) {
        console.error(error)
    }

})

app.post("/upload", (req, res) =>{
 upload(req, res, (err) => {
     if (err instanceof multer.MulterError){
         return res.status(500).json(err)
     } else if (err){
         return res.status(500).json(err)
     }
     console.log(req.file.path)
     filePath = req.file.path
 })
})


app.post('/variations', async(req, res) => {
    try{
            const response = await openai.images.createVariation({
                image: fs.createReadStream(filePath),
                n:3,
                size: "1024x1024",
            });

            res.send(response.data.data)

    } catch (error){
        console.error(error)
    }
})


app.listen(PORT, () => console.log('Your server is running on PORT' + PORT))

