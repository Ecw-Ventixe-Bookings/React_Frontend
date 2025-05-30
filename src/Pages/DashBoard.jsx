import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { apiBaseUrls } from '../helpers/apiHelper'

export const DashBoard = () => {
  const {user} = useAuth()
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    GetUserBookings()
  }, [])

  async function GetUserBookings() {

    const token = localStorage.getItem('token')

    const bookingsResponse = await fetch(`${apiBaseUrls.bookingService}/user/${user.sub}`, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const bookingsData = await bookingsResponse.json()

    const eventsResponse = await fetch(`${apiBaseUrls.eventService}`)
    const eventsData = await eventsResponse.json()

    const eventMap = {}
    eventsData.data.forEach(event => {
      eventMap[event.id] = event
    })

    const combined = bookingsData.data.map(booking => {
      const event = eventMap[booking.eventId] || {}
      return {
        eventId: booking.eventId,
        accountId: booking.accountId,
        ticketQuantity: booking.ticketQuantity,
        bookingDate: booking.bookingDate,
        eventTitle: event.title,
        startDateTime: event.startDateTime,
        ticketPrice: event.ticketPrice,
        categoryName: event.category?.name,
        venueName: event.venue?.name,
        venueAddress: event.venue?.address,
        venueCity: event.venue?.city,
      }
    })

    setUserEvents(combined)
  }

  return (
    <section className='section-dashboard'>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard <strong>{user.email}</strong></p>

        <h5>Current bookings</h5>
        {userEvents.map(e => (
          <div className='bookings-list-item' key={e.eventId}>
            <h6>{e.eventTitle}</h6>
            <p>{e.venueName}, {e.venueAddress}, {e.venueCity}</p>
            <p>{e.startDateTime}</p>
            <p>tickets: {e.ticketQuantity}</p>
            <p>ticket price: {e.ticketPrice}</p>
            <p>total: {Number(e.ticketPrice) * Number(e.ticketQuantity)}</p>
          </div>          
        ))}
    </section>
  )
}
