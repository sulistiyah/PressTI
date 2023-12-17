module.exports = (sequelizeDB, Sequelize) => {
    const Kehadiran = sequelizeDB.define("kehadiran", {
    statusPresensi: {
        type: Sequelize.STRING(30)
    },
    tanggalPresensi: {
        type: Sequelize.DATE
    },
    waktuPresensi: {
        type: Sequelize.TIME
    }
    }, {
        tableName : "kehadiran",
        timestamps : false
        
    })

    return Kehadiran;
};  