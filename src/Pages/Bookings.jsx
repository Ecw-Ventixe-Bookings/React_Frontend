import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import BookedEventCard from '../components/eventCard/BookedEventCard'
import { apiBaseUrls } from '../helpers/apiHelper'

export default function Bookings() {
    const {user, isLoading} = useAuth()
    const [userEvents, setUserEvents] = useState([])

    useEffect(() => {
        if (!isLoading && user) {
        GetUserBookings()
        }
    }, [isLoading, user])

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
    <section className='section-bookings'>
        {isLoading ? (<div>Loading ...</div>) : (
            <>
            <h4>Current bookings: {userEvents.length}</h4>
            {userEvents.map(e => (
                <BookedEventCard key={e.eventId} event={e} />
            ))}
            </>
        )}
    </section>
    )
}
