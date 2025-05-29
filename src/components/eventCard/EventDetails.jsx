import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiBaseUrls } from '../../helpers/apiHelper'
import BookEventModal from '../BookEventModal'

import defaultEventArtImg from "../../assets/images/DefaultEventArt.jpg"
import defaultEventComedyImg from "../../assets/images/DefaultEventComedy.jpg"
import defaultEventMusicImg from "../../assets/images/DefaultEventMusic.jpg"
import defaultEventGenericImg from "../../assets/images/DefaultEventGeneric.jpg"

import './eventDetails.css'
import { useAuth } from '../../Contexts/AuthContext'
import { useForm } from '../../customHooks/useForm'

export default function EventDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()
    const [ticketCount, setTicketCount] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [event, setEvent] = useState({
        category: {},
        venue: {}
    })

    const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    ticketQuantity: 1,
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: ''
  })

    useEffect( () => {
        getEvent()
        getTicketCount()
    }, [])

    async function getEvent() {
        const res = await fetch(`${apiBaseUrls.eventService}/${id}`)    
        const data = await res.json()
        setEvent(data.data)
    }

    async function getTicketCount() {
        const res = await fetch(`${apiBaseUrls.bookingService}/${id}`)
        const data = await res.json()
        setTicketCount(data)
    }

    function openBookingModal() {
        if (!isAuthenticated)
            navigate("/login")

        setModalIsOpen(true)
    }

    async function submitBooking(formData) {
        console.log(`eventID: ${id}`)
        console.log(`userEmail: ${user.email}`)

        const data = {
            eventId: id,
            ticketQuantity: formData.ticketQuantity,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: user.email,
            streetAddress: formData.address,
            postalCode: formData.postalCode,
            city: formData.city
        }

        const token = localStorage.getItem('token')

        var res = await fetch(apiBaseUrls.bookingService, {
            method: "POST",
            headers: { 
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (res.ok) navigate("/dashboard")
    }

    let imgSrc;
    
      if (!event.image) {
        switch (event.category.name) {
          case "Art":
            imgSrc = defaultEventArtImg
            break
          case "Comedy":
            imgSrc = defaultEventComedyImg
            break
          case "Music":
            imgSrc = defaultEventMusicImg
            break
          default:
            imgSrc = defaultEventGenericImg
        }
      } else {
        imgSrc = event.image
      }



  return (
    <>

    <BookEventModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <form className='book-event-form-modal' noValidate onSubmit={handleSubmit(submitBooking)}>
            <h4>Enter information</h4>
            
            <div className='input-group'>
                <label htmlFor='firstName'>First Name</label>
                <input 
                    id='firstName'
                    data-validation="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div className='input-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input 
                    id='lastName'
                    data-validation="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <div className='input-group'>
                <label htmlFor='address'>Address Name</label>
                <input 
                    id='address'
                    data-validation="address"
                    value={values.address}
                    onChange={handleChange}
                />
                {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className='input-group'>
                <label htmlFor='postalCode'>Postal Code</label>
                <input 
                    id='postalCode'
                    data-validation="postalCode"
                    value={values.postalCode}
                    onChange={handleChange}
                />
                {errors.postalCode && <span className="error">{errors.postalCode}</span>}
            </div>

            <div className='input-group'>
                <label htmlFor='city'>City</label>
                <input 
                    id='city'
                    data-validation="city"
                    value={values.city}
                    onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
            </div>

            <div className='input-group'>
                <label htmlFor='ticketQuantity'>Ticket quantity</label>
                <input 
                    type='number' 
                    id='ticketQuantity' 
                    min="1" 
                    max="50"
                    value={values.ticketQuantity}
                    onChange={handleChange} 
                />
            </div>

        <button className='btn btn-primary'>Book</button>
        </form>
        
    </BookEventModal>

    <div className='section-event-details'>
        <div className='header'>
            <img src={imgSrc} alt={event.title} />
        </div>
        <div className='event-details'>
            <div className='event-title'>
                <h4>{event.title}</h4>
                <p>!</p>
            </div>
            <div className='event-information'>
                <div>
                    <p>{new Date(event.startDateTime).toLocaleString()}</p>
                    <p>{event.venue.name}, {event.venue.address}, {event.venue.city}</p>
                </div>
                <div className='event-tickets-left'>
                    <p>{event.totalTickets - ticketCount} Tickets left</p>
                </div>
                <div>
                    <p className='event-price'>{event.ticketPrice} kr</p>
                </div>
            </div>
        </div>
        <hr />
        <div className='event-description'>
            <p>{event.description}</p>
        </div>
    </div>

    <div className='terms-and-conditions'>
         <h5>Terms and Conditions</h5>

         <strong>1. Ticket Purchase and Entry</strong>
         <ul>
            <li>All attendees must possess a valid ticket for entry.</li>
            <li>Tickets are non-refundable and non-transferable unless specified by the event organizer.</li>
            <li>Attendees must present a valid government-issued ID along with their ticket at the gate.</li>
        </ul>

        <strong>2. Security and Safety</strong>
        <ul>
            <li>Attendees are subject to security checks, including bag inspections, upon entry.</li>
            <li>Prohibited items include weapons, drugs, alcohol, fireworks, and other hazardous materials.</li>
            <li>The event organizer reserves the right to deny entry to individuals deemed a security risk.</li>
        </ul>

        <strong>3. Code of Conduct</strong>
        <ul>
            <li>Attendees are expected to behave responsibly and respectfully toward others.</li>
            <li>Any disruptive behavior, harassment, or illegal activity will result in immediate removal from the event without refund.</li>
        </ul>

        <strong>4. Event Schedule and Changes</strong>
        <ul>
            <li>The event schedule is subject to change without prior notice.</li>
            <li>The event organizer is not responsible for delays or cancellations caused by weather, technical issues, or other unforeseen circumstances.</li>
        </ul>
    </div>

    <div className='booking-button'>
        <button onClick={openBookingModal}>
            <span>Book Event</span>
            <span>{event.ticketPrice} kr</span>
        </button>
    </div>

    </>
  )
}
