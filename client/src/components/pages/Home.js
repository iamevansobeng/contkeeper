import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../../context/contact/ContactForm'

const Home = () => {
    return (
        <div className="grid-2">
            <div className="">
                <ContactForm />
            </div>
            <div>
                <Contacts />
            </div>

        </div>
    )
}

export default Home
