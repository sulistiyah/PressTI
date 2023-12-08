const db = require("../models")
const Admin = db.admin
const ProgramStudi = db.programStudi
const Kelas = db.kelas
const MataKuliah = db.matkul
const UserMahasiswa = db.userMahasiswa
const UserDosen =  db.userDosen
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs")
const auth_config = require("../config/auth_config")
const  jwt = require("jsonwebtoken")

//====================================================================ADMIN============================================================

//Create akun admin
exports.createAdmin = (req, res) => {
  //membuat data admin
  const admin = {
    nama: req.body.nama,
    email: req.body.email,
    noTelepon: req.body.noTelepon,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  //Menyimpan data admin kedalam database
  Admin.create(admin)
    .then(data => {
      res.status(200).send({
        statusCode : 200,
        message : "Success Create Admin",
        data : data
      });
    })
    .catch(err => {
      console.error("Error creating admin:", err);
      res.status(404).send({
        statusCode : 404,
        message: "Failed Get Data Admin"
      });
    });
};


//Proses Login Admin
exports.loginAdmin = (req, res) => {
  Admin.findOne({
      where : {
          email : req.body.email
      }   
  })
  .then(data => {
      if(!data) {
          return res.status(404).send({
              statusCode : 404,
              message : "User Not Found."
          })
      } 

      const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          data.password
      )

      if(!passwordIsValid) {
          return res.status(401).send({
              statusCode : 401,
              accessToken : null,
              message: "Invalid Password"
          })
      }

      res.status(200).send({
          statusCode : 200,
          message: "Login Successful"
      });       
  })
  .catch(err => {
      res.status(500).send({
          statusCode : 500,
          message: err.message || "Some error occurred while login the User."
      });
  });
}

exports.findAllAdmin = (req, res) => {
  const admin = req.query.admin
  const condition = admin? { admin : { [Op.like]: `%${admin}%` } } : null

  Admin.findAll({ where : condition})
      .then(data => {
          res.status(200).send({
              statusCode : 200,
              message: "Succes Get Data Admin",
              data : data,
          })
      })
      .catch(err => {
          res.status(500).send({
              statusCode : 500,
              message:
              err.message || "Failed Get Data Admin"
          })
      })
}


// exports.logout = (req, res) => {
    
// }
//=================================================PROGRAM STUDI======================================================//

exports.createProgramStudi = (req, res) => {
  //Validasi request
  if(!req.body.kodeProdi || !req.body.programStudi) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  //membuat data program studi
  const program_studi = {
    kodeProdi: req.body.kodeProdi,
    programStudi: req.body.programStudi
  };

  //Menyimpan data Program studi kedalam database
  ProgramStudi.create(program_studi)
    .then(data => {
      res.status(200).send({
        statusCode : 200,
        message : "Success Create Data Program Study",
        data : data
      });
    })
    .catch(err => {
      res.status(404).send({
        statusCode : 404,
        message: "Failed Get Data Program Study"
      });
    });
};

//Function GET => mendapatkan semua data dan mendapatkan data dengan query tertentu 
exports.findAllProgramStudi = (req, res) => {
    const programStudi = req.query.programStudi
    const condition = programStudi? { programStudi : { [Op.like]: `%${programStudi}%` } } : null

    ProgramStudi.findAll({ where : condition})
        .then(data => {
            res.status(200).send({
                statusCode : 200,
                message: "Succes Get Data Program Study",
                data : data,
            })
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message:
                err.message || "Failed Get Data Program Study"
            })
        })
}

//Mendapatkan data program studi dengan parameter id include data kelas 
exports.findOneProgramStudi = (req, res) => {
  const id = req.params.id;

  ProgramStudi.findByPk(id, { include: ["kelas"] })
    .then(data => {
      if (data) {
        res.status(200).send({
          statusCode : 200,
          message: "Succes Get Data Program Study By Id",
          data : data,
        })
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot find Program Study with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Error retrieving Program Study with id=" + id
      });
    });
};

//Update/Edit data program studi dengan parameter id
exports.updateProgramStudi = (req, res) => {
  //Validasi request
  if(!req.body.kodeProdi || !req.body.programStudi) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  ProgramStudi.update(req.body, {
      where: { id: req.params.id }
  })
  .then(result => {
    if (result[0]) {
      ProgramStudi.findByPk(req.params.id)
        .then(prodi => {
            const formattedData = {
                id: prodi.id,
                kodeProdi: prodi.kodeProdi,
                programStudi: prodi.programStudi,
            };

            res.status(200).send({
                statusCode : 200,
                message: "Program Study Update Successful",
                data: formattedData
            });
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message: err.message || "Some error occurred while retrieving the Program Study."
            });
        });
    } else {
        res.status(404).send({
            statusCode : 404,
            message: `Cannot update Program Study with id=${req.params.id}. Maybe Program Study was not found or req.body is empty!`
        });
    }
  })
  .catch(err => {
      res.status(500).send({
          statusCode : 500,
          message: err.message || "Some error occurred while updating the Program Study."
      });
  });
};

// Delete salah satu data program studi dengan parameter id
exports.deleteProgramStudi = (req, res) => {
  const id = req.params.id;

  ProgramStudi.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          statusCode : 200,
          message: "Program Study was deleted successfully!"
        });
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot delete Program Study with id=${id}. Maybe Program Study was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Could not delete Program Study with id=" + id
      });
    });
};

//================================================================KELAS==================================================//
//membuatd dan menyimpan data kelas ke database
exports.createKelas = (req, res) => {

  if(!req.body.kodeKelas || !req.body.kelas) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  Kelas.create({
    kodeKelas : req.body.kodeKelas,
    kelas : req.body.kelas,
    programStudiId : req.body.programStudiId
  }, {
    include : ["programStudi"]
  })
  .then(data => {
    if(!data) {
      res.status(404).send({
        statusCode : 404,
        message : "Failed Create Data Class"
      })
    } else {
      ProgramStudi.findByPk(req.body.programStudiId)
        .then(programStudi => {
          if(!programStudi) {
            res.status(404).send({
              statusCode : 404,
              message : "Program Study Not Found"
            })
          }else {
            res.status(200) .send({
              statusCode : 200,
              message : "Success Create Data Class",
              data : {
                id : data.id,
                kodeKelas : data.kodeKelas,
                kelas : data.kelas,
                programStudi : {
                  id : programStudi.id,
                  kodeProdi : programStudi.kodeProdi,
                  programStudi : programStudi.programStudi
                }
              }
            })
          }
        })
        .catch(err => {
          res.status(500).send({
          statusCode : 500,
          message:
            err.message || "Some error occurred while creating the Class."
          });
        });
    }
  })
  .catch(err => {
    res.status(500).send({
    statusCode : 500,
    message:
      err.message || "Some error occurred while creating the Class."
    });
  });
};
  
  
  //Function menemukan semua data kelas dan menemukan data dengan query tertentu
  exports.findAllKelas = (req, res) => {
    const kelas = req.query.kelas
    const condition = kelas? { kelas : { [Op.like]: `%${kelas}%` } } : null
  
    Kelas.findAll({ 
      where : condition,
      include: [
        {
          model : ProgramStudi,
          as: "programStudi"
        }
      ]
    })
    .then(data => {
      const formdData = data.map(kelas => ({
        id: kelas.id,
        kodeKelas: kelas.kodeKelas,
        kelas: kelas.kelas,
        programStudi:{
          id: kelas.programStudi.id,
          kodeProdi: kelas.programStudi.kodeProdi,
          programStudi: kelas.programStudi.programStudi
        }
      }))
      res.status(200).send({
        statusCode : 200,
        message: "Succes Get Data Class",
        data : formdData,
      })
    })
    .catch(err => {
      res.status(500).send({
          statusCode : 500,
          message:
          err.message || "Failed Get Data Class"
      })
    })
  }
  
  //function mendapatkan data kelas berdasarkan parameter id include data program studi
  exports.findOneKelas = (req, res) => {
    const id = req.params.id;
  
    Kelas.findByPk(id, { include: ["programStudi"] })
      .then(data => {
        if (data) {
          res.status(200).send({
            statusCode : 200,
            message: "Succes Get Data Class By Id",
            data : data,
          })
        } else {
          res.status(404).send({
            statusCode : 404,
            message: `Cannot find Class with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          statusCode : 500,
          message: "Error retrieving Class with id=" + id
        });
      });
  };
  
  //Update/Edit data kelas berdasarkan parameter id
  exports.updateKelas = (req, res) => {
    if(!req.body.kodeKelas || !req.body.kelas) {
      res.status(400).send({
        statusCode : 400,
        message: "Kolom Tidak Boleh Kosong!"
      });
      return;
    }

    Kelas.update(req.body, {
        where: { id: req.params.id }
    })
    .then(result => {
      if (result[0]) {
        Kelas.findByPk(req.params.id)
          .then(kelas => {
              const formattedData = {
                  id: kelas.id,
                  kodeKelas: kelas.kodeKelas,
                  kelas: kelas.kelas,
              };
  
              res.status(200).send({
                  statusCode : 200,
                  message: "Class Update Successful",
                  data: formattedData
              });
          })
          .catch(err => {
              res.status(500).send({
                  statusCode : 500,
                  message: err.message || "Some error occurred while retrieving the Class."
              });
          });
      } else {
          res.status(404).send({
              statusCode : 404,
              message: `Cannot update class with id=${req.params.id}. Maybe class was not found or req.body is empty!`
          });
      }
    })
    .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while updating the Class."
        });
    });
  };
  
  
  // Delete salah satu data kelas dengan parameter id
  exports.deleteKelas = (req, res) => {
    const id = req.params.id;
  
    Kelas.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            statusCode : 200,
            message: "Class was deleted successfully!"
          });
        } else {
          res.status(404).send({
            statusCode : 404,
            message: `Cannot delete Class with id=${id}. Maybe Class was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          statusCode : 500,
          message: "Could not delete Class with id=" + id
        });
      });
  };

  
//=================================================================MATA KULIAH ==========================================================//

exports.createMataKuliah = (req, res) => {
  if(!req.body.kodeMatkul || !req.body.mataKuliah || !req.body.programStudiId || !req.body.kelasId) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

  //membuat data Mata Kuliah
  const mata_kuliah = {
    kodeMatkul: req.body.kodeMatkul,
    mataKuliah: req.body.mataKuliah,
    programStudiId : req.body.programStudiId,
    kelasId : req.body.kelasId
  };

  //Menyimpan data Mata Kuliah kedalam database
  MataKuliah.create(mata_kuliah )
  .then(data => {
    if (!data) {
        res.status(404).send({
            statusCode : 404,
            message: "Failed Create Data Mata Kuliah"
        });
    } else {
    // Mencari program studi berdasarkan ID yang diberikan
        ProgramStudi.findByPk(req.body.programStudiId)
            .then(programStudi => {
            if (!programStudi) {
                res.status(404).send({
                    statusCode : 404,
                    message: "Program Study not found"
                });
            } else {
                // Mencari kelas berdasarkan ID yang diberikan
                Kelas.findByPk(req.body.kelasId)
                .then(kelas => {
                    if (!kelas) {
                        res.status(404).send({
                            statusCode : 404,
                            message: "Kelas not found"
                        });
                    } else {
                        res.status(200).send({
                            statusCode : 200,
                            message: "Create Mata Kuliah Successful",
                            data: {
                                id: data.id,
                                kodeMatkul: data.kodeMatkul,
                                mataKuliah: data.mataKuliah,
                                programStudi: {
                                    id: programStudi.id,
                                    kodeProdi: programStudi.kodeProdi,
                                    programStudi: programStudi.programStudi,
                                },
                                kelas: {
                                    id: kelas.id,
                                    kodeKelas: kelas.kodeKelas,
                                    kelas: kelas.kelas,
                                }                                
                            }
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                    statusCode : 500,
                    message: err.message || "Some error occurred while retrieving Kelas."
                    });
                });
            }
            })
            .catch(err => {
                res.status(500).send({
                    statusCode : 500,
                    message: err.message || "Some error occurred while retrieving Program Studi."
                });
            });
    }
  })
  .catch(err => {
      res.status(500).send({
      statusCode : 500,
      message: err.message || "Some error occurred while creating the User."
      });
  });
};
  
  //Function GET => mendapatkan semua data dan mendapatkan data dengan query tertentu 
  exports.findAllMataKuliah = (req, res) => {
      const mataKuliah = req.query.mataKuliah
      const condition = mataKuliah? { mataKuliah : { [Op.like]: `%${mataKuliah}%` } } : null
  
      MataKuliah.findAll({ 
        where : condition,
        include: [
          {
            model : ProgramStudi,
            as: "programStudi"
          },
          {
            model : Kelas,
            as: "kelas"
          }
        ]
      })
      .then(data => {
          const formdData = data.map(matkul => ({
            id: matkul.id,
            kodeMatkul: matkul.kodeMatkul,
            mataKuliah: matkul.mataKuliah,
            programStudi:{
              id: matkul.programStudi.id,
              kodeProdi: matkul.programStudi.kodeProdi,
              programStudi: matkul.programStudi.programStudi
            },
            kelas:{
              id: matkul.kelas.id,
              kodeKelas: matkul.kelas.kodeKelas,
              kelas: matkul.kelas.kelas
            }
          }))
          res.status(200).send({
            statusCode : 200,
            message: "Succes Get Data Mata Kuliah",
            data : formdData,
          })
      })
      .catch(err => {
          res.status(500).send({
            statusCode : 500,
            message:
            err.message || "Failed Get Data Mata Kuliah"
          })
      }) 
  }
  
  //Mendapatkan data Mata Kuliah dengan parameter id include data kelas 
  exports.findOneMataKuliah = (req, res) => {
    const id = req.params.id;
  
    MataKuliah.findByPk(id, { include: ["programStudi", "kelas"] })
      .then(data => {
        if (data) {
          res.status(200).send({
            statusCode : 200,
            message: "Succes Get Data Mata Kuliah By Id",
            data : data,
          })
        } else {
          res.status(404).send({
            statusCode : 404,
            message: `Cannot find Mata Kuliah with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          statusCode : 500,
          message: "Error retrieving Mata Kuliah with id=" + id
        });
      });
  };
  
  //Update/Edit data Mata Kuliah dengan parameter id
  exports.updateMataKuliah = (req, res) => {
    if(!req.body.kodeMatkul || !req.body.mataKuliah) {
      res.status(400).send({
        statusCode : 400,
        message: "Kolom Tidak Boleh Kosong!"
      });
      return;
    }

    MataKuliah.update(req.body, {
        where: { id: req.params.id }
    })
    .then(result => {
      if (result[0]) {
        MataKuliah.findByPk(req.params.id)
          .then(matkul => {
              const formattedData = {
                  id: matkul.id,
                  kodeMatkul: matkul.kodeMatkul,
                  mataKuliah: matkul.mataKuliah,
              };
  
              res.status(200).send({
                  statusCode : 200,
                  message: "Mata Kuliah Update Successful",
                  data: formattedData
              });
          })
          .catch(err => {
              res.status(500).send({
                  statusCode : 500,
                  message: err.message || "Some error occurred while retrieving the Mata Kuliah."
              });
          });
      } else {
          res.status(404).send({
              statusCode : 404,
              message: `Cannot update Mata Kuliah with id=${req.params.id}. Maybe Mata Kuliah was not found or req.body is empty!`
          });
      }
    })
    .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while updating the Mata Kuliah."
        });
    });
  };
  
  // Delete salah satu data Mata Kuliah dengan parameter id
  exports.deleteMataKuliah = (req, res) => {
    const id = req.params.id;
  
    MataKuliah.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            statusCode : 200,
            message: "Mata Kuliah was deleted successfully!"
          });
        } else {
          res.status(404).send({
            statusCode : 404,
            message: `Cannot delete Mata Kuliah with id=${id}. Maybe Mata Kuliah was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          statusCode : 500,
          message: "Could not delete Mata Kuliah with id=" + id
        });
      });
  };
  
//=======================================================USER MAHASISWA===============================================================
//Proses Register Mahasiswa
exports.createUserMahasiswa = (req, res) => {
  if(!req.body.nim || !req.body.nama || !req.body.programStudiId || !req.body.kelasId || !req.body.noTelepon) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

    //Save User To Database
    UserMahasiswa.create({
        nim : req.body.nim,
        nama : req.body.nama,
        programStudiId : req.body.programStudiId,
        kelasId : req.body.kelasId,
        noTelepon : req.body.noTelepon,
        password : bcrypt.hashSync(req.body.password, 8),
        rePassword : bcrypt.hashSync(req.body.rePassword, 8 )
    }, { 
        include: ["programStudi", "kelas"] 
    })
    .then(data => {
        if (!data) {
            res.status(404).send({
                statusCode : 404,
                message: "Failed Create User Mahasiswa"
            });
        } else {
        // Mencari program studi berdasarkan ID yang diberikan
            ProgramStudi.findByPk(req.body.programStudiId)
                .then(programStudi => {
                if (!programStudi) {
                    res.status(404).send({
                        statusCode : 404,
                        message: "Program Studi not found"
                    });
                } else {
                    // Mencari kelas berdasarkan ID yang diberikan
                    Kelas.findByPk(req.body.kelasId)
                    .then(kelas => {
                        if (!kelas) {
                            res.status(404).send({
                                statusCode : 404,
                                message: "Kelas not found"
                            });
                        } else {
                            res.status(200).send({
                                statusCode : 200,
                                message: "Create User Successful",
                                data: {
                                    id: data.id,
                                    nim: data.nim,
                                    nama: data.nama,
                                    programStudi: {
                                        id: programStudi.id,
                                        kodeProdi: programStudi.kodeProdi,
                                        programStudi: programStudi.programStudi,
                                    },
                                    kelas: {
                                        id: kelas.id,
                                        kodeKelas: kelas.kodeKelas,
                                        kelas: kelas.kelas,
                                    },                                
                                    noTelepon: data.noTelepon,
                                    password: data.password,
                                    rePassword: data.rePassword                                    
                                }
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                        statusCode : 500,
                        message: err.message || "Some error occurred while retrieving Kelas."
                        });
                    });
                }
                })
                .catch(err => {
                    res.status(500).send({
                        statusCode : 500,
                        message: err.message || "Some error occurred while retrieving Program Studi."
                    });
                });
        }
    })
    .catch(err => {
        res.status(500).send({
        statusCode : 500,
        message: err.message || "Some error occurred while creating the User."
        });
    });
}

//Proses Get Data Mahasiswa 
exports.findAllUserMahasiswa = (req, res) => {
    const nim = req.query.nim
    const condition = nim? { nim : { [Op.like]: `%${nim}%` } } : null

    UserMahasiswa.findAll({
        where : condition,
        include : [
            {
                model : ProgramStudi,
                as: "programStudi"
            },
            {
                model : Kelas,
                as : "kelas"
            }]    
        })
        .then(data => {
            const formattedData = data.map(mahasiswa => ({
                id: mahasiswa.id,
                nim: mahasiswa.nim,
                nama: mahasiswa.nama,
                programStudi: {
                    id: mahasiswa.programStudi.id,
                    kodeProdi: mahasiswa.programStudi.kodeProdi,
                    programStudi: mahasiswa.programStudi.programStudi
                },
                kelas: {
                    id: mahasiswa.kelas.id,
                    kodeKelas: mahasiswa.kelas.kodeKelas,
                    kelas: mahasiswa.kelas.kelas
                },
                noTelepon: mahasiswa.noTelepon,
                image: mahasiswa.image
            }));
        
            res.status(200).send({
                statusCode : 200,
                message: "Succes Get User Mahasiswa",
                data: formattedData
            });
            
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message:
                err.message || "Failed Get User Mahasiswa"
            })
        })
}


//Proses GET Data Mahasiswa BY Id
exports.findOneUserMahasiswa = (req, res) => {
    const id = req.params.id;
  
    UserMahasiswa.findByPk(id, { include: ["programStudi", "kelas"] })
      .then(data => {
        if (data) {
          res.status(200).send({
            statusCode : 200,
            message: "Succes Get User Mahasiswa By Id",
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
            message: `Cannot find User Mahasiswa with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: "Error retrieving User Mahasiswa with id=" + id
        });
      });
};


//Proses Edit Data USer Mahasiswa
exports.updateUserMahasiswa = (req, res) => {
    UserMahasiswa.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if (result[0]) {
            UserMahasiswa.findByPk(req.params.id, {
                include: [
                    {
                        model: ProgramStudi,
                        as: "programStudi"
                    },
                    {
                        model: Kelas,
                        as: "kelas"
                    }
                ]
            })
            .then(mahasiswa => {
                const formattedData = {
                    id: mahasiswa.id,
                    nim: mahasiswa.nim,
                    nama: mahasiswa.nama,
                    programStudi: {
                        id: mahasiswa.programStudi.id,
                        kodeProdi: mahasiswa.programStudi.kodeProdi,
                        programStudi: mahasiswa.programStudi.programStudi
                    },
                    kelas: {
                        id: mahasiswa.kelas.id,
                        kodeKelas: mahasiswa.kelas.kodeKelas,
                        kelas: mahasiswa.kelas.kelas
                    },
                    noTelepon: mahasiswa.noTelepon
                };

                res.status(200).send({
                    statusCode : 200,
                    message: "User Update Successful",
                    data: formattedData
                });
            })
            .catch(err => {
                res.status(500).send({
                    statusCode : 500,
                    message: err.message || "Some error occurred while retrieving the User."
                });
            });
        } else {
            res.status(404).send({
                statusCode : 404,
                message: `Cannot update user with id=${req.params.id}. Maybe user was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while updating the User."
        });
    });
}


// Delete salah satu data User Mahasiswa dengan parameter id
exports.deleteUserMahasiswa = (req, res) => {
  const id = req.params.id;

  UserMahasiswa.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          statusCode : 200,
          message: "User Mahasiswa was deleted successfully!"
        });
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot delete User Mahasiswa with id=${id}. Maybe User Mahasiswa was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Could not delete User Mahasiswa with id=" + id
      });
    });
};




//=======================================================USER DOSEN===============================================================
//Proses CREATE Dosen
exports.createUserDosen = (req, res) => {
  if(!req.body.nip || !req.body.nama || !req.body.email || !req.body.noTelepon || !req.body.password || !req.body.rePassword) {
    res.status(400).send({
      statusCode : 400,
      message: "Kolom Tidak Boleh Kosong!"
    });
    return;
  }

    //Save User To Database
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const hashedRePassword = bcrypt.hashSync(req.body.rePassword, 8);
    UserDosen.create({
        nip : req.body.nip,
        nama : req.body.nama,
        email : req.body.email,
        noTelepon : req.body.noTelepon,
        password : hashedPassword,
        rePassword : hashedRePassword
        // password : bcrypt.hashSync(req.body.password, 8),
        // rePassword : bcrypt.hashSync(req.body.rePassword, 8 )
    })
    .then(data => {
        if (!req.body.nip || !req.body.nama || !req.body.email || !req.body.noTelepon || !req.body.password || !req.body.rePassword) {
            // console.log("Failed Register: Incomplete data provided");
            return res.status(400).send({
                statusCode : 400,
                message: "Incomplete data provided. Please fill in all required fields."
            });
        } else {
            // console.log("Received registration request:", req.body);
            // console.log("Registration Successful:", data);
            res.status(200).send({
                statusCode : 200,
                message: "Create User Dosen Successful",
                data: {
                    id: data.id,
                    nip: data.nip,
                    nama: data.nama,
                    email : data.email,                            
                    noTelepon: data.noTelepon,
                    password: data.password,
                    rePassword: data.rePassword
                }
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: "Failed to create user. Please try again later.",
            error: err.message || "Some error occurred while creating the User."
        });
    });
}


//Proses Get Data Dosen
exports.findAllUserDosen = (req, res) => {
    const nip = req.query.nip
    const condition = nip? { nip : { [Op.like]: `%${nip}%` } } : null

    UserDosen.findAll( { where : condition } )
        .then(data => {
            const formattedData = data.map(dosen => ({
                id: dosen.id,
                nip: dosen.nip,
                nama: dosen.nama,
                email: dosen.email,
                noTelepon: dosen.noTelepon,
                image: dosen.image
            }));
        
            res.status(200).send({
                statusCode : 200,
                message: "Succes Get User Dosen",
                data: formattedData
            });
            
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message:
                err.message || "Failed Get User Dosen"
            })
        })
}


//Proses GET Data Dosen 
exports.findOneUserDosen = (req, res) => {
    const id = req.params.id;
  
    UserDosen.findByPk( id )
      .then(data => {
        if (data) {
          res.status(200).send({
            statusCode : 200,
            message: "Succes Get User Dosen By Id",
            data: {
                id: data.id,
                nip: data.nip,
                nama: data.nama,
                email: data.email,                   
                noTelepon: data.noTelepon,
                image: data.image
                
            }
          })
        } else {
          res.status(404).send({
            statusCode : 404,
            message: `Cannot find Dosen with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            statusCode : 500,
          message: "Error retrieving Dosen with id=" + id
        });
      });
};


//Proses Edit User Dosen- PUT data Edit User Dosen
exports.updateUserDosen = (req, res) => {
   
    const id = req.params.id;

    UserDosen.update(req.body, {
        where: {
            id: id
        }
    })
    .then(() => {
        // Setelah update, dapatkan data terbaru dengan menggunakan findByPk
        return UserDosen.findByPk(id);
    })
    .then(updatedData => {
        if (!updatedData) {
            return res.status(404).send({
                statusCode : 404,
                message: `User with id=${id} not found after update.`
            });
        }

        res.status(200).send({
            statusCode : 200,
            message: "Update Data User Dosen Succesfull",
            data: {
                id: updatedData.id,
                nip: updatedData.nip,
                nama: updatedData.nama,
                email: updatedData.email,
                noTelepon: updatedData.noTelepon
            }
        });
    })
    .catch(err => {
        res.status(500).send({
            statusCode : 500,
            message: err.message || "Some error occurred while updating the User."
        });
    });
}


// Delete salah satu data User Dosen dengan parameter id
exports.deleteUserDosen = (req, res) => {
  const id = req.params.id;

  UserDosen.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          statusCode : 200,
          message: "User Dosen was deleted successfully!"
        });
      } else {
        res.status(404).send({
          statusCode : 404,
          message: `Cannot delete User Dosen with id=${id}. Maybe User Dosen was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        statusCode : 500,
        message: "Could not delete User Dosen with id=" + id
      });
    });
};