module.exports = (sequelizeDB, Sequelize) => {
    const Face = sequelizeDB.define("face", {
      // label: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      image : {
        type: Sequelize.BLOB
      }
      //  image: {
      //   type: Sequelize.BLOB("long"),
      //   allowNull: false,
      // },
    }, {
        tableName : "face"
    })
  
    return Face;
  };  