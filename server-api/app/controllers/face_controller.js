const db = require("../models")
const Face = db.face
const faceapi = require('face-api.js')
const { Canvas, Image, ImageData } = require('canvas');


// Set up face-api.js with the custom canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });


//Inisialisasai face-api.js
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models')
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models')
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models')
}


exports.detectFace = async (req, res) => {
  try{

    //Load models
    await loadModels()

    
    console.log('Request File :', req.file)
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, error: 'No file received' });
      
    }

    // Lakukan face detection pada gambar
    // const buffer = Buffer.from(req.file.buffer)
    const buffer = req.file.buffer
    const image = await faceapi.bufferToImage(buffer)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()

    // Simpan gambar ke database
    console.log('Before Face.create', detections);
    const face = await Face.create({ image: buffer });
    console.log('Face created:', face);

    res.status(200).json({
      success : true,
      statusCode : 200,
      detections,
      faceId: face.id

    })


  } catch (error){
    console.error('Error creating face:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

