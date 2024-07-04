import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { BASE_URL } from "../services/helper";

import earth from '../assets/logo/earth.png'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Oval } from 'react-loader-spinner'


const Signup = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [visible, setVisible] = useState('password');

    function toggleVis() {
        if (visible === 'password') setVisible('text');
        else setVisible('password');
    }

    function goToLogin() {
        navigate('/login');
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },

        validationSchema: Yup.object({

            username: Yup.string()
                .matches(
                    /^[a-zA-Z]{3,}[a-zA-Z0-9_]*$/,
                    'Username must contain at least 3 letters, followed by 0 or more letters, digits, or underscores, and no other special characters'
                )
                .required('Username is required'),

            email: Yup.string()
                // .email('Invalid email address')
                .matches(/^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                    'Valid Email is required'
                )
                .required('Email is required'),

            password: Yup.string()
                .min(6, 'Password must be at least 6 characters long')
                .required('Password is required')
        }),

        onSubmit: async (values) => {

            try {
                setLoading(true);
                const res = await axios.post(`${BASE_URL}/user/signup`, values);

                if (res.data.msg === 'success') {
                    setLoading(false);
                    toast.info('Please Verify Your Email Address ', { position: 'top-center',autoClose:3000,});

                    setTimeout(() => {
                        goToLogin();
                    }, 4000);
                }
                else if (res.data.msg === 'user already exisist') {
                    setLoading(false);
                    toast.error("User with this email id already exisits!", { position: 'top-center', autoClose: 3000, });
                }


            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
    });


    return (

        <div className="d-flex relative align-items-center  justify-content-cente min-vh-100 bg-lime-200">
            <div className="absolute -top-32 -left-32">
            <img src={earth} width={400} className="z-0"/>
            </div>
            <ToastContainer/>

            {loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                        <Oval
                            visible={true}
                            height="50"
                            width="50"
                            color="#4d7c0f"
                            secondaryColor="#d9f99d"
                            ariaLabel="oval-loading"
                            strokeWidth="5"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                )}

            <Form style={{minWidth: '350px', }} onSubmit={formik.handleSubmit} className="w-25 z-10 border p-3 rounded-4 mx-auto shadow-lg  mb-5 bg-body rounded" >
                
                <p className="text-3xl mb-4 text-center text-lime-600 font-bold">SignUp</p>
                
                <Form.Group className="fw-bold">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} id="uname" name="username" placeholder="Enter name"
                        required
                        isValid={formik.touched.username && !formik.errors.username}
                        isInvalid={formik.touched.username && formik.errors.username} />
                </Form.Group>

                {formik.touched.username && formik.errors.username ? (
                    <span className="text-danger">{formik.errors.username}</span>
                ) : null}

                {formik.touched.username && !formik.errors.username ? (
                    <div className="text-success">Looks good!</div>
                ) : null}

                <Form.Group className="mt-4 fw-bold" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={formik.values.email} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} type="text" name="email" placeholder="Enter email"
                        id="email"
                        required
                        isValid={formik.touched.email && !formik.errors.email}
                        isInvalid={formik.touched.email && formik.errors.email} />
                </Form.Group>

                {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                ) : null}

                {formik.touched.email && !formik.errors.email ? (
                    <div className="text-success">Looks good!</div>
                ) : null}

                <Form.Group className="mt-4  fw-bold" >
                    <Form.Label >Password</Form.Label>
                    <div className="d-flex">
                        <Form.Control type={visible}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password" placeholder="Password" id="password"
                            required
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={formik.touched.password && formik.errors.password}
                        /><span style={{ fontSize: '25px', marginLeft: '10px' }} onClick={toggleVis}>
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


                <div className="mt-4 mb-3">
                    <a href="/login" className="text-lime-600" style={{ textDecoration: 'none' }} >Already have an account? Login Now</a>
                </div>

                <Button variant="success" type="submit" className="w-100 mt-2 bg-lime-600 hover:bg-lime-500 focus:bg-lime-500 active:bg-lime-500" style={{ border: 'none' }}>
                    Submit
                </Button>
            </Form>
        </div >
    );

}

export default Signup;