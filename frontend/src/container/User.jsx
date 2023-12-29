import React from 'react'
import PopUp from './Modal';
import Navbar from '../components/Navbar';


const User = ({Toggle}) => {


    return (
        <>
        <Navbar Toggle={Toggle}/>
            <div>
               <PopUp title='User Orders'/> 
            </div>
        </>
    )
}


export default User;