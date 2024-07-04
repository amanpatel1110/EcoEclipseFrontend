import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { useNavigate } from "react-router-dom";


const Footprint = () => {
    const { state } = useLocation();
    const id = state?.id;

    const navigate = useNavigate();

    const [houseCo2e, sethouseCo2e] = useState(0);
    const [vehicleCo2e, setvehicleCo2e] = useState(0);
    const [travelCo2e, settravelCo2e] = useState(0);
    const [plasticCo2e, setplasticCo2e] = useState(0);
    const [total, setTotal] = useState(0);

    let data = '';
    useEffect(() => {
        const getData = async () => {

            if (id) {
                try {
                    const res = await axios.get(`${BASE_URL}/footprint/${id}`, { withCredentials: true });
                    data = await res.data.fp;
                    console.log('data', data);
                }
                catch (err) {
                    console.log('error in getData', err);
                }
            }
            else {
                const noOfGas = state?.noOfGas;
                const kwh = state?.kwh;
                const vehicles = state?.vehicles;
                const srtFlights = state?.srtFlights;
                const medFlights = state?.medFlights;
                const longFlights = state?.longFlights;
                const train = state?.train;
                const noOfBags = state?.noOfBags;

                data = {
                    noOfGas,
                    kwh,
                    vehicles,
                    srtFlights,
                    medFlights,
                    longFlights,
                    train,
                    noOfBags,
                };
            }

            if (data.length != 0) {
                console.log(data);

                if (data.kwh || data.noOfGas) {
                    const kwh = data.kwh;
                    const lpg = data.noOfGas;

                    sethouseCo2e((kwh * 0.93 + lpg * 41.88));
                }
                else sethouseCo2e(0);

                let totalCo2e = 0;

                if (data.vehicles) {
                    data.vehicles.forEach(element => {
                        if (element.type === 'petrol') {
                            totalCo2e += (element.kms / element.mileage) * 2.27;
                        } else if (element.type === 'diesel') {
                            totalCo2e += (element.kms / element.mileage) * 2.64;
                        } else if (element.type === 'cng') {
                            totalCo2e += (element.kms / element.mileage) * 2.69;
                        } else {
                            totalCo2e += 0;
                        }
                    });
                }

                setvehicleCo2e(totalCo2e);

                if (data.srtFlights || data.medFlights || data.medFlights || data.train) {

                    const srtFlights = data.srtFlights;
                    const medFlights = data.medFlights;
                    const longFlights = data.medFlights;
                    const train = data.train;

                    settravelCo2e(srtFlights * 92 + medFlights * 345 + longFlights * 747.5 + train * 0.0115);
                }
                else settravelCo2e(0);

                if (data.noOfBags) {
                    const bags = data.noOfBags;
                    setplasticCo2e(bags * 0.2);
                }
                else setplasticCo2e(0);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        setTotal(houseCo2e + vehicleCo2e + travelCo2e + plasticCo2e);
    }, [houseCo2e, vehicleCo2e, travelCo2e, plasticCo2e]);

    const location = useLocation();
    function navigateToSetGoals() {

        //context api for user but as of now local storage
        const token = localStorage.getItem('token');
        // console.log( location.pathname);
        if (!token) {
            return navigate('/login', { state: { prevUrl: location.pathname } });
        }
        else {
            return navigate('/goals')
        }
    }

    return (
        <div >
            <Nav />
            <p className="text-center text-4xl font-bold text-lime-600 pt-24">Your Carbon Footprint</p>
            <div className="flex flex-wrap mt-4 justify-center align-middle mx-4">

                <div className="relative w-64 h-48 mt-10 mx-6 bg-gradient-to-r from-green-700 via-lime-600 to-lime-400 shadow-md rounded-2xl">
                    <div className="p-2 ">
                        <p className="text-center text-2xl  text-white font-bold">House Energy</p>
                        <p className="text-4xl text-center font-bold mt-6">{houseCo2e.toFixed(2)}</p>
                        <p className="text-xl text-center font-bold mt-1">Kg CO<sub>2</sub>e</p>
                    </div>
                </div>

                <div className="w-64 h-48 mt-10 mx-6 bg-gradient-to-r from-green-700 via-lime-600 to-lime-400 shadow-md  rounded-2xl">
                    <div className="p-2">
                        <p className="text-center text-2xl text-white font-bold">Vehicle</p>
                        <p className="text-4xl text-center font-bold mt-6">{vehicleCo2e.toFixed(2)}</p>
                        <p className="text-xl text-center font-bold mt-1">Kg CO<sub>2</sub>e</p>
                    </div>
                </div>

                <div className="w-64 h-48 mt-10 mx-6 bg-gradient-to-r from-green-700 via-lime-600 to-lime-400 shadow-md rounded-2xl">
                    <div className="p-2">
                        <p className="text-center text-2xl text-white font-bold">Travel</p>
                        <p className="text-4xl text-center font-bold mt-6">{travelCo2e.toFixed(2)}</p>
                        <p className="text-xl text-center font-bold mt-1">Kg CO<sub>2</sub>e</p>
                    </div>
                </div>

                <div className="w-64 h-48 mt-10 mx-6 bg-gradient-to-r from-green-700 via-lime-600 to-lime-400  shadow-md rounded-2xl">
                    <div className="p-2">
                        <p className="text-center text-2xl text-white font-bold">Plastic</p>
                        <p className="text-4xl text-center font-bold mt-6">{plasticCo2e.toFixed(2)}</p>
                        <p className="text-xl text-center font-bold mt-1">Kg CO<sub>2</sub>e</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center px-2">
                <div className="w-128 bg-slate-200 rounded-2xl  mt-10">
                    <p className="text-center text-2xl font-bold pt-4">Total Carbon Footprint</p>
                    <div className="text-center text-2xl pb-4 pt-1 font-bold ">
                        <p className="font-extrabold text-4xl">{total.toFixed(3)} </p>
                        <p>Kg CO<sub>2</sub>e</p>
                    </div>
                    <p className="text-center pb-2">NOTE: This calculation not include footprint due to Food</p>
                </div>
            </div>

            <div className='flex w-full justify-center mt-10 mb-16'>
                {/* <a href='/goals' className='transition ease-in-out delay-150 hover:transform hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-none drop-shadow-custom-login dark:drop-shadow-custom-login-white rounded-lg p-2 bg-lime-500 font-medium flex items-center '> */}
                <button onClick={navigateToSetGoals} className='text-lime-900 font-bold text-xl transition ease-in-out delay-150 hover:transform hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-none drop-shadow-custom-login dark:drop-shadow-custom-login-white rounded-lg p-2 bg-lime-500  flex items-center'>Set Goals To Reduce It</button>
                {/* </a> */}
            </div>
        </div>
    );
}

export default Footprint;


