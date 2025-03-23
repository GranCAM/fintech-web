// Este servicio se encargará de enviar pagos al backend cuando esté disponible

export const sendQrPayment = async ({ amount, description }) => {
  try {
      const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              amount: parseFloat(amount),
              description,
          }),
      })

      if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Error desconocido al procesar el pago.')
      }

      const result = await response.json()
      return result
  } catch (error) {
      console.error('Error en sendQrPayment:', error)
      throw error
  }
}
