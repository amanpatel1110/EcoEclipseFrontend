import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import earth from '../assets/logo/earth.png'
import { BASE_URL } from '../services/helper';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner'

function ContactUs() {

    const [formData, setFormData] = useState({
        uname: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { uname, email, message } = formData;
        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/contactus`, { uname, email, message, }, { withCredentials: true });
           
            if (res.data.msg === 'success') {
                setFormData({ uname: '', email: '', message: '' });
                setLoading(false);
                toast.success('Your message has been recived', { position: 'top-center', autoClose: 3000, });
            }
            else{
                setLoading(false);
                toast.error('Your message has not been recived, Try Again Later else', { position: 'top-center', autoClose: 3000, });
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error('Your message has not been recived, Try Again Later', { position: 'top-center', autoClose: 3000, });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (

        <div>
            <Nav />
            <div className='mt-12'>

                <ToastContainer />
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
                <div className="d-flex align-items-center justify-content-center min-vh-100 bg-lime-200">
                    <div className="absolute -top-32 -left-32">
                        <img src={earth} width={400} className="z-0" />
                    </div>

                    <div className='p-4 z-10 w-full'>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-128 z-10 mx-auto bg-white p-6 rounded-lg shadow-lg"
                            style={{ minWidth: '350px' }}
                        >
                            <p className="text-3xl mb-6 text-center text-lime-600 font-bold">Contact Us</p>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-lg font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="uname"
                                    value={formData.uname}
                                    onChange={handleChange}
                                    required
                                    placeholder='Enter Name'
                                    className="w-full border-2 px-3 py-2 rounded-md focus:outline-none focus:border-lime-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-lg font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    required
                                    onChange={handleChange}
                                    placeholder='Enter Email'
                                    className="w-full border-2 px-3 py-2 rounded-md focus:outline-none focus:border-lime-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-lg font-bold mb-2">Message:</label>
                                <textarea
                                    name="message"
                                    placeholder='Enter Message'
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border-2 px-3 py-2 rounded-md focus:outline-none focus:border-lime-500"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-lime-600 text-white font-bold py-2 px-4 rounded-md hover:bg-lime-700 focus:outline-none"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ContactUs;
