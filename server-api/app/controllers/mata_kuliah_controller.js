const db = require("../models")
const MataKuliah = db.matkul
const ProgramStudi = db.programStudi
const Kelas = db.kelas
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  //membuat data Mata Kuliah
  const mata_kuliah = {
    kodeMatkul: req.body.kodeMatkul,
    mataKuliah: req.body.mataKuliah,
    programStudiId : req.body.programStudiId,
    kelasId : req.body.kelasId
  };

  //Menyimpan data Mata Kuliah kedalam database
  MataKuliah.create(mata_kuliah, { include : ["programStudi, kelas"] } )
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
exports.findAll = (req, res) => {
    const mataKuliah = req.query.mataKuliah
    const condition = mataKuliah? { mataKuliah : { [Op.like]: `%${mataKuliah}%` } } : null

    MataKuliah.findAll({ where : condition})
        .then(data => {
            res.status(200).send({
                statusCode : 200,
                message: "Succes Get Data Mata Kuliah",
                data : data,
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
exports.findOne = (req, res) => {
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
exports.update = (req, res) => {
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
exports.delete = (req, res) => {
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


exports.create = (req, res) => {
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

//membuatd dan menyimpan data kelas ke database
exports.create = (req, res) => {

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
              data : data
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