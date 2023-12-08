const db = require("../models")
const Face = db.face
const faceapi = require('face-api.js')
const canvas = require('canvas')
const path = require("path")
const fs = require("fs");
// const upload = require('../middleware/multer.js')
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);


// Memuat model face-api.js
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
  }
  
  loadModels();

  // Pemanggilan fungsi monkeyPatch agar face-api.js dapat berjalan di lingkungan Node.js
  faceapi.env.monkeyPatch({
     Canvas: canvas, 
     Image: canvas.Image, 
     ImageData: canvas.ImageData 
  });


  exports.detectAndSaveFace = async (req, res) => {
    try {
      if (!req.body.image) {
        console.log(error)
        return res.status(400).json({ message: 'Invalid file' });
      } else {
        console.log(error)
      }
  
      const imageBuffer = Buffer.from(req.body.image, 'base64');
  
      // Implementasi face detection menggunakan face-api.js
      const detections = await faceapi.detectAllFaces(imageBuffer).withFaceLandmarks().withFaceDescriptors();
  
      // Simpan data wajah ke dalam database
      const savedFaces = await Promise.all(detections.map(async (detection) => {
        return Face.create({
          label: 'Unknown',
          image: imageBuffer,
        });
      }));
  
      res.status(200).json({
        message: 'Face detection successful',
        faces: savedFaces,
      });
    } catch (error) {
      console.error(error);
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }

  }
  

  // // Fungsi untuk menyimpan wajah ke database
  // async function saveFaceToDatabase(label, descriptor) {
  //   try {
  //     await Face.create({
  //       label,
  //       descriptor: JSON.stringify(descriptor),
  //     });
  //     console.log('Face saved to database.');
  //   } catch (error) {
  //     console.error('Error saving face to database:', error.message);
  //   }
  // }
  
  // // Fungsi untuk mendeteksi dan menyimpan wajah
  // async function detectAndSaveFace(req, res) {
  //   try {
  //     if (!req.file || !req.file.path) {
  //       return res.status(400).json({ 
  //         success: false, 
  //         message: 'File not provided.' 
  //       });
  //     }
  //     const img = await canvas.loadImage(req.file.path);
  //     const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
  
  //     if (detections.length > 0) {
  //       const { descriptor } = detections[0];
  //       const label = 'Unknown'; // Assign a label or fetch from req.body
  //       saveFaceToDatabase(label, descriptor);
  //       res.json({ success: true, message: 'Face detected and saved.' });
  //     } else {
  //       res.json({ success: false, message: 'No face detected.' });
  //     }
  //   } catch (error) {
  //     console.error('Error detecting face:', error.message);
  //     res.status(500).json({ success: false, message: 'Internal Server Error' });
  //     console.log(error)
  //   }
  // }
  
  // module.exports = {
  //   detectAndSaveFace,
  // };
  




// async function uploadLabeledImages(req, res) {
//     try {
//       const { File1, File2, File3, label } = req.files;
//       const images = [File1.tempFilePath, File2.tempFilePath, File3.tempFilePath];
//       const descriptions = [];
  
//       for (const imagePath of images) {
//         const img = await canvas.loadImage(imagePath);
//         const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       }
  
//       const createFace = await FaceModel.create({
//         label: label,
//         descriptions: descriptions,
//       });
  
//       res.json({ message: "Face data stored successfully", data: createFace });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Something went wrong, please try again.", error: error.message });
//     }
//   }
  
//   async function getDescriptorsFromDB(req, res) {
//     try {
//       const faces = await FaceModel.findAll();
  
//       const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
  
//       const { tempFilePath } = req.files.File1;
//       const img = await canvas.loadImage(tempFilePath);
//       const temp = faceapi.createCanvasFromMedia(img);
//       const displaySize = { width: img.width, height: img.height };
//       faceapi.matchDimensions(temp, displaySize);
  
//       const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
  
//       res.json({ results });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Something went wrong, please try again.", error: error.message });
//     }
//   }
  
//   module.exports = {
//     uploadLabeledImages,
//     getDescriptorsFromDB,
//   };



// // Konfigurasi multer untuk menangani unggah file
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// //Mendeteksi gambar dan melabel gambar yang terdeteksi serta dimasukan ke dalam database yang ada
// async function uploadLabeledImages(images, label) {
//     try{
//         let counter = 0
//         const descriptions = []

//         //Loop melalui gambar
//         for (let i = 0; i < images.length; i++) {
//             const img = await canvas.loadImage(images[i].buffer)
//             counter = (i / images.length) * 100
//             console.log(`Progress = ${counter}%`)

//             //Membaca setidap wajah dan menyimpan deskripsi wajah dalam araay descriptions
//             const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//             descriptions.push(detections.descriptor)
//         }

//         //Membuat dokumen wajah baru dengan label yang diberikan dan menyimpannya ke dalam database
//        await Face.create({
//             label : label,
//             descriptions : descriptions
//         })

//     } catch (err) {
//         console.log(err)
//         return err
//     }

// }

// //face Uplaod - upload data wajah ke dalam database
// exports.faceUpload = async (req, res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({
//             statusCode : 400,
//             message : errors.array()
//         })
//     }
    
//     // const File1 = req.files.File1.tempFilePath
//     // const File2 = req.files.File2.tempFilePath
//     // const File3 = req.files.File3.tempFilePath
//     const label = req.body.label

//     //Pastikan anda sudah menyesuaikan dengan nama field pada postman (images, label)
//     const images = req.files

//     try {
//         await uploadLabeledImages(images, label )
//         res.status(200).json({
//             statusCode : 200,
//             message : "Data Wajah Berhasil Disimpan"
//         })
//     } catch (err) {
//         console.log('Error : ', err)
//         res.status(500).json({
//             statusCode : 500,
//             message : "Terjadi kesalahan, silahkan coba lagi."
//         })
        
//     }
// }


// //Mendapatkan data deskripsi dari database
// async function getDescriptorsFromDB(image) {
//     try {
//         //Mengambil semua data wajah dari database
//         const faces = await Face.findAll()

//         const labeledDescriptors = faces.map((face) => {
//             const descriptors = face.descriptions.map((desc) => new Float32Array(Object.values(desc)))
//             return new faceapi.LabeledFaceDescriptors(face.label, descriptors)
//         })

//         //Memuat face matcher untuk emncari wajah yang cocok
//         const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)
        
//         //Membaca gambar menggunakan canvas atau metode lainnya
//         const img = await canvas.loadImage(image)
//         const temp = faceapi.createCanvasFromMedia(img)
//         const displaySize = {
//             width: img.width, 
//             height: img.height
//         }
//         faceapi.matchDimensions(temp, displaySize)

//         //Menemukan wajah yang cocok 
//         const detections = await faceapi.detectAllFaces(img). withFaceLandmarks().withFaceDescriptors()
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)
//         const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor))

//         return results

//     } catch (err) {
//         console.log(err)
//         return err
        
//     }
// }


//proses face recognition 
// exports.checkFace = async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             statusCode : 400,
//             message : errors.array()
//         })
//     }

//     const File1 = req.files.File1.tempFilePath

//     try {
//         const result = await getDescriptorsFromDB(File1)
//         res.json({
//             result
//         })
//     } catch (err) {
//         console.log('Error : ', err)
//         res.status(500).json({
//             statusCode : 500,
//             message : "Kesalahan Server Internal"
//         })
//     }
// }


// //Proses Face Upload Images Mahasiswa
// exports.faceUpload = (req, res) => {
    
// }


// // .then(data => {
// //     if (!data) {
// //         res.status(404).send({
// //             statusCode : 404,
// //             message: "Failed Process Face"
// //         });
// //     } else {
// //         UserMahasiswa.findByPk(req.body.userMahasiswaId, { include: ["programStudi", "kelas"] })
// //         .then(userMahasiswa => {
// //             if (!userMahasiswa) {
// //                 res.status(404).send({
// //                     statusCode : 404,
// //                     message: `User Mahasiswa Not Found`
// //                 });
// //             } else {
// //                 res.status(200).send({
// //                     statusCode : 200,
// //                     message: "Succes Upload Face",
// //                     data: {
// //                         id: data.id,
// //                         label: data.label,
// //                         descriptions: data.descriptions,
// //                         userMahasiswa: {
// //                             id : data.userMahasiswa.id,
// //                             nim : data.userMahasiswa.nim,
// //                             nama : data.userMahasiswa.nama,
// //                             programStudi: {
// //                                 id: programStudi.id,
// //                                 kodeProdi: programStudi.kodeProdi,
// //                                 programStudi: programStudi.programStudi,
// //                             },
// //                             kelas: {
// //                                 id: kelas.id,
// //                                 kodeKelas: kelas.kodeKelas,
// //                                 kelas: kelas.kelas,
// //                             },                                
// //                             noTelepon: data.noTelepon
// //                         }                        
// //                     }
// //                 })
// //             }
// //         })
// //         .catch(err => {
// //             res.status(500).send({
// //                 statusCode : 500,
// //                 message: "Error retrieving My Profile with id=" + id
// //             });
// //         });
// //     }
// // })




// //Proses Login Mahasiswa
// exports.login = (req, res) => {
//     UserMahasiswa.findOne({
//         where : {
//             nim : req.body.nim
//         },
//         include : [
//             {
//                 model : ProgramStudi,
//                 as: "programStudi"
//             },
//             {
//                 model : Kelas,
//                 as : "kelas"
//             }            
//         ]    
//     })
//     .then(data => {
//         if(!data) {
//             return res.status(404).send({
//                 statusCode : 404,
//                 message : "User Not Found."
//             })
//         } 

//         const passwordIsValid = bcrypt.compareSync(
//             req.body.password,
//             data.password
//         )

//         if(!passwordIsValid) {
//             return res.status(401).send({
//                 statusCode : 401,
//                 accessToken : null,
//                 message: "Invalid Password"
//             })
//         }

//         const token = jwt.sign(
//             { id: data.id },
//             auth_config.secret,
//             {
//               algorithm: 'HS256',
//               allowInsecureKeySizes: true,
//               expiresIn: 86400, // 24 hours
//             }
//         );

//         res.status(200).send({
//             statusCode : 200,
//             message: "Login Successful",
//             data: {
//                 id: data.id,
//                 nim: data.nim,
//                 nama: data.nama,
//                 programStudi: {
//                     id : data.programStudi.id,
//                     kodeProdi : data.programStudi.kodeProdi,
//                     programStudi : data.programStudi.programStudi
//                 },
//                 kelas: {
//                     id : data.kelas.id,
//                     kodeKelas : data.kelas.kodeKelas,
//                     kelas : data.kelas.kelas
//                 },                          
//                 noTelepon: data.noTelepon,
//                 accessToken : token
                
//             }
//         });       
//     })
//     .catch(err => {
//         res.status(500).send({
//             statusCode : 500,
//             message: err.message || "Some error occurred while login the User."
//         });
//     });
// }


// //Proses Get Data Mahasiswa - GET My Profile
// exports.findAllMyProfile = (req, res) => {
//     const nim = req.query.nim
//     const condition = nim? { nim : { [Op.like]: `%${nim}%` } } : null

//     UserMahasiswa.findAll({
//         where : condition,
//         include : [
//             {
//                 model : ProgramStudi,
//                 as: "programStudi"
//             },
//             {
//                 model : Kelas,
//                 as : "kelas"
//             }]    
//         })
//         .then(data => {
//             const formattedData = data.map(mahasiswa => ({
//                 id: mahasiswa.id,
//                 nim: mahasiswa.nim,
//                 nama: mahasiswa.nama,
//                 programStudi: {
//                     id: mahasiswa.programStudi.id,
//                     kodeProdi: mahasiswa.programStudi.kodeProdi,
//                     programStudi: mahasiswa.programStudi.programStudi
//                 },
//                 kelas: {
//                     id: mahasiswa.kelas.id,
//                     kodeKelas: mahasiswa.kelas.kodeKelas,
//                     kelas: mahasiswa.kelas.kelas
//                 },
//                 noTelepon: mahasiswa.noTelepon,
//                 image: mahasiswa.image
//             }));
        
//             res.status(200).send({
//                 statusCode : 200,
//                 message: "Succes Get Data Mahasiswa",
//                 data: formattedData
//             });
            
//         })
//         .catch(err => {
//             res.status(500).send({
//                 statusCode : 500,
//                 message:
//                 err.message || "Failed Get Data Mahasiswa"
//             })
//         })
// }


// //Proses GET Data Mahasiswa - GET My Profile By Id
// exports.findOneMyProfileById = (req, res) => {
//     const id = req.params.id;
  
//     UserMahasiswa.findByPk(id, { include: ["programStudi", "kelas"] })
//       .then(data => {
//         if (data) {
//           res.status(200).send({
//             statusCode : 200,
//             message: "Succes Get My Profile By Id",
//             data: {
//                 id: data.id,
//                 nim: data.nim,
//                 nama: data.nama,
//                 programStudi: {
//                     id : data.programStudi.id,
//                     kodeProdi : data.programStudi.kodeProdi,
//                     programStudi : data.programStudi.programStudi
//                 },
//                 kelas: {
//                     id : data.kelas.id,
//                     kodeKelas : data.kelas.kodeKelas,
//                     kelas : data.kelas.kelas
//                 },                          
//                 noTelepon: data.noTelepon,
//                 image: data.image
                
//             }
//           })
//         } else {
//           res.status(404).send({
//             statusCode : 404,
//             message: `Cannot find My Profile with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//             statusCode : 500,
//             message: "Error retrieving My Profile with id=" + id
//         });
//       });
// };


// //Proses Edit Profile - PUT data Edit Profil
// exports.editProfil = (req, res) => {
//     UserMahasiswa.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(result => {
//         if (result[0]) {
//             UserMahasiswa.findByPk(req.params.id, {
//                 include: [
//                     {
//                         model: ProgramStudi,
//                         as: "programStudi"
//                     },
//                     {
//                         model: Kelas,
//                         as: "kelas"
//                     }
//                 ]
//             })
//             .then(mahasiswa => {
//                 const formattedData = {
//                     id: mahasiswa.id,
//                     nim: mahasiswa.nim,
//                     nama: mahasiswa.nama,
//                     programStudi: {
//                         id: mahasiswa.programStudi.id,
//                         kodeProdi: mahasiswa.programStudi.kodeProdi,
//                         programStudi: mahasiswa.programStudi.programStudi
//                     },
//                     kelas: {
//                         id: mahasiswa.kelas.id,
//                         kodeKelas: mahasiswa.kelas.kodeKelas,
//                         kelas: mahasiswa.kelas.kelas
//                     },
//                     noTelepon: mahasiswa.noTelepon
//                 };

//                 res.status(200).send({
//                     statusCode : 200,
//                     message: "Profile Update Successful",
//                     data: formattedData
//                 });
//             })
//             .catch(err => {
//                 res.status(500).send({
//                     statusCode : 500,
//                     message: err.message || "Some error occurred while retrieving the User."
//                 });
//             });
//         } else {
//             res.status(404).send({
//                 statusCode : 404,
//                 message: `Cannot update profile with id=${req.params.id}. Maybe profile was not found or req.body is empty!`
//             });
//         }
//     })
//     .catch(err => {
//         res.status(500).send({
//             statusCode : 500,
//             message: err.message || "Some error occurred while updating the User."
//         });
//     });
// }


// //Proses Penggantian Password - PUT data Edit Profil
// exports.changePassword = (req, res) => {
//     const id = req.params.id;
//     const { password, newPassword, confirmPassword } = req.body;

//     // Validasi bahwa newPassword dan confirmPassword sama
//     if (newPassword !== confirmPassword) {
//         return res.status(400).send({
//             statusCode : 400,
//             message: "New password and confirm password do not match."
//         });
//     }

//     UserMahasiswa.findByPk(id)
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     statusCode : 404,
//                     message: `User with id=${id} not found.`
//                 });
//             }

//             // Validasi bahwa password lama sesuai
//             const passwordIsValid = bcrypt.compareSync(password, data.password);
//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     statusCode : 401,
//                     message: "Invalid current password."
//                 });
//             }

//             // Enkripsi newPassword
//             const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

//             // Update password baru ke dalam database
//             UserMahasiswa.update(
//                 {   password: hashedNewPassword,
//                     rePassword : hashedNewPassword },
//                 {   where: { id: id } }
//             )
//             .then(() => {
//                 res.status(200).send({
//                     statusCode : 200,
//                     message: "Password updated successfully."
//                 });
//             })
//             .catch(err => {
//                 res.status(500).send({
//                     statusCode : 500,
//                     message: err.message || "Some error occurred while updating the password."
//                 });
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 statusCode : 400,
//                 message: err.message || "Some error occurred while retrieving the User."
//             });
//         });
// };