const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const middlewareLogRequest = require('../middleware/logs.js')


global.__basedir = __dirname;


const app = express()
dotenv.config()

const corsOptions = {
    origin: 'http://34.192.213.125:3000',
    credentials: true
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(middlewareLogRequest)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to PressTI Application"
    })
})

const db = require("../models/index.js")
db.sequelizeDatabase.sync()
    .then(() => {
        console.log("Synced Database")
    })
    .catch((err) => {
        console.log("Failed to sync Database: " + err.message)
    })

    //Pemanggilan masing-masing route
    require("../routes/admin_route.js")(app)
    require("../routes/program_studi_route.js")(app)
    require("../routes/kelas_route.js")(app)
    require("../routes/mata_kuliah_route.js")(app)
    require("../routes/auth_mahasiswa_route.js")(app)
    require("../routes/auth_dosen_route.js")(app)
    require("../routes/set_presensi_route.js")(app)
    // require("../routes/rekapitulasi_route.js")(app)
    require("../routes/face_route.js")(app)

    require("../routes/web.js")(app)


const PORT = process.env.NODE_DOCKER_PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is Running on port : ${PORT}`)
})