import { Field } from "formik";
import React from "react";
import { FaPlane } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";

const Travel = () => {
    return (
        <div className="mt-3 mb-5 ">
            <div className="mb-5">
                <h1 className='text-2xl font-bold text-center mt-6 mb-3'>Travel</h1>
            </div>

            <div className="bg-lime-300 p-1 flex mt-6 pl-2 rounded-md">Flights <FaPlane className="text-2xl ml-2"/></div>

            <div className="mt-2 mb-12 relative border-2 p-3 rounded-lg border-lime-500 ">
                <div>
                    <label>No of short flights taken (0-1000 Kms) </label><br />
                    <Field type="number" placeholder="Enter" min="0" name="srtFlights" onWheel={(e) => e.target.blur()} autoComplete="off" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required={true} /><br />
                </div>
                <div className="mt-2">
                    <label>No of medium flights taken (1001-5000 Kms) </label><br />
                    <Field type="number" placeholder="Enter" min="0" name="medFlights" onWheel={(e) => e.target.blur()} autoComplete="off" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required={true} /><br />
                </div>
                <div className="mt-2">
                    <label>No of long flights taken (more than 5000 Kms) </label><br />
                    <Field type="number" placeholder="Enter" min="0" name="longFlights" onWheel={(e) => e.target.blur()} autoComplete="off" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required={true} /><br />
                </div>
            </div>

            <div className="bg-lime-300 p-1 flex mt-6 pl-2 rounded-md">Trains <FaTrainSubway className="text-2xl ml-2"/></div>

            <div className="mt-2 mb-4 relative border-2 p-3 rounded-lg border-lime-500 ">
                <div>
                    <label>Kms Traveled in train (yearly) </label><br />
                    <Field type="number" placeholder="Enter" min="0" name="train" onWheel={(e) => e.target.blur()} autoComplete="off" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required={true} /><br />
                </div>
            </div>


        </div>
    )
}

export default Travel;