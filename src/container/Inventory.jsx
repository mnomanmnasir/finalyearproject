import React from 'react'
import PopUp from './Modal';
import Navbar from '../components/Navbar';


const Inventory = ({Toggle}) => {
 
    return (
        <>
        <Navbar Toggle={Toggle}/>
            
                <PopUp title='Inventory Order'/>
        
        </>
    )
}


export default Inventory;