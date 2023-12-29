import React from 'react'
import PopUp from './Modal';
import Navbar from '../components/Navbar';



const Purchase = ({Toggle}) => {
    return (
        <>
            <Navbar Toggle={Toggle} />
            <div>
                <PopUp title='Purchase Order' />
            </div>
        </>
    )
}


export default Purchase;