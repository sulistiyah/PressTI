const { verifikasiRegister } = require("../middleware");
const { authJwt} = require("../middleware")
const controllerUser = require("../controllers/auth_mahasiswa_controller.js");
const constrollerProgramStudi = require("../controllers/program_studi_controller.js")
const controllerKelas = require("../controllers/kelas_controller.js")
const controllerMataKuliah = require("../controllers/mata_kuliah_controller.js")


module.exports = app => {
  const router = require("express").Router()

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //route awal untuk semua api mahasiswa
  app.use("/api/mahasiswa", router)

  //POST untuk register mahasiswa
  router.post(  "/register",
                [ verifikasiRegister.checkDuplicateDataMahasiswa ], 
                controllerUser.register);

  //POST untuk login mahasiswa
  router.post(  "/login", controllerUser.login);

  //GET ALL My Profile - Data Mahasiswa
  router.get(   "/my_profile", 
                [ authJwt.verifikasiToken ], 
                controllerUser.findAllMyProfile)

  //GET My Profile By Id - Data Mahasiswa
  router.get(   "/my_profile/:id", 
                [ authJwt.verifikasiToken ], 
                controllerUser.findOneMyProfileById)

  //PUT My Profile By Id (Edit Profil) - Data Mahasiswa
  router.put(   "/my_profile/:id",
                [ authJwt.verifikasiToken ],
                controllerUser.editProfil) 

  //PUT Change Password By Id (Ganti Kata Sandi) - Data Mahasiswa
  router.put( "/change_password/:id",
              [ authJwt.verifikasiToken ],
              controllerUser.changePassword)

//////////////////////////////////////////////////////////////////////PROGRAM STUDI//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/program_studi", 
                [ authJwt.verifikasiToken ], 
                constrollerProgramStudi.findAll)

  //GET Data Program Studi By Id
  router.get(  "/program_studi/:id", 
                [authJwt.verifikasiToken ],
                constrollerProgramStudi.findOne)


//////////////////////////////////////////////////////////////////////KELAS//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/kelas", 
                [ authJwt.verifikasiToken ], 
                controllerKelas.findAll)

  //GET Data Program Studi By Id
  router.get(  "/kelas/:id", 
                [authJwt.verifikasiToken ],
                controllerKelas.findOne)             
                
//////////////////////////////////////////////////////////////////////MATA KULIAH//////////////////////////////////////////////////
  //GET Data Program Studi
  router.get(  "/mata_kuliah", 
                [ authJwt.verifikasiToken ], 
                controllerMataKuliah.findAll)

  //GET Data Program Studi By Id
  router.get(  "/mata_kuliah/:id", 
                [authJwt.verifikasiToken ],
                controllerMataKuliah.findOne)                        
         
  
};
