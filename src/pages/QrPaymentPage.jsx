import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useNotifications } from '../contexts/NotificationContext'

const QrPaymentPage = () => {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [qrData, setQrData] = useState(null)
    const [paymentConfirmed, setPaymentConfirmed] = useState(false)
    const [inputError, setInputError] = useState(false)

    const { addNotification } = useNotifications()

    // 👉 Aquí dejarías la lógica real que se conectará a la API de backend
    const processPayment = async ({ amount, description }) => {
        // 🧪 Simulación por ahora
        const savedAmount = parseFloat(amount)
        const savedPercentage = 10 // simula 10% de ahorro

        // 1. Añadir notificación de pago
        addNotification({
            type: 'success',
            title: 'Pago recibido',
            message: `Recibiste $${savedAmount.toFixed(2)} por código QR.`,
        })

        // 2. Añadir notificación de ahorro automático
        const saved = (savedAmount * savedPercentage) / 100
        addNotification({
            type: 'saving',
            title: 'Ahorro automático',
            message: `Se guardó el ${savedPercentage}% de tu pago: $${saved.toFixed(2)}.`,
        })

        // ✅ Marca como completado
        setPaymentConfirmed(true)

        // 🧠 Aquí va el llamado real al backend (lo dejas preparado así):
        /*
        const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: parseFloat(amount),
                description,
            }),
        })

        const result = await response.json()
        if (result.success) {
            // Puedes mostrar un toast o actualizar estado
        } else {
            console.error('Error al procesar el pago:', result)
        }
        */
    }

    const generateQR = () => {
        if (!amount || isNaN(amount)) return alert('Introduce un monto válido')
        const data = {
            amount: parseFloat(amount),
            description,
            timestamp: new Date().toISOString(),
        }
        setQrData(JSON.stringify(data))
        setPaymentConfirmed(false)
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        const isValid = /^\d*\.?\d{0,2}$/.test(value) || value === ''
        if (isValid) {
            setAmount(value)
            setInputError(false)
        } else {
            setInputError(true)
        }
    }

    return (
        <div className="p-6 max-w-2xl mx-auto text-white space-y-8">
            <h1 className="text-3xl font-bold text-primary-50">Pago con QR</h1>

            {/* Formulario de datos */}
            <div className="space-y-4">
                <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleInputChange}
                    placeholder="Monto a pagar"
                    className={`w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border ${
                        inputError ? 'border-red-500' : 'border-transparent'
                    }`}
                />
                {inputError && (
                    <p className="text-red-500 text-sm animate-blink">
                        Solo se permiten números positivos con hasta 2 decimales.
                    </p>
                )}

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                    className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />

                <button
                    onClick={generateQR}
                    className="bg-primary-50 text-black font-semibold px-6 py-3 rounded-lg hover:bg-primary-40 transition"
                >
                    Generar QR
                </button>
            </div>

            {/* QR generado */}
            {qrData && (
                <div className="flex flex-col items-center gap-4 mt-6">
                    <QRCodeCanvas value={qrData} size={200} />
                    <button
                        onClick={() => processPayment({ amount, description })}
                        className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Simular escaneo y pago
                    </button>
                </div>
            )}

            {/* Confirmación */}
            {paymentConfirmed && (
                <div className="bg-green-900 text-green-200 p-4 mt-6 rounded-xl text-center shadow-lg">
                    ✅ Pago confirmado y se ha ahorrado el 10% automáticamente.
                </div>
            )}
        </div>
    )
}

export default QrPaymentPage
