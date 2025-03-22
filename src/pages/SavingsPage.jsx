import React, { useState } from 'react'

const SavingsPage = () => {
    const [savings, setSavings] = useState(275.30) // mock
    const [percentage, setPercentage] = useState(10) // mock: % ahorro
    const [confirmation, setConfirmation] = useState(null)

    const handleWithdraw = () => {
        if (savings <= 0) {
            setConfirmation('No hay fondos para retirar.')
            return
        }

        // Simula retiro
        setSavings(0)
        setConfirmation('💸 Has retirado tus ahorros con éxito.')
    }

    return (
        <div className="p-6 max-w-2xl mx-auto text-white space-y-8">
            <h1 className="text-3xl font-bold text-primary-50">Mis Ahorros</h1>

            <div className="bg-gray-800 p-6 rounded-xl space-y-4 shadow-lg">
                <div>
                    <h2 className="text-xl font-semibold">Ahorro acumulado</h2>
                    <p className="text-2xl mt-2 font-bold text-green-400">${savings.toFixed(2)}</p>
                </div>

                <div>
                    <label htmlFor="percentage" className="block mb-1 font-medium">
                        Porcentaje automático de ahorro (%)
                    </label>
                    <input
                        id="percentage"
                        type="number"
                        value={percentage}
                        onChange={(e) => {
                            const val = parseInt(e.target.value)
                            if (val >= 0 && val <= 100) {
                                setPercentage(val)
                            }
                        }}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white"
                    />
                </div>

                <button
                    onClick={handleWithdraw}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
                >
                    Retirar Ahorros
                </button>

                {confirmation && (
                    <p className="text-green-300 text-sm mt-4">{confirmation}</p>
                )}
            </div>
        </div>
    )
}

export default SavingsPage
