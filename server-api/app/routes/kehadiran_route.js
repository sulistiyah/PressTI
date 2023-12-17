const { authJwtMahasiswa} = require("../middleware")
const controller = require("../controllers/kehadiran_controller")


module.exports = app => {
const router = require("express").Router()

//route awal untuk semua api mahasiswa
app.use("/api", router)

//POST untuk presensi mahasiswa
router.post(  "/mahasiswa/presensi", controller.presensi);


router.get( "/mahasiswa/kehadiran", controller.findAllKehadiran)

};
