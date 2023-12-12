const expressHandler = require('express-async-handler')
const Image = require('../Models/imageSchema')
const mongoose = require('mongoose')
const path = require('path');
const fs = require('fs');

const getImages = expressHandler(async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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

const updateImage = expressHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { newFilename } = req.body;

        // Log the received ID and newFilename for debugging
        console.log("Received ID:", id);
        console.log("Received newFilename:", newFilename);

        // Check if newFilename is undefined
        if (newFilename === undefined) {
            return res.status(400).json({ error: "newFilename is missing in the request body" });
        }

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid image ID" });
        }

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            { filename: newFilename },
            { new: true }
        );

        if (!updatedImage) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Assuming your file is stored in the 'uploads' folder
        const oldFilePath = path.join(__dirname, '..', updatedImage.filepath);
        const newFilePath = path.join(__dirname, '..', 'uploads', newFilename);

        // Update the file extension based on the original file extension (e.g., .png)
        const originalExtension = path.extname(updatedImage.filepath);
        const newExtension = path.extname(newFilename);
        if (originalExtension !== newExtension) {
            fs.renameSync(oldFilePath, newFilePath + originalExtension);
        } else {
            fs.renameSync(oldFilePath, newFilePath);
        }

        res.status(200).json(updatedImage);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

const deleteImage = expressHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Assuming you want to delete the actual file from the server
        const filePath = deletedImage.filepath;
        fs.unlinkSync(filePath);

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {
    postImage,
    getImages,
    updateImage,
    deleteImage
}