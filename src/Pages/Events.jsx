import React from 'react'
import { EventCard } from '../components/eventCard/EventCard'

export const Events = () => {

  const event = {
    category: 'Music',
    status: 'Active',
    title: 'Symphony under the stars',
    location: 'Scandinavium, Göteborg',
    price: 500
  }

  return (
    <section className='section-events'>
        <EventCard event = {event} />
        <EventCard event = {event} />
        <EventCard event = {event} />
        <EventCard event = {event} />
    </section>
  )
}
