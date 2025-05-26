import React, { useEffect, useState } from 'react'
import { EventCard } from '../components/eventCard/EventCard'

export const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  async function getEvents() {
    const res = await fetch("https://localhost:7212")    
    const data = await res.json()
    setEvents(data.data)
  }
  

  return (
    <section className='section-events'>
      {events.map(e => (
          <EventCard key={e.id} event={e} />
        )
      )}
    </section>
  )
}
