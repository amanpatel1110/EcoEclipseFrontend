import React, { useEffect } from 'react'
import wordcloud from '../assets/logo/wordcloud.jpg'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../services/helper';

import { Form, Formik } from 'formik';

import ElectricityForm from './ElectricityForm'
import Vehicle from './Vehicle';
import Travel from './Travel';
import Plastic from './Plastic';
import Nav from './Nav';

import { useMultistepForm } from '../useMultistepForm'; //custom hook

import { FaHouse } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa6";
import { FaTruckPlane } from "react-icons/fa6";

const Home = () => {

    const navigate = useNavigate();

    // useEffect(()=>{
    //    async function fun(){
    //     try{
    //         const res=await axios.get(`${BASE_URL}/`,{withCredentials:true});
    //         console.log(res.data);
    //     }catch(err){

    //     }
    //    }
    //    fun();
    // },[]);

    const initialValues = {
        gas: 'no',
        noOfGas: '0',
        source: 'electricity',
        kwh: '0',
        noOfVehicle: '0',
        vehicles: [],
        srtFlights: '0',
        medFlights: '0',
        longFlights: '0',
        train: '0',
        noOfBags: '0',
        finish: 'no',
    }
    const onSubmit = async (values) => {

        if (currentStepIndex !== steps.length - 1) {
            next();
        }

        else if (currentStepIndex === steps.length - 1) {

            try {
                const res = await axios.post(`${BASE_URL}/footprint`, values, { withCredentials: true });

                if (res.data.msg === 'success') {
                    navigate('/footprint', { state: { id: res.data.id } })
                }
                else {
                    if (values.gas === 'no') values.noOfGas = 0;
                    if (values.source !== 'electricity') values.kwh = 0;

                    navigate('/footprint', {
                        state: {
                            noOfGas: values.noOfGas,
                            kwh: values.kwh,
                            vehicles: values.vehicles,
                            srtFlights: values.srtFlights,
                            medFlights: values.medFlights,
                            longFlights: values.longFlights,
                            train: values.train,
                            noOfBags: values.noOfBags,
                        }
                    })
                }
            }
            catch (err) {
                console.log(err);
            }

        }
    }


    const { steps, currentStepIndex, step, next, back } = useMultistepForm([
        <ElectricityForm />,
        <Vehicle />,
        <Travel />,
        <Plastic />])

    return (
        <div className='w-full'>
            <Nav />

            <main className='w-full mb-0'>
                <div id="hero" className='w-full mb-0'>
                    <div className='z-5 pt-24 justify-center'>
                        <h1 className='bg-gradient-to-r p-1 from-green-700 to-black text-transparent bg-clip-text md:text-6xl text-4xl text-center font-extrabold'>
                            Transforming Carbon Footprints
                        </h1>
                        <h1 className='bg-gradient-to-r p-1 from-green-700 via-lime-600 to-lime-400 text-transparent bg-clip-text md:text-6xl text-4xl text-center font-extrabold'>
                            into Greenprints
                        </h1>
                    </div>

                    <div className='container mt-10 flex justify-center w-full'>
                        <img className='object-scale-down h-48 md:h-60 lg:h-72' style={{ minWidth: '374px' }} src={wordcloud} alt='Word Cloud' />
                    </div>

                    <div className='flex w-full  justify-center mt-14 space-x-6' >
                        <a href='#formSection' className='transition ease-in-out delay-150 hover:transform hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-none drop-shadow-custom-login rounded-lg p-2 bg-lime-500 font-medium flex items-center'>
                            <button className='text-lime-900 font-bold text-xl'>Calculate Footprint</button>
                        </a>

                        <a href='#' className='transition ease-in-out delay-150 hover:transform hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-none drop-shadow-custom-login rounded-lg p-2 bg-lime-400 font-medium flex items-center'>
                            <button className='text-lime-900 font-bold text-xl'>Learn More</button>
                        </a>
                    </div>

                </div>

                <div id='formSection' className='w-full mt-12'>
                    <div className='container w-full flex justify-center'>
                        <p className='text-md font-semibold text-center' style={{ maxWidth: '700px', minWidth: '350px' }}>
                            Use our carbon footprint calculator to estimate your environmental impact and discover ways to reduce it. Together, we can make a difference in the fight against climate change!
                        </p>
                    </div>

                    <div className='flex w-full justify-center mb-16 mt-14 p-2'>
                        <div className='w-96 sm:w-128 border-2 rounded-xl flex'>
                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                <Form className='pl-4 sm:pl-6 w-full flex flex-col'>
                                    <div>
                                        <h1 className='text-center text-3xl mt-4 mb-8 text-lime-600 font-bold'>Carbon Footprint Calculator</h1>
                                    </div>
                                    <div className='flex  text-3xl'>
                                        {1 <= currentStepIndex + 1 ? <FaHouse className='text-lime-600 m-auto' /> : <FaHouse className='text-gray-500 m-auto' />}
                                        {1 < currentStepIndex + 1 ? <span className="relative w-10 sm:w-20 h-1 mx-1 mt-3 bg-lime-500 transition ease-in-out duration-200 delay-300"></span> : <span className="relative w-12 sm:w-20 h-1 mt-3 mx-1 bg-gray-500 transition ease-in-out duration-200 delay-300"></span>}

                                        {2 <= currentStepIndex + 1 ? <FaCarSide className='text-lime-600 m-auto transition ease-in-out duration-100 delay-300' /> : <FaCarSide className='text-gray-500 m-auto transition ease-in-out duration-100 delay-300' />}
                                        {2 < currentStepIndex + 1 ? <span className="relative w-10 sm:w-20 h-1 mx-1 mt-3 bg-lime-500 transition ease-in-out duration-200 delay-300"></span> : <span className="relative w-12 mx-1 sm:w-20 h-1 mt-3  bg-gray-500 transition ease-in-out duration-200 delay-300"></span>}

                                        {3 <= currentStepIndex + 1 ? <FaTruckPlane className='text-lime-600  m-auto transition ease-in-out duration-100 delay-300' /> : <FaTruckPlane className='text-gray-500 m-auto transition ease-in-out duration-100 delay-300' />}
                                        {3 < currentStepIndex + 1 ? <span className="relative w-10 sm:w-20 mx-1 h-1 mt-3 bg-lime-500 transition ease-in-out duration-200 delay-300"></span> : <span className="relative w-12 mx-1 sm:w-20 h-1 mt-3  bg-gray-500 transition ease-in-out duration-200 delay-300"></span>}

                                        {4 <= currentStepIndex + 1 ? <FaHouse className='text-lime-600 m-auto transition ease-in-out duration-100 delay-300' /> : <FaHouse className='text-gray-500 m-auto transition ease-in-out duration-100 delay-300' />}
                                    </div>

                                    {step}

                                    <div className='flex justify-end pb-4 px-4 w-full'>
                                        {currentStepIndex !== 0 && <button type='button' onClick={back} className=' px-3 py-2 w-20 text-md font-semibold text-center text-white bg-lime-600 rounded-lg'>
                                            Back</button>}

                                        <button type='submit' className='ml-3 px-3 py-2 w-20 text-md font-semibold text-center text-white bg-lime-600 rounded-lg'>
                                            {currentStepIndex !== steps.length - 1 ? 'Next' : 'Finish'} </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Home;