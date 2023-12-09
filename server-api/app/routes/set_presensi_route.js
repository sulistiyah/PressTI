module.exports = app => {
    const setPresensi = require("../controllers/set_presensi_controller.js")
    const router = require("express").Router()

    // Create a new Set Presensi
    router.post("/dosen/set_presensi", setPresensi.create);

    //GET Data Set Presensi
    router.get("/mahasiswa/set_presensi", setPresensi.findAll)

    //GET Data Set Presensi By Id
    router.get("/mahasiswa/set_presensi/:id", setPresensi.findOne)
    router.get("/dosen/set_presensi/:id", setPresensi.findOne)

    //PUT Data Set Presensi By id => Edit/Update Data
    router.put("/set_presensi/:id", setPresensi.update)

    //DELETE Data Set Presensi By Id
    router.delete("/set_presensi/:id", setPresensi.delete)

    app.use("/api", router)


}