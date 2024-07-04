import React from 'react';
import { Field, useFormikContext } from 'formik';

const ElectricityForm = () => {
    const {values} = useFormikContext();
  return (
    <div className="mt-3 mb-5">
      <div className="mb-5">
        <h1 className='text-2xl font-bold text-center mt-6 mb-3'>House Energy</h1>
      </div>

      <div>
        <label htmlFor="gas" className="mr-2">Do you use gas(LPG) for cooking in your home? </label><br />

        <Field type="radio" id="yes" name="gas" value="yes" className="accent-[green] mt-2 hover:accent-[#22a022] h-5 w-5" checked={values.gas === 'yes'} />
        <span className="mr-3 pl-1 pb-5">Yes</span>
        
        <Field type="radio" id="no" name="gas" value="no" className="accent-[green] pt-6 hover:accent-[#22a022] h-5 w-5" checked={values.gas === 'no'}/>
        <label htmlFor="no" className="pl-1">No</label>
      </div>

      <div className='mt-4'>
      { 
      <>
        <label htmlFor="noOfGas">How many LPG cylinders do you use per year? </label><br />
        <Field type="number" id="noOfGas" name="noOfGas"  placeholder="Enter" min="1" max="*" autoComplete="off" className="border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500" 
            disabled={values.gas==='no'} onWheel={(e) => e.target.blur()} required={true} />
      </>
      }
      </div>


      <div className="mt-12">
        <label>What is the primary source of power in your home? </label><br />
        
        <Field type="radio" id="electricity" name="source" value="electricity"  className="accent-[green] mt-2 hover:accent-[#22a022] h-5 w-5" checked={values.source === 'electricity'}/>
        <label htmlFor="electricity" className="mr-3 pl-1 pb-5">Electricity</label>

        <Field type="radio" id="solar" name="source" value="solar"  className="accent-[green] pt-6 hover:accent-[#22a022] h-5 w-5" checked={values.source === 'solar'}/>
        <label htmlFor="solar" className="pl-1">Solar Energy</label>
      </div>

      <div className="-mt-4">
        <label htmlFor="kwh">If Electricity, Mention KWh (or Unit) (yearly)</label><br />
        <Field type="number" onWheel={(e) => e.target.blur()} id="kwh" name="kwh" placeholder="Enter" min="1" max="*" autoComplete="off" className="border-2 px-1 w-24 rounded-md focus:outline-none focus:border-lime-500"
             disabled={values.source === 'solar'} required={true} />
      </div>
    </div>
  );
}

export default ElectricityForm;
