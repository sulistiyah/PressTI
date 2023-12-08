import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { IoSchool, IoPeople, IoBook, IoPerson, IoSettings, IoDocumentText, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset } from '../features/authSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {admin} = useSelector(
        (state) => state.auth
    )

    const logout = () => {
        // dispatch(LogOut())
        dispatch(reset())
        navigate('/api/admin/login')
    }

    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label"> General </p>
                    <ul className="menu-list">
                        <li>
                            <NavLink to={"/api/admin/dashboard"}> 
                            <IoHome/>
                                Dashboard
                            </NavLink>
                        </li>
                    </ul>
                <p className="menu-label"> Administrator </p>
                    <ul className="menu-list">
                        <li>
                            <NavLink to={"/api/admin/program_studi"}>
                            <IoSchool/>
                                Program Studi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/kelas"}>
                            <IoPeople/>
                                Kelas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/mata_kuliah"}>
                            <IoBook/>
                                Mata Kuliah
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/user_mahasiswa"}>
                            <IoPerson/>
                                User Mahasiswa
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/user_dosen"}>
                            <IoPerson/>
                                User Dosen
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/set_presensi"}>
                            <IoSettings/>
                                Set Presensi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/api/admin/rekapitulasi_presensi"}>
                            <IoDocumentText/>
                                Rekapitulasi Presensi
                            </NavLink>
                        </li>
                    </ul>
                <p className="menu-label"> Settings </p>
                    <ul className="menu-list">
                        <li>
                            <button onClick={logout} className='button is-white'>
                            <IoLogOut/>
                                Logout
                            </button>
                        </li>
                    </ul>
            </aside>
        </div>
    )
}

export default Sidebar
