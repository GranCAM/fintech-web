import React from 'react'

const mockNotifications = [
    {
        id: 1,
        type: 'success',
        title: 'Pago recibido',
        message: 'Recibiste $42.50 por código QR.',
        timestamp: '22/03/2025 14:35',
    },
    {
        id: 2,
        type: 'saving',
        title: 'Ahorro automático',
        message: 'Se guardó el 10% de tu pago: $4.25.',
        timestamp: '22/03/2025 14:35',
    },
    {
        id: 3,
        type: 'goal',
        title: '¡Meta de ahorro alcanzada!',
        message: 'Has alcanzado tu meta de $250 🎉',
        timestamp: '22/03/2025 10:00',
    },
]

const getIcon = (type) => {
    switch (type) {
        case 'success':
            return '✅'
        case 'saving':
            return '💰'
        case 'goal':
            return '🎯'
        default:
            return '📢'
    }
}

const NotificationsPage = () => {
    return (
        <div className="p-6 max-w-2xl mx-auto text-white space-y-6">
            <h1 className="text-3xl font-bold text-primary-50">Notificaciones</h1>

            <ul className="space-y-4">
                {mockNotifications.map((n) => (
                    <li key={n.id} className="bg-gray-800 p-4 rounded-xl shadow flex items-start gap-4">
                        <span className="text-2xl">{getIcon(n.type)}</span>
                        <div className="flex-1">
                            <p className="font-semibold">{n.title}</p>
                            <p className="text-sm text-gray-300">{n.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{n.timestamp}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotificationsPage
