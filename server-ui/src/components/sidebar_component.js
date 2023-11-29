import React from "react";

import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div  className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
            <div>
                {/* <a href="d-flex align-items-center"> */}
                <a>
                    <i className="bi bi-file-earmark fs-5 me-2"></i>
                    <span className="fs-4">Menu</span>
                </a>
                <hr className="text-secondary mt-2"/>
                <ul className="nav nav-pills flex-column p-0 m-0">
                    <li className="nav-item p-1">
                        <Link to = "/program_studi" className="nav-link text-white">
                            <i className="bi bi-mortarboard me-2 fs-5">
                                <span className="fs-5"> Program Studi</span>
                            </i>
                        </Link>
                    </li>
                    <li className="nav-item p-1">
                        <Link to = "/kelas" className="nav-link text-white">
                            <i className="bi bi-briefcase me-2 fs-5">
                                <span className="fs-5"> Kelas</span>
                            </i>
                        </Link>
                    </li>
                    <li className="nav-item p-1">
                        <Link to = "/mata_kuliah" className="nav-link text-white">
                            <i className="bi bi-book me-3 fs-5">
                                <span className="fs-5"> Mata Kuliah</span>
                            </i>
                        </Link>
                    </li>
                    <li className="nav-item p-1">
                        <Link to = "/user" className="nav-link text-white">
                            <i className="bi bi-person me-2 fs-5">
                                <span className="fs-5"> User</span>
                            </i>
                        </Link>
                    </li>
                    <li className="nav-item p-1">
                        <Link to = "/presensi" className="nav-link text-white">
                            <i className="bi bi-clipboard-data me-2 fs-5">
                                <span className="fs-5"> Presensi</span>
                            </i>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <hr className="text-secondary"/>
                <i className="bi bi-person fs-5"></i>
                <span className="fs-4"> Administrator</span>
            </div>
        </div>
        
    )
}

export default Sidebar
