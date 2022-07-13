import React, { useEffect } from 'react'

const Alert = ({type, msg, removealert}) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            removealert()   //After 3 seconds the alert will hide by itslf using this function.
        }, 3000)
        return () => clearTimeout(timeout); //it will reset the time.
    }, [])

    return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert;