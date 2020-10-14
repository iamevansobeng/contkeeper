import React, { useContext, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../../components/layout/Spinner'

const Contacts = () => {
    const contactContext = useContext(ContactContext)

    const { contacts, filtered, getContacts, loading } = contactContext

    useEffect(() => {
        getContacts()
        //  eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a Contact</h4>
    }

    return (
        <>{
            contacts !== null && !loading ? (
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
            ) : <Spinner />
        }

        </>
    )
}

export default Contacts
