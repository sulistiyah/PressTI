const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const middlewareLogRequest = require('../middleware/logs.js')
const bodyParser = require('body-parser')
// const multer = require("multer")
// const path = require("path")
const faceapi = require('face-api.js')
// const { Canvas, Image, ImageData } = require('canvas')
const canvas = require('canvas')
// const fileUpload = require('express-fileupload')

global.__basedir = __dirname;

// faceapi.env.monkeyPatch({ Canvas, Image })

const app = express()
dotenv.config()

var corsOptions = {
    origin: "http//localhost:8081"
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }))
app.use(middlewareLogRequest)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : true}))

async function LoadFaceModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
}

LoadFaceModels()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage})

// const db = require('../models')
// const Face = db.sequelizeDatabase.import(path.join(__dirname, 'models', 'face'));

// app.post('/detect', upload.single('image'), async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: 'Invalid file' });
//       }
  
//       const file = req.file.path;
//       const imageSizeInfo = sizeOf(file);
//       const resize = { width: imageSizeInfo.width, height: imageSizeInfo.height };
//       const image = await canvas.loadImage(file);
  
//       // Implementasi face detection menggunakan face-api.js
//       const detections = await faceapi.detectAllFaces(image, faceDetectionOptions)
//         .withFaceLandmarks()
//         .withFaceExpressions()
//         .withAgeAndGender();
  
//       // Simpan data wajah ke dalam database (gunakan model Face)
//       const savedFaces = await Promise.all(detections.map(async (detection) => {
//         return Face.create({
//           name: 'Unknown',
//           imagePath: file, // Ganti ini sesuai kebutuhan Anda
//         });
//       }));
  
//       // Kirim response yang sesuai
//       res.status(200).json({
//         message: 'Face detection successful',
//         faces: savedFaces,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to PressTI Application"
    })
})

const db = require("../models")
db.sequelizeDatabase.sync()
    .then(() => {
        console.log("Synced Database")
    })
    .catch((err) => {
        console.log("Failed to sync Database: " + err.message)
    })

    //Pemanggilan masing-masing route
    require("../routes/admin_route.js")(app)
    require("../routes/program_studi_route")(app)
    require("../routes/kelas_route")(app)
    require("../routes/mata_kuliah_route.js")(app)
    require("../routes/auth_mahasiswa_route.js")(app)
    require("../routes/auth_dosen_route.js")(app)
    require("../routes/set_presensi_route.js")(app)
    require("../routes/face_route.js")(app)

    require("../routes/web.js")(app)


const PORT = process.env.NODE_DOCKER_PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is Running on port : ${PORT}`)
})