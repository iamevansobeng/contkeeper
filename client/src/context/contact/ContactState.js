import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'
const fakeContacts = [
    {
        id: 1,
        name: 'Kooo Kusi',
        email: "kusi@gmail.com",
        phone: '123-245-776',
        type: 'personal'
    },
    {
        id: 2,
        name: 'Jason Statham',
        email: "jason@gmail.com",
        phone: '897-5659-776',
        type: 'professional'
    },
    {
        id: 3,
        name: 'James Bond',
        email: "james@gmail.com",
        phone: '445-245-776',
        type: 'personal'
    },
]
const ContactState = props => {
    const initialState = {
        contacts: fakeContacts
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // ADD CONTACT

    // DELETE CONTACT

    // SET CURRENT CONTACT

    // CLEAR CURRENT CONTACT

    // UPDATE CONTACT

    // FILTER CONTACTS

    // CLEAR FILTER

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )

}
export default ContactState