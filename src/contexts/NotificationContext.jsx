import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [latest, setLatest] = useState(null)

    const addNotification = ({ type = 'info', title, message }) => {
        const newNotification = {
            id: Date.now(),
            type,
            title,
            message,
            timestamp: new Date().toLocaleString(),
        }

        setNotifications((prev) => [newNotification, ...prev])
        setLatest(newNotification) // ⚠️ Trigger para mostrar toast
    }

    // Mostrar popup cada vez que se añade una notificación nueva
    useEffect(() => {
        if (!latest) return

        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-xs w-full bg-gray-900 border-l-4 p-4 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ${
                    latest.type === 'success'
                        ? 'border-green-500'
                        : latest.type === 'warning'
                        ? 'border-yellow-500'
                        : latest.type === 'saving'
                        ? 'border-blue-400'
                        : 'border-white'
                }`}
            >
                <p className="font-bold text-white">{latest.title}</p>
                <p className="text-sm text-gray-300">{latest.message}</p>
            </div>
        ), { duration: 4000 })
    }, [latest])

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationContext)
