import React from 'react'
import PopUp from './Modal';
import Navbar from '../components/Navbar';


const Sales= ({Toggle}) => {
 


    return (
        <>
        <Navbar Toggle={Toggle}/>
            <div>
                <PopUp title='Sales Order'/>
            </div>
        </>
    )
}


export default Sales;