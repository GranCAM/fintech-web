import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const addNotification = ({ type = 'info', title, message }) => {
        const newNotification = {
            id: Date.now(),
            type,
            title,
            message,
            timestamp: new Date().toLocaleString(),
        }
        setNotifications((prev) => [newNotification, ...prev])
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationContext)
