import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { X } from 'lucide-react';

import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../EmailVerify.css';
import Container from "react-bootstrap/esm/Container";
import { BASE_URL } from "../services/helper";

const EmailVerify = () => {
    const [params] = useSearchParams();

    const token = params.get('token');
    const userEmail = params.get('email');
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();

    function goToLogin() {
        navigate('/login');
    }

    async function checkEmailVerification() {
        try {

            const res = await axios.get(`${BASE_URL}/${userEmail}/verify/${token}`);

            if (res.data.msg === 'success') {
                setStatus(true);
            }
            else {
                setStatus(false);
            }
        }
        catch (err) {
            setStatus(false);
            console.log(err);
        }
    }

    useEffect(() => {
        checkEmailVerification()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    function onChange(e) {
        setEmail(e.target.value);
    }


    async function reSendEmail(e) {

        e.preventDefault();
        setLoading(true);

        if (dialogRef.current) {
            dialogRef.current.close();
        }

        try {
            const res = await axios.post(`${BASE_URL}/sendEmail`, { email: email });

            // console.log(res.data.msg);

            if (res.data.msg === 'success') {
                setLoading(false);

                toast.info(`Email Has Been Sent To ${email} Please Verify`,
                    { position: 'top-center', autoClose: 5000, style: { marginLeft: '-100px', width: '500px' } });
            }

            else if (res.data.msg === 'Invalid email') {
                setLoading(false);
                toast.error(`Invalid Email`,
                    { position: 'top-center', autoClose: 5000 });
            }

            else if (res.data.msg === 'user not registered') {
                setLoading(false);

                toast.error(`User With  Email: ${email} Is Not Registered`,
                    { position: 'top-center', autoClose: 4000, style: { marginLeft: '-100px', width: '500px' } });
            }

            else if (res.data.msg === 'user already verified') {
                setLoading(false);

                toast.warning(`User With  Email: ${email} Is Alreday Verified Go To Login`,
                    { position: 'top-center', autoClose: 4000, style: { marginLeft: '-100px', width: '500px' } });
            }

            else {
                setLoading(false);
                toast.error(`Email Failed To ${email} Please Try Again`,
                    { position: 'top-center', autoClose: 5000, style: { marginLeft: '-100px', width: '500px' } });
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const dialogRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    // useEffect(() => { reSendEmail() }, []);

    return (
        <div className="main1">
            <ToastContainer />

            {loading ? <><Spinner animation="border" style={{ color: 'green' }} /></> : null}

            <dialog ref={dialogRef} className="w-96 min-h-48 rounded-lg">
                <div className="flex w-full justify-end">
                    <button onClick={closeDialog} className="clsBtn p-1 text-4xl hover:text-gray-700 "><X size={30} strokeWidth={3} /></button>
                </div>

                {loading ? <p>hell</p> : null}

                <form onSubmit={reSendEmail}>
                    <div className="mb-4 mt-1 px-2">
                        <label htmlFor="title" className="block text-lg text-lime-600 font-bold mb-1">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            placeholder='Enter Registered Email'
                            className=" w-full border-2 p-1 rounded-md focus:outline-none focus:border-lime-500"
                        />
                    </div>

                    <div className="mb-6 px-2">
                        <button
                            type="submit"
                            className="bg-lime-600 text-white font-bold py-1 px-4 rounded-md hover:bg-lime-500 focus:outline-none"
                        >
                            Resend
                        </button>
                    </div>
                </form>

            </dialog>

            <Container className="sub">
                {status ? <>
                    <div className="tick w-full flex justify-center">
                        <FaCheckCircle />
                    </div>

                    <div className="text">
                        <p>Your Email Has Been Successfully Verified!</p>
                    </div>

                    <div className="button">
                        <button className="btn btn-primary bg-lime-500 hover:bg-lime-600" onClick={goToLogin}>Continue To Login</button>
                    </div>
                </>
                    :
                    <>
                        <div className="close w-full flex justify-center">
                            <IoIosCloseCircle />
                        </div>

                        <div className="textFails">
                            <p>Your Email Is Not Verified!</p>
                        </div>

                        <div className="d-flex">
                            <div className="button2">
                                <button className="btn btn-primary bg-lime-500 hover:bg-lime-600 " onClick={openDialog}>Resend Email</button>
                            </div>

                            <div className="button2 mx-3">
                                <button className="btn btn-primary bg-lime-500 hover:bg-lime-600" onClick={goToLogin}>Login Now</button>
                            </div>
                        </div>
                    </>
                }

            </Container>
        </div>
    )
}

export default EmailVerify;