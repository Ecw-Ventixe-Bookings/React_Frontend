import React from 'react'

import './eventCard.css'

export const EventCard = ({event}) => {
  return (
    <div className='event-card'>
        <div className='event-header'>
            <p className='event-category'>{event.category}</p>
            <p className='event-status'>{event.status}</p>
        </div>
        <div className='event-details'>
            <p>Juni 5, 2025 - kl. 20:00</p>
            <p className='event-title'>{event.title}</p>
            <p>{event.location}</p>
            <p className='event-price'>{event.price} Kr</p>
        </div>
    </div>
  )
}
