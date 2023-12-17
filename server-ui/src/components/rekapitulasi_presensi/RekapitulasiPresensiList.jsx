import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function RekapitulasiPresensi() {

    const [rekapitulasiPresensi, setRekapitulasiPresensi] = useState([])

    useEffect(() => {
        getRekapitulasiPresensi()
    }, [])

    const getRekapitulasiPresensi = async () => {
        try {
            const response = await axios.get('http://34.203.73.249:8080/api/admin/rekapitulasi_presensi');
            console.log('Response:', response.data); // Tambahkan log ini
            setRekapitulasiPresensi(response.data.data || []);
        } catch (error) {
            console.error('Error fetching Rekapitulasi Presensi:', error);
        }
    }

    const deleteRekapitulasiPresensi = async (rekapitulasiPresensiId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if(confirmDelete) {
            await axios.delete(`http://34.203.73.249:8080/api/admin/rekapitulasi_presensi/delete/${rekapitulasiPresensiId}`)
            getRekapitulasiPresensi()
        }
    }

    return (
        <div>
            <h1 className='title'>Rekapitulasi Presensi</h1>
            <h2 className='subtitle'>List Of Rekapitulasi Presensi</h2>
            <Link to={'/api/admin/rekapitulasi_presensi/create'} className='button is-primary mb-2'>Create Rekapitulasi Presensi</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Program Studi</th>
                        <th>Kelas</th>
                        <th>Mata Kuliah</th>
                        <th>Status Presensi</th>
                        <th>Waktu Presensi</th>
                        <th>Tanggal Presensi</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(rekapitulasiPresensi)? (
                        rekapitulasiPresensi.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.id}</td>
                            <td>{data.userMahasiswa ? data.userMahasiswa.nama : 'N/A'}</td>
                            <td>{data.userMahasiswa ? data.userMahasiswa.nim : 'N/A'}</td>
                            <td>{data.programStudi ? data.programStudi.programStudi : 'N/A'}</td>
                            <td>{data.kelas ? data.kelas.kelas : 'N/A'}</td>
                            <td>{data.mataKuliah ? data.mataKuliah.mataKuliah : 'N/A'}</td>
                            <td>{data.statusPresensi}</td>
                            <td>{data.waktuPresensi}</td>
                            <td>{data.tanggalPresensi}</td>
                            <td>
                                <Link to={`/api/admin/rekapitulasi_presensi/update/${data.id}`} className='button is-small is-info'>Update</Link>
                                <button onClick={() => deleteRekapitulasiPresensi(data.id)} className='button is-small is-danger'>Delete</button>
                            </td>
                        </tr>
                    ))): (
                        <tr>
                            <td colSpan="5">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default RekapitulasiPresensi
