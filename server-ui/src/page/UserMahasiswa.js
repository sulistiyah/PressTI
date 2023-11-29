import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'



function UserMahasiswa() {
    const [mahasiswa, setMahasiswa] = useState([])

    useEffect( () => {
        getMahasiswaAll()
    }, [])

    const getMahasiswaAll = async () => {
        const response = await axios.get('http://localhost:8080/api/mahasiswa/my_profile')
        setMahasiswa(response.data)
        setMahasiswa.log(response.data)
    }
    

    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>No Telepon</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswa.map((mhs, index) => (
                                <tr key = {mhs.id}>
                                    <td>{index + 1}</td>
                                    <td>{mhs.nim}</td>
                                    <td>{mhs.nama}</td>
                                    <td>{mhs.noTelepon}</td>
                                    <td>
                                        <Link className = "btn bg-primary" to = {`update/${mhs.id}`}>Update</Link>
                                        <Link className = "btn bg-danger">Delete</Link>
                                    </td>
                                </tr>
                            ))}
                           
                        </tbody>

                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default UserMahasiswa;
