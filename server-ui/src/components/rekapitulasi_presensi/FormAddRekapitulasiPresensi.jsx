import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FormAddRekapitulasiPresensi() {

    const [statusPresensi, setStatusPresensi] = useState('')
    const [tanggalPresensi, setTanggalPresensi] = useState('')
    const [waktuPresensi, setwaktuPresensi] = useState('')
    const [setPresensiId, setSetPresensiId] = useState('')
    const [setPresensiList, setSetPresensiList] = useState([]);
    const [userMahasiswaId, setUserMahasiswaId] = useState('')
    const [userMahasiswaList, setUserMahasiswaList] = useState([]);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for  Set Presensi
                const responseSetPresensi = await axios.get('http://34.203.73.249:8080/api/admin/set_presensi');
                setSetPresensiList(responseSetPresensi.data.data);
    
                // Fetch data for User Mahasiswa
                const responseUserMahasiswa = await axios.get('http://34.203.73.249:8080/api/admin/user_mahasiswa');
                setUserMahasiswaList(responseUserMahasiswa.data.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                    setMessage(error.response.data.message);
                }
            }
        };
    
        fetchData();
    }, []);

    const saveRekapitulasiPresensi = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://34.203.73.249:8080/api/admin/rekapitulasi_presensi/create', {
                statusPresensi : statusPresensi,
                tanggalPresensi : tanggalPresensi,
                waktuPresensi : waktuPresensi,
                setPresensiId : setPresensiId,
                userMahasiswaId : userMahasiswaId
            })
            
            navigate("/api/admin/rekapitulasi_presensi")
            console.log({
                statusPresensi : statusPresensi,
                tanggalPresensi : tanggalPresensi,
                waktuPresensi : waktuPresensi,
                setPresensiId : setPresensiId,
                userMahasiswaId : userMahasiswaId
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
            <h2 className='subtitle'>Create Rekapitulasi Presensi</h2>
            <div className='card is-shadowless'>
                <div className='card-content'>
                    <div className='content'>
                        <form onSubmit={saveRekapitulasiPresensi}>
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
                                        value={setPresensiId}
                                        onChange={(e) => setSetPresensiId(e.target.value)}
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
                                        value={userMahasiswaId}
                                        onChange={(e) => setUserMahasiswaId(e.target.value)}
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
                                        Save
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

export default FormAddRekapitulasiPresensi
