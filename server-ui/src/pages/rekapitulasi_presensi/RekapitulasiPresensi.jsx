import React, {useEffect} from 'react'
import RekapitulasiPresensiList from '../../components/rekapitulasi_presensi/RekapitulasiPresensiList'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const RekapitulasiPresensi = () => {
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
            <RekapitulasiPresensiList/>
        </Layout>
    )
}

export default RekapitulasiPresensi
