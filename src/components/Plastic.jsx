import React from "react";
import { Field,useFormikContext} from "formik";

const Plastic=()=>{
    const {setFieldValue } = useFormikContext();
    
    return(
        <div className="mt-3 mb-5">
        <div className="mb-5">
          <h1 className='text-2xl font-bold text-center mt-6 mb-3'>Plastic Usage</h1>
        </div>
  
        <div>
          <label htmlFor="gas" className="mr-2">How many single usage plastic bags you use (yearly)? </label><br />
          <Field type="number" id="noOfBags" name="noOfBags"  placeholder="Enter" min="0" max="*" autoComplete="off" className="border-2  px-1 w-24 rounded-md focus:outline-none focus:border-lime-500 " required={true}
          onChange={(e)=>{
            setFieldValue('noOfBags', e.target.value);
            setFieldValue('finish', 'yes');
          }} />
        </div>

    </div>
    )
}

export default Plastic;