import { useState } from "react";
import { toast } from "react-toastify";
//these are normal functions with super power of react

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    // this function will be called when ever we will make API calls
    const fn = async (...args) => {
        setLoading(true); // set loading to true when the API call is made
        setError(null); // reset error to null before making the API call       

        try {
            const response = await cb(...args); // call the callback function with the arguments
            setData(response); // set the data to the response from the API call
            setError(null); // reset error to null if the API call is successful
        } catch (error) {
            setError(error); // set error to the error from the API call        
            toast.warning(`Error occured : "${error.message}"`, { autoClose: 3000, });

        } finally {
            setLoading(false); // set loading to false when the API call is complete
        } 
    }
    return {data, loading, error, fn, setData}
}

export default useFetch;