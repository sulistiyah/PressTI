const db = require("../models")
const Kehadiran = db.kehadiran
const SetPresensi = db.setPresensi
const ProgramStudi = db .programStudi
const Kelas = db.kelas
const MataKuliah = db.matkul
const UserMahasiswa = db.userMahasiswa
const UserDosen = db.userDosen
const Op = db.Sequelize.Op;

//Proses Kehadiran Mahasiswa
exports.presensi = (req, res) => {
    //Save User To Database
    Kehadiran.create({
        setPresensiId : req.body.setPresensiId,
        userMahasiswaId : req.body.userMahasiswaId,
        statusPresensi : req.body.statusPresensi,
        tanggalPresensi : req.body.tanggalPresensi,
        waktuPresensi : req.body.waktuPresensi
    })
    .then(data => {
        res.status(200).send({
            statusCode: 200,
            message: "Presensi Successful",
            data : data
        });
    })
    .catch(err => {
        res.status(500).send({
            statusCode: 500,
            message: err.message || "Some error occurred while creating the presensi."
        });
    });
}

//Proses Get Data Mahasiswa - GET My Profile
exports.findAllKehadiran = (req, res) => {
    const id = req.query.id
    const condition = id? { id : { [Op.like]: `%${id}%` } } : null

    Kehadiran.findAll({
        where : condition,
        include : [
            {
                model : SetPresensi,
                as: "setPresensi"
            },
            {
                model : UserMahasiswa,
                as : "userMahasiswa"
            }]    
        })
        .then(data => {
            res.status(200).send({
                statusCode: 200,
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                statusCode: 500,
                message: err.message || "Some error occurred while retrieving data kehadiran."
            });
        });
}


//Proses GET Data Mahasiswa - GET My Profile By Id
exports.findOneMyProfileById = (req, res) => {
    const id = req.params.id;

    UserMahasiswa.findByPk(id, { include: ["programStudi", "kelas"] })
        .then(data => {
            if (data) {
                res.status(200).send({
                    statusCode : 200,
                    message: "Succes Get My Profile By Id",
                    data: {
                        id: data.id,
                        nim: data.nim,
                        nama: data.nama,
                        programStudi: {
                            id : data.programStudi.id,
                            kodeProdi : data.programStudi.kodeProdi,
                            programStudi : data.programStudi.programStudi
                        },
                        kelas: {
                            id : data.kelas.id,
                            kodeKelas : data.kelas.kodeKelas,
                            kelas : data.kelas.kelas
                        },                          
                        noTelepon: data.noTelepon,
                        image: data.image
                    }
                })
            } else {
                res.status(404).send({
                    statusCode : 404,
                    message: `Cannot find My Profile with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message: "Error retrieving My Profile with id=" + id
            });
        });
};


//Proses Edit Profile - PUT data Edit Profil
exports.editProfil = async (req, res) => {
    UserMahasiswa.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    try {
        const result = await db.userMahasiswa.update(req.body, {
            where: { id: req.params.id }
        });
        
        if (result[0]) {
            const userMahasiswa = await db.userMahasiswa.findByPk(req.params.id, {
                include: ["programStudi", "kelas"]
            });
        
            if (!userMahasiswa) {
                return res.status(404).send({
                    statusCode: 404,
                    essage: `Cannot find USer with id=${req.params.id}.`
                });
            }

            const formattedData = {
                id: userMahasiswa.id,
                nim: userMahasiswa.nim,
                nama: userMahasiswa.nama,
                programStudi: {
                    id: userMahasiswa.programStudi.id,
                    kodeProdi: userMahasiswa.programStudi.kodeProdi,
                    programStudi: userMahasiswa.programStudi.programStudi
                },
                kelas: {
                    id: userMahasiswa.kelas.id,
                    kodeKelas: userMahasiswa.kelas.kodeKelas,
                    kelas: userMahasiswa.kelas.kelas
                },
                noTelepon : userMahasiswa.noTelepon
            };

            res.status(200).send({
                statusCode: 200,
                message: "User Update Successful",
                data: formattedData
            });

        } else {
            res.status(404).send({
                statusCode: 404,
                message: `Cannot update User with id=${req.params.id}. Maybe User was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while updating the User."
        });
    };
}


//Proses Penggantian Password - PUT data Edit Profil
exports.changePassword = (req, res) => {
    const id = req.params.id;
    const { password, newPassword, confirmPassword } = req.body;

    // Validasi bahwa newPassword dan confirmPassword sama
    if (newPassword !== confirmPassword) {
        return res.status(400).send({
            statusCode : 400,
            message: "New password and confirm password do not match."
        });
    }

    UserMahasiswa.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    statusCode : 404,
                    message: `User with id=${id} not found.`
                });
            }

            // Validasi bahwa password lama sesuai
            const passwordIsValid = bcrypt.compareSync(password, data.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    statusCode : 401,
                    message: "Invalid current password."
                });
            }

            // Enkripsi newPassword
            const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

            // Update password baru ke dalam database
            UserMahasiswa.update(
                {   password: hashedNewPassword,
                    rePassword : hashedNewPassword },
                {   where: { id: id } }
            )
            .then(() => {
                res.status(200).send({
                    statusCode : 200,
                    message: "Password updated successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    statusCode : 500,
                    message: err.message || "Some error occurred while updating the password."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 400,
                message: err.message || "Some error occurred while retrieving the User."
            });
        });
};

