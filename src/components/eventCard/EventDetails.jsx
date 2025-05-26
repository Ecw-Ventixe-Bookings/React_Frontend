import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import defaultEventArtImg from "../../assets/images/DefaultEventArt.jpg"
import defaultEventComedyImg from "../../assets/images/DefaultEventComedy.jpg"
import defaultEventMusicImg from "../../assets/images/DefaultEventMusic.jpg"
import defaultEventGenericImg from "../../assets/images/DefaultEventGeneric.jpg"

import './eventDetails.css'

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState({
        category: {},
        venue: {}
    })

    useEffect( () => {
        getEvent()
    }, [])

    async function getEvent() {
        const res = await fetch(`https://localhost:7212/${id}`)    
        const data = await res.json()
        setEvent(data.data)
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
        <button>
            <span>Book Event</span>
            <span>{event.ticketPrice} kr</span>
        </button>
    </div>

    </>
  )
}
