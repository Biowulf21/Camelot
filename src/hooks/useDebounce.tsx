import { useEffect, useState } from "react";


const useDebounce = (value: string, delay: number) =>{
    const [debouncedValue, setdebouncedValue] = useState(value)

    useEffect(() => {
    const handler = setTimeout(()=>{
        setdebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;