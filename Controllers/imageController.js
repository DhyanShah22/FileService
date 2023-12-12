const expressHandler = require('express-async-handler')
const Image = require('../Models/imageSchema')

const postImage = expressHandler(async (req,res) => {
    try{
        if(!req.file) {
            return res.status(500).json({Error: "No such file found"})
        }
        const imageFile = Image({
            filename: req.file.filename,
            filepath: 'uploads/' + req.file.filename
        })
        const savedImage = await imageFile.save()

        res.status(200).json(savedImage)
    }
    catch(error) {
        console.log(error)
    }
})

module.exports = {postImage}