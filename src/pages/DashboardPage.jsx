import React, { useMemo } from 'react'
import { useNotifications } from '../contexts/NotificationContext'

const DashboardPage = () => {
    const { notifications } = useNotifications()

    // 🎯 Meta mock (puedes hacerla dinámica luego)
    const savingsGoal = 500

    // 🧮 Calcular ahorro acumulado desde notificaciones de tipo 'saving'
    const savings = useMemo(() => {
        return notifications
            .filter((n) => n.type === 'saving')
            .reduce((total, n) => {
                const match = n.message.match(/[\d.]+/)
                return match ? total + parseFloat(match[0]) : total
            }, 0)
    }, [notifications])

    // 💵 Simular balance como ahorro más un extra mock
    const balance = savings + 925.45 // puedes ajustar este mock como quieras

    // 📈 Progreso hacia la meta
    const progress = Math.min((savings / savingsGoal) * 100, 100).toFixed(0)

    return (
        <div className="p-6 max-w-4xl mx-auto text-white space-y-8">
            <h1 className="text-3xl font-bold text-primary-50">SmartSave Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-primary-60 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Saldo actual</h2>
                    <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
                </div>
                <div className="bg-green-700 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Ahorro acumulado</h2>
                    <p className="text-2xl font-bold">${savings.toFixed(2)}</p>
                </div>
                <div className="bg-blue-700 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Meta de ahorro</h2>
                    <p className="text-2xl font-bold">${savingsGoal.toFixed(2)}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Progreso de ahorro</h2>
                <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
                    <div
                        className="bg-green-500 h-6 text-sm text-white text-center leading-6"
                        style={{ width: `${progress}%` }}
                    >
                        {progress}%
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
