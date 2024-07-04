import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../services/helper";

const Profile = () => {

    const [houseCo2e, sethouseCo2e] = useState([]);
    const [vehicleCo2e, setvehicleCo2e] = useState([]);
    const [travelCo2e, settravelCo2e] = useState([]);
    const [plasticCo2e, setplasticCo2e] = useState([]);
    const [date, setDate] = useState([]);
    const [total, setTotal] = useState([]);

    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');

    let data = '';

    // const getData = async () => {

    //     try {
    //         const res = await axios.get(`${BASE_URL}/footprint`, { withCredentials: true });
    //         data = await res.data.fp;
    //         if (res.data.msg === 'success') {
    //             setUname(res.data.userName);
    //             setEmail(res.data.email);
    //         }
    //     }
    //     catch (err) {
    //         console.log('error in getData', err);
    //     }

    //     const newHouseCo2e = [];
    //     const newTravelCo2e = [];
    //     const newPlasticCo2e = [];
    //     const newVehicleCo2e = [];
    //     const newTotal = [];
    //     const newDate = [];

    //     {
    //         uname &&
    //             data.forEach((ele, i) => {

    //                 if (ele.length != 0) {

    //                     const kwh = ele.kwh || 0;
    //                     const lpg = ele.noOfGas || 0;
    //                     const newCo2eValue = (kwh * 0.93 + lpg * 41.88);

    //                     newHouseCo2e.push(newCo2eValue);

    //                     let totalVehicleCo2e = 0;

    //                     if (ele.vehicles) {
    //                         ele.vehicles.forEach(element => {
    //                             if (element.type === 'petrol') {
    //                                 totalVehicleCo2e += (element.kms / element.mileage) * 2.27;
    //                             } else if (element.type === 'diesel') {
    //                                 totalVehicleCo2e += (element.kms / element.mileage) * 2.64;
    //                             } else if (element.type === 'cng') {
    //                                 totalVehicleCo2e += (element.kms / element.mileage) * 2.69;
    //                             } else {
    //                                 totalVehicleCo2e += 0;
    //                             }
    //                         });
    //                     }
    //                     newVehicleCo2e.push(totalVehicleCo2e)

    //                     const srtFlights = ele.srtFlights || 0;
    //                     const medFlights = ele.medFlights || 0;
    //                     const longFlights = ele.medFlights || 0;
    //                     const train = ele.train || 0;

    //                     newTravelCo2e.push(srtFlights * 92 + medFlights * 345 + longFlights * 747.5 + train * 0.0115);

    //                     const bags = ele.noOfBags;
    //                     newPlasticCo2e.push(bags * 0.2);

    //                     newDate.push((new Date(ele.createdAt).toString()).substring(4, 16));
    //                     newTotal.push((newHouseCo2e[i] + newVehicleCo2e[i] + newTravelCo2e[i] + newPlasticCo2e[i]));
    //                 }
    //             });

    //         sethouseCo2e(newHouseCo2e);
    //         settravelCo2e(newTravelCo2e);
    //         setplasticCo2e(newPlasticCo2e);
    //         setvehicleCo2e(newVehicleCo2e);
    //         setDate(newDate);
    //         setTotal(newTotal);
    //     }
    // }
    // useEffect(() => {
    //     getData();
    // }, [])

    const processFootprintData = (data) => {
        const newHouseCo2e = [];
        const newTravelCo2e = [];
        const newPlasticCo2e = [];
        const newVehicleCo2e = [];
        const newTotal = [];
        const newDate = [];

        data.forEach((ele) => {
            if (ele.length !== 0) {
                const kwh = ele.kwh || 0;
                const lpg = ele.noOfGas || 0;
                const newCo2eValue = (kwh * 0.93 + lpg * 41.88);
                newHouseCo2e.push(newCo2eValue);

                let totalVehicleCo2e = 0;
                if (ele.vehicles) {
                    ele.vehicles.forEach((element) => {
                        if (element.type === 'petrol') {
                            totalVehicleCo2e += (element.kms / element.mileage) * 2.27;
                        } else if (element.type === 'diesel') {
                            totalVehicleCo2e += (element.kms / element.mileage) * 2.64;
                        } else if (element.type === 'cng') {
                            totalVehicleCo2e += (element.kms / element.mileage) * 2.69;
                        } else {
                            totalVehicleCo2e += 0;
                        }
                    });
                }
                newVehicleCo2e.push(totalVehicleCo2e);

                const srtFlights = ele.srtFlights || 0;
                const medFlights = ele.medFlights || 0;
                const longFlights = ele.longFlights || 0;
                const train = ele.train || 0;
                newTravelCo2e.push(srtFlights * 92 + medFlights * 345 + longFlights * 747.5 + train * 0.0115);

                const bags = ele.noOfBags;
                newPlasticCo2e.push(bags * 0.2);

                newDate.push((new Date(ele.createdAt).toString()).substring(4, 16));
                newTotal.push((newCo2eValue + totalVehicleCo2e + newTravelCo2e[newTravelCo2e.length - 1] + newPlasticCo2e[newPlasticCo2e.length - 1]));
            }
        });

        sethouseCo2e(newHouseCo2e);
        settravelCo2e(newTravelCo2e);
        setplasticCo2e(newPlasticCo2e);
        setvehicleCo2e(newVehicleCo2e);
        setDate(newDate);
        setTotal(newTotal);
    };

    const getData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/footprint`, { withCredentials: true });
            const data = res.data.fp;

            if (res.data.msg === 'success') {
                setUname(res.data.userName);
                setEmail(res.data.email);
                processFootprintData(data);
            }
        } catch (err) {
            console.log('error in getData', err);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Nav />
            <div className="mt-20">
                <div className="flex  ml-14 mt-24 text-2xl">
                    <FaUserCircle className="mr-4  text-3xl" /> <h2 className="text-center">{uname}</h2>
                </div>

                <div className="flex  ml-14 mt-2 text-2xl">
                    <MdEmail className="mr-4 text-3xl" /> <h2 className="">{email}</h2>
                </div>

                <h1 className="text-center mt-10 text-3xl text-lime-600 font-bold">Your Carbon Footprints History</h1>

                <div className="mt-6 p-2 w-full h-128 flex justify-center">
                    <div className="overflow-x-auto">
                        <div className="shadow-md">
                            <table className=" text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700  bg-gray-50  ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            House Energy <br /> <span className="text-xs text-gray-500">Kg&nbsp;Co2e</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Vehicles<br /> <span className="text-xs text-gray-500">Kg&nbsp;Co2e</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Transport<br /> <span className="text-xs text-gray-500">Kg&nbsp;Co2e</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Plastic Bags<br /> <span className="text-xs text-gray-500">Kg&nbsp;Co2e</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total<br /> <span className="text-xs text-gray-500">Kg&nbsp;Co2e</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        total.map((ele, i) => (
                                            <tr key={i} className="odd:bg-white  even:bg-gray-50  border-b da0">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {date[i]}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {houseCo2e[i] !== undefined ? houseCo2e[i].toFixed(2) : ''}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {vehicleCo2e[i] !== undefined ? vehicleCo2e[i].toFixed(2) : ''}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {travelCo2e[i] !== undefined ? travelCo2e[i].toFixed(2) : ''}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {plasticCo2e[i] !== undefined ? plasticCo2e[i].toFixed(2) : ''}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {total[i] !== undefined ? total[i].toFixed(2) : ''}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;