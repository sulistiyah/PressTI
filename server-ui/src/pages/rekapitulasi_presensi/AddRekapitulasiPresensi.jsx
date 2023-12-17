import React, {useEffect} from 'react'
import Layout from '../Layout'
import FormAddRekapitulasiPresensi from '../../components/rekapitulasi_presensi/FormAddRekapitulasiPresensi.jsx'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const AddRekapitulasiPresensi = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if(isError) {
            navigate("/api/admin/login")
        }
    }, [isError, navigate])
    return (
        <Layout>
            <FormAddRekapitulasiPresensi/>
        </Layout>
    )
}

export default AddRekapitulasiPresensi
