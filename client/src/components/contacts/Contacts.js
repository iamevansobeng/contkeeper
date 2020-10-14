import React, { useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
    const contactContext = useContext(ContactContext)

    const { contacts, filtered } = contactContext
    if (contacts.length === 0) {
        return <h4>PLease add a Contact</h4>
    }

    return (
        <>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map(contact =>
                        <CSSTransition key={contact._id} timeout={350} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>)
                    : contacts.map(contact =>
                        <CSSTransition key={contact._id} timeout={350} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>)}
            </TransitionGroup>
        </>
    )
}

export default Contacts
