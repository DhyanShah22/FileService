const express = require('express')
const { upload } = require('../upload')
const {
    postImage,
    getImages,
    updateImage,
    deleteImage,
 } = require('../Controllers/imageController')

const verifyTokenMiddleware = require('../Controllers/verifyTokenMiddleware'); 
const router = express.Router()

router.use(verifyTokenMiddleware);
router.post('/add', upload.single("image"), postImage)
router.get('/get/hehe', getImages)
router.patch('/update/:id', updateImage)
router.delete('/delete/:id', deleteImage)
module.exports = router