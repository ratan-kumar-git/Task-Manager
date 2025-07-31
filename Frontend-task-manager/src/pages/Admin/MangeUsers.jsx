import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'

const MangeUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const getAllUsers = async () => {
    try {
      const response = axiosInstance.get(API_PATH.USERS.GET_ALL_USERS)
      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.error("Error in fetching users: ", error); 
    }
  }
  useEffect(() => {
    getAllUsers()
    return () => {}
  }, [])
  return (
    <DashboardLayout activeMenu={"Team Members"}>
      team 

    </DashboardLayout>
  )
}

export default MangeUsers