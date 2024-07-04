import React from "react";
import { FieldArray, Field, useFormikContext } from 'formik';
import '../Vehicle.css'

const Vehicle = () => {
    const { values, setFieldValue } = useFormikContext();
    return (
        <div className="mt-3 mb-5 ">
            <div className="mb-5">
                <h1 className='text-2xl font-bold text-center mt-6 mb-3'>Vehicle</h1>
            </div>

            <div className="mt-4">
                <label>How many vehicle do you have? (0 to 5)</label><br />
                <Field type="number" placeholder="Enter" min="0" max="5" step="1" pattern="\d*" name="noOfVehicle" autoComplete="off" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required={true}

                    onChange={(e) => {
                        const count = parseInt(e.target.value) > 5 ? 5 : parseInt(e.target.value);

                        //max 5 vehicles allowed

                        if (isNaN(count) || count < 0) {
                            setFieldValue('noOfVehicle', '');
                            // setFieldValue('vehicles', []);
                            return;
                        }
                        setFieldValue('noOfVehicle', count.toString());

                        if (count > values.vehicles.length) {
                            const newVehicles = Array.from({ length: count - values.vehicles.length }, (_, index) => ({
                                type: 'petrol',
                                mileage: '0',
                                kms: '0',
                            }));

                            setFieldValue('vehicles', [...values.vehicles, ...newVehicles]);
                        } else if (count < values.vehicles.length) {
                            setFieldValue('vehicles', values.vehicles.slice(0, count));
                        }

                    }}
                    onWheel={(e) => e.target.blur()}
                /><br />
            </div>

            {(values.noOfVehicle !== '0' && values.noOfVehicle !== '') && <div className="bg-lime-300 p-1 mt-6 pl-2 rounded-md">Vehicle Details</div>}

            <FieldArray name="vehicles">
                {() => (
                    values.vehicles.map((vehicle, index) => (
                        <div key={index} className="mt-6 mb-12 relative border-2 p-3 rounded-lg border-lime-500">
                            <p className="absolute -top-4 text-2xl text-green-800 bg-white">#{index + 1}</p>

                            <div className="mt-4">
                                <label>Vehicle Type</label><br />
                                <Field as="select" name={`vehicles.${index}.type`} className="border-b border-gray-300 p-1 w-48 focus:outline-none  focus:ring-0">
                                    <option value="petrol" className="hover:bg-red-600">Petrol</option>
                                    <option value="diesel" className="hover:bg-red-600">Diesel</option>
                                    <option value="cng">CNG</option>
                                    <option value="electric">Electric</option>
                                </Field>
                            </div>

                            <div className="mt-4 mb-4">
                                <label>Mileage of your vehicle (Km/L)</label><br />
                                <Field type="number" name={`vehicles.${index}.mileage`} onWheel={(e) => e.target.blur()} placeholder="Enter" min="0" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required /><br />
                            </div>

                            <div className="mt-4 mb-4">
                                <label>KMs driven in a year</label><br />
                                <Field type="number" name={`vehicles.${index}.kms`} onWheel={(e) => e.target.blur()} placeholder="Enter" min="0" className='border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500' required /><br />
                            </div>
                        </div>
                    ))
                )}
            </FieldArray>

        </div>
    )
}

export default Vehicle;