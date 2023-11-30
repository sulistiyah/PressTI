module.exports = app => {
    const admin = require("../controllers/admin_controller.js")
    const router = require("express").Router()

    app.use("/api/admin", router)

    //ADMIN
    router.post("/create_admin", admin.createAdmin)
    router.post("/login", admin.loginAdmin)

    //PROGRAM STUDI
    router.post("/program_studi", admin.createProgramStudi);
    router.get("/program_studi", admin.findAllProgramStudi)
    router.get("/program_studi/:id", admin.findOneProgramStudi);
    router.put("/program_studi/:id", admin.updateProgramStudi)
    router.delete("/program_studi/:id", admin.deleteProgramStudi)

    //KELAS
    router.post("/kelas", admin.createKelas)
    router.get("/kelas", admin.findAllKelas)
    router.get("/kelas/:id", admin.findOneKelas)
    router.put("/kelas/:id", admin.updateKelas)
    router.delete("/kelas/:id", admin.deleteKelas)

    //MATA KULIAH
    router.post("/mata_kuliah", admin.createMataKuliah)
    router.get("/mata_kuliah", admin.findAllMataKuliah)
    router.get("/mata_kuliah/:id", admin.findOneMataKuliah)
    router.put("/mata_kuliah/:id", admin.updateMataKuliah)
    router.delete("/mata_kuliah/:id", admin.deleteMataKuliah)

    //USER MAHASISWA
    router.post("/user_mahasiswa", admin.createUserMahasiswa)
    router.get("/user_mahasiswa", admin.findAllUserMahasiswa)
    router.get("/user_mahasiswa/:id", admin.findOneUserMahasiswa)
    router.put("/user_mahasiswa/:id", admin.updateUserMahasiswa)
    router.delete("/user_mahasiswa/:id", admin.deleteUserMahasiswa)

    //USER DOSEN
    router.post("/user_dosen", admin.createUserDosen)
    router.get("/user_dosen", admin.findAllUserDosen)
    router.get("/user_dosen/:id", admin.findOneUserDosen)
    router.put("/user_dosen/:id", admin.updateUserDosen)
    router.delete("/user_dosen/:id", admin.deleteUserDosen)
    
}