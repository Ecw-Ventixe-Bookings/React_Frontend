import React from 'react'

import defaultEventArtImg from "../../assets/images/DefaultEventArt.jpg"
import defaultEventComedyImg from "../../assets/images/DefaultEventComedy.jpg"
import defaultEventMusicImg from "../../assets/images/DefaultEventMusic.jpg"
import defaultEventGenericImg from "../../assets/images/DefaultEventGeneric.jpg"

import './eventCard.css'
import { Link } from 'react-router-dom'

export const EventCard = ({event}) => {
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
    <Link to={`/events/${event.id}`} className='event-card-link'>
      <div className='event-card'>
        <div className='event-main-info'>
          <div className='event-image'>
            <img src={imgSrc} alt={event.title} />
          </div>
          <div className='event-header'>
            <span className='event-category'>{event.category.name}</span>
            <p className='event-title'>{event.title}</p>
            <p className='event-description'>{event.description}</p>
          </div>
        </div>
        <div className='event-details'>
          <p>{event.venue.name}, {event.venue.address}, {event.venue.city}</p>
          <p>{new Date(event.startDateTime).toLocaleString()}</p>
        </div>
        <div className='event-price'>
          <p>{event.ticketPrice} kr</p>
        </div>
      </div>
    </Link>
  )
}

// export const EventCard = ({event}) => {
//   return (
//     <div className='event-card'>
//       <div className='event-header'>
//         <p className='event-category'>{event.category}</p>
//       </div>
//       <div className='event-details'>
//         <p>{new Date(event.startDateTime).toLocaleString()}</p>
//         <p className='event-title'>{event.title}</p>
//         <p>{event.venue?.city}</p>
//         <p className='event-price'>{event.ticketPrice} Kr</p>
//       </div>
//     </div>
//   )
// }
