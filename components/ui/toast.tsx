import React from "react"

export type ToastActionElement = React.ReactNode // Define this based on your actual type if needed

export type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement // Updated to use ToastActionElement
  open: boolean
  onOpenChange: (open: boolean) => void
}

const Toast: React.FC<ToastProps> = ({ id, title, description, action, open, onOpenChange }) => {
  if (!open) return null

  return (
    <div className="toast" id={id}>
      <div className="toast-content">
        {title && <h4>{title}</h4>}
        {description && <p>{description}</p>}
      </div>
      <div className="toast-actions">
        {action} {/* Render the action element here */}
        <button onClick={() => onOpenChange(false)}>Dismiss</button>
      </div>
    </div>
  )
}

export default Toast
