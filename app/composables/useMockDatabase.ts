interface BookingPayload {
  offerId: string
  offerName: string
  name: string
  email: string
}

export function useMockDatabase() {
  const createBooking = async (payload: BookingPayload) => {
    await new Promise(resolve => setTimeout(resolve, 1200))

    if (Math.random() < 0.05) {
      throw new Error('Network error — please try again')
    }

    const id = `BK-${Date.now().toString(36).toUpperCase()}`
    console.log('[Mock DB] Booking created:', { id, ...payload })

    await sendConfirmationEmail(payload.email, payload.offerName, id)

    return { success: true, bookingId: id }
  }

  const sendConfirmationEmail = async (to: string, offerName: string, bookingId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`[Mock Email] Confirmation sent to ${to} for "${offerName}" (${bookingId})`)
  }

  return { createBooking }
}
