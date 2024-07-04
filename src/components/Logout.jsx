import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";

import { UserContext } from '../UserContext';

const Logout = () => {
    const navigate = useNavigate();
    const {role,setRole} = useContext(UserContext);

    async function log() {

        const res = await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });

        if (res.data.msg === 'success') {
            localStorage.removeItem('token');
            setRole(null);
            navigate('/');
        }
    }
    log();

    return (
        <h1>logging out......</h1>
    )
}

export default Logout;