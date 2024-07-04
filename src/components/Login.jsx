import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

import { useFormik } from "formik";
import * as Yup from 'yup';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BASE_URL } from "../services/helper";

import earth from '../assets/logo/earth.png'

const notify = (msg) => toast.error(msg, { position: 'top-center', autoClose: 3000, });

const Login = () => {

    const [resend, setResend] = useState(false);

    const { state } = useLocation();
    const prevUrl=state?.prevUrl;

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                    'Email must be valid'
                )
                .required('Email required'),

            password: Yup.string()
                .min(6, 'Password must be atleast 6 characters')
                .required('Password required'),

        }),

        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${BASE_URL}/user/login`, values, { withCredentials: true });

                if (res.data.msg === 'success') {
                     localStorage.setItem('token',res.data.token);
                   
                   if(localStorage.getItem('token'))  goToPrev();
                    // return navigate('/');
                }
                else if (res.data.msg === 'Not verified') {
                    setResend(true);
                    notify('Email Not Verified, Please verify your email');
                }
                else if (res.data.errors.length > 0) {
                    console.log(res.data.errors);
                }
                else {
                    notify('Incorrct username or password!');
                }
            }
            catch (err) {
                if (err.response && err.response.status === 401) {
                    notify('Incorrct username or password!');
                }
                else console.log(err);
            }
        },


    });
    
    function goToPrev() {
        if(prevUrl){
            console.log(prevUrl);
            return navigate(prevUrl);
        }
        else return navigate('/');
    }

    const [visible, setVisible] = useState('password');

    function toggleVis() {
        if (visible === 'password') setVisible('text');
        else setVisible('password');
    }



    return (

        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-lime-200">
             <div className="absolute -top-32 -left-32">
            <img src={earth} width={400} className="z-1"/>
            </div>

            <ToastContainer />
            <Form onSubmit={formik.handleSubmit} className="w-25 z-10 border p-3 rounded-4 mx-auto shadow-lg  mb-5 bg-body rounded" style={{ minWidth: '350px' }} >

            <p className="text-3xl mb-4 text-center text-lime-600 font-bold">Login</p>

                <Form.Group className=" fw-bold" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        isValid={formik.touched.email && !formik.errors.email}
                        isInvalid={formik.touched.email && formik.errors.email}
                        type="text" name="email" placeholder="Enter email" />
                </Form.Group>

                {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                ) : null}

                {formik.touched.email && !formik.errors.email ? (
                    <div className="text-success">Looks good!</div>
                ) : null}


                <Form.Group className="mt-4 fw-bold" controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <div className="d-flex">
                        <Form.Control
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={formik.touched.password && formik.errors.password}
                            type={visible} name="password" placeholder="Password" />
                        <span style={{ fontSize: '25px', marginLeft: '10px' }} onClick={toggleVis}>
                            {visible === 'password' ? <FaEyeSlash className="text-lime-700"/> : <FaEye className="text-lime-700"/>}
                        </span>
                    </div>
                </Form.Group>

                {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger">{formik.errors.password}</span>
                ) : null}

                {formik.touched.password && !formik.errors.password ? (
                    <div className="text-success">Looks good!</div>
                ) : null}

              { resend ?
               <div className="mt-3 mb-3">
                    <a href="/verify" className="text-lime-600" style={{ textDecoration: 'none',}} >Resend Email</a>
                </div> :null
              }
                <div className="mt-2 mb-3">
                    <a href="/signup" className="text-lime-600" style={{ textDecoration: 'none' }} >Don't have an account? Signup now</a>
                </div>

                <Button variant="success" type="submit" className="w-100 mt-2 bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500" style={{  border: 'none' }}>
                    Submit
                </Button>
            </Form>
        </div>
    );

}

export default Login;