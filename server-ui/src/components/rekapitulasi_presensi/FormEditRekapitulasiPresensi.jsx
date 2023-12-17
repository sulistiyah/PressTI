import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function FormEditRekapitulasiPresensi() {
    const [statusPresensi, setStatusPresensi] = useState('')
    const [tanggalPresensi, setTanggalPresensi] = useState('')
    const [waktuPresensi, setwaktuPresensi] = useState('')
    const [setPresensi, setSetPresensi] = useState('')
    const [setPresensiList, setSetPresensiList] = useState([]);
    const [userMahasiswa, setUserMahasiswa] = useState('')
    const [userMahasiswaList, setUserMahasiswaList] = useState([]);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const getRekapitulasiPresensiId = async() => {
            try {
                const response = await axios.get(`http://34.203.73.249:8080/api/admin/rekapitulasi_presensi/${id}`)
                setStatusPresensi(response.data.data.statusPresensi)
                setTanggalPresensi(response.data.data.tanggalPresensi)
                setwaktuPresensi(response.data.data.waktuPresensi)
                
                const getSetPresensi = await axios.get('http://34.203.73.249:8080/api/admin/set_presensi')
                setPresensiList(getSetPresensi.data.data)
                setPresensi(getSetPresensi.data.data.programStudi)
                setPresensi(getSetPresensi.data.data.kelas)
                setPresensi(getSetPresensi.data.data.mataKuliah)

                const getUserMahasiswa = await axios.get('http://34.203.73.249:8080/api/admin/user_mahasiswa')
                setUserMahasiswaList(getUserMahasiswa.data.data)
                setUserMahasiswa(getUserMahasiswa.data.data.nama)
                setUserMahasiswa(getUserMahasiswa.data.data.nim)
            }catch (error) {
                if(error.response) {
                    console.log(error.response.data.message)
                    setMessage(error.response.data.message)
                }
            }
        }
        getRekapitulasiPresensiId()
    }, [id])

    const updateRekapitulasiPresensi = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://34.203.73.249:8080/api/admin/rekaitulasi_presensi/update/${id}`, {
                statusPresensi : statusPresensi,
                tanggalPresensi : tanggalPresensi,
                waktuPresensi : waktuPresensi,
                setPresensiId : setPresensi,
                userMahasiswaId : userMahasiswa
                
            })
            
            navigate("/api/admin/rekapitulasi_presensi")
            console.log({
                statusPresensi : statusPresensi,
                tanggalPresensi : tanggalPresensi,
                waktuPresensi : waktuPresensi,
                setPresensiId : setPresensi,
                userMahasiswaId : userMahasiswa
            });
        }catch (error) { 
            if(error.response) {
                console.log(error.response.data.message)
                setMessage(error.response.data.message)
            }
        }
    }

    const inputStyle = {
        width: '100%',
        height: '2.5rem',
        borderColor: '#000000',
        borderRadius: '5px',
        backgroundColor: '#f8f8f8',
        color: '#000000',
        fontFamily: 'Time New Roman',
        fontSize: '16px'
    }

    return (
        <div>
            <h1 className='title'>Rekapitulasi Presensi</h1>
            <h2 className='subtitle'>Update Rekapitulasi Presensi</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={updateRekapitulasiPresensi}>
                            <p className='has-text-centered'>{message}</p>
                            <div className='field'>
                                <label className='label'>Status Presensi</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={statusPresensi}
                                        onChange={(e) => setStatusPresensi(e.target.value)}
                                        placeholder='Status Presensi'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Tanggal Presensi</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={tanggalPresensi}
                                        onChange={(e) => setTanggalPresensi(e.target.value)}
                                        placeholder='Tanggal Presensi'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Waktu Presensi</label>
                                <div className='control'>
                                        <input 
                                        type='text' 
                                        className='input' 
                                        value={waktuPresensi}
                                        onChange={(e) => setwaktuPresensi(e.target.value)}
                                        placeholder='Waktu Presensi'
                                        style={inputStyle}/>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Set Presensi</label>
                                <div className='control'>
                                    <select
                                        className='select'
                                        value={setPresensi}
                                        onChange={(e) => setSetPresensi(e.target.value)}
                                        style={inputStyle}>
                                        {setPresensiList.map((presensi) => (
                                        <option key={presensi.id} value={presensi.id}>
                                            {presensi.programStudi + ' - ' + presensi.kelas + ' - ' + presensi.mataKuliah}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>    
                            <div className='field'>
                                <label className='label'>User Mahasiswa</label>
                                <div className='control'>
                                    <select
                                        className='select'
                                        value={userMahasiswa}
                                        onChange={(e) => setUserMahasiswa(e.target.value)}
                                        style={inputStyle}>
                                        {userMahasiswaList.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.nim + ' - ' + user.nama}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>    
                            <div className='field'>
                                <div className='control'>
                                    <button type='submit' className="button is-success" >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditRekapitulasiPresensi
