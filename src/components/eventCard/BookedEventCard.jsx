import React from 'react'

import './bookedEventCard.css'

import defaultEventArtImg from "../../assets/images/DefaultEventArt.jpg"
import defaultEventComedyImg from "../../assets/images/DefaultEventComedy.jpg"
import defaultEventMusicImg from "../../assets/images/DefaultEventMusic.jpg"
import defaultEventGenericImg from "../../assets/images/DefaultEventGeneric.jpg"



export default function BookedEventCard({event}) {

    let imgSrc;
    
    switch (event.categoryName) {
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


  return (
    <div className='boked-event-card'>
        <div className='event-main-info'>
          <div className='event-image'>
            <img src={imgSrc} alt={event.eventTitle} />
          </div>
          <div className='event-header'>
            <span className='event-category'>{event.categoryName}</span>
            <p className='event-title'>{event.eventTitle}</p>
            <p></p>
          </div>
        </div>
        <div className='event-details'>
          <p>{event.venueName}, {event.venueAddress}, {event.venueCity}</p>
          <p>{new Date(event.startDateTime).toLocaleString()}</p>
        </div>
        <div className='event-price'>
            <p>Price: {event.ticketPrice}</p>
            <p>Tickets: {event.ticketQuantity}</p>
          <p>Total: {Number(event.ticketPrice) * Number(event.ticketQuantity)} kr</p>
        </div>
    </div>
  )
}
