import React from 'react'
import { useNotifications } from '../contexts/NotificationContext'

const getIcon = (type) => {
    switch (type) {
        case 'success':
            return '✅'
        case 'saving':
            return '💰'
        case 'goal':
            return '🎯'
        case 'warning':
            return '⚠️'
        default:
            return '📢'
    }
}

const NotificationsPage = () => {
    const { notifications } = useNotifications()

    return (
        <div className="p-6 max-w-2xl mx-auto text-white space-y-6">
            <h1 className="text-3xl font-bold text-primary-50">Notificaciones</h1>

            {notifications.length === 0 ? (
                <p className="text-gray-400">Aún no hay notificaciones.</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map((n) => (
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
            )}
        </div>
    )
}

export default NotificationsPage
