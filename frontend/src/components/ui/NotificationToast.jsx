import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationToast = ({ 
  notifications = [], 
  onDismiss = () => {},
  position = 'top-right',
  autoHideDuration = 5000 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    if (autoHideDuration > 0) {
      visibleNotifications.forEach((notification) => {
        if (!notification.persistent) {
          const timer = setTimeout(() => {
            handleDismiss(notification.id);
          }, autoHideDuration);

          return () => clearTimeout(timer);
        }
      });
    }
  }, [visibleNotifications, autoHideDuration]);

  const handleDismiss = (id) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
    onDismiss(id);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-20 left-4';
      case 'top-center':
        return 'top-20 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-20 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-20 right-4';
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-100',
          icon: 'CheckCircle',
          iconColor: 'text-success-500',
          titleColor: 'text-success-700',
          textColor: 'text-success-600'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          border: 'border-error-100',
          icon: 'XCircle',
          iconColor: 'text-error-500',
          titleColor: 'text-error-700',
          textColor: 'text-error-600'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-100',
          icon: 'AlertTriangle',
          iconColor: 'text-warning-500',
          titleColor: 'text-warning-700',
          textColor: 'text-warning-600'
        };
      case 'info':
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-100',
          icon: 'Info',
          iconColor: 'text-primary-500',
          titleColor: 'text-primary-700',
          textColor: 'text-primary-600'
        };
      case 'medical':
        return {
          bg: 'bg-accent-50',
          border: 'border-accent-100',
          icon: 'Activity',
          iconColor: 'text-accent-500',
          titleColor: 'text-accent-700',
          textColor: 'text-accent-600'
        };
      default:
        return {
          bg: 'bg-surface',
          border: 'border-border',
          icon: 'Bell',
          iconColor: 'text-text-secondary',
          titleColor: 'text-text-primary',
          textColor: 'text-text-secondary'
        };
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className={`fixed z-1200 ${getPositionClasses()}`}>
      <div className="space-y-3 max-w-sm w-full">
        {visibleNotifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`
                ${styles.bg} ${styles.border} border rounded-lg clinical-shadow-elevated
                p-4 animate-slide-in
              `}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <Icon 
                    name={styles.icon} 
                    size={20} 
                    className={styles.iconColor} 
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {notification.title && (
                    <h4 className={`text-sm font-semibold ${styles.titleColor} mb-1 font-heading`}>
                      {notification.title}
                    </h4>
                  )}
                  <p className={`text-sm ${styles.textColor}`}>
                    {notification.message}
                  </p>
                  
                  {/* Additional Details */}
                  {notification.details && (
                    <div className="mt-2 text-xs text-text-muted">
                      {notification.details}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {notification.actions && (
                    <div className="mt-3 flex space-x-2">
                      {notification.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            action.onClick();
                            if (action.dismissOnClick) {
                              handleDismiss(notification.id);
                            }
                          }}
                          className={`
                            text-xs font-medium px-3 py-1 rounded-md
                            ${action.primary 
                              ? `${styles.titleColor} hover:bg-opacity-20 hover:${styles.bg}` 
                              : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                            }
                            transition-colors duration-200 focus-ring
                          `}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="flex-shrink-0 text-text-muted hover:text-text-secondary transition-colors duration-200 focus-ring rounded-sm"
                  aria-label="Dismiss notification"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>

              {/* Progress Bar for Timed Notifications */}
              {!notification.persistent && autoHideDuration > 0 && (
                <div className="mt-3 w-full bg-secondary-100 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${styles.iconColor.replace('text-', 'bg-')}`}
                    style={{
                      animation: `shrink ${autoHideDuration}ms linear forwards`
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      persistent: false,
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Predefined medical notification types
  const showUploadSuccess = (filename) => {
    return addNotification({
      type: 'success',
      title: 'Upload Successful',
      message: `MRI scan "${filename}" has been uploaded successfully.`,
      details: 'Analysis will begin automatically.'
    });
  };

  const showAnalysisComplete = (confidence) => {
    return addNotification({
      type: 'medical',
      title: 'Analysis Complete',
      message: `Brain tumor analysis completed with ${confidence}% confidence.`,
      actions: [
        {
          label: 'View Results',
          primary: true,
          onClick: () => window.location.href = '/analysis-results-display',
          dismissOnClick: true
        }
      ]
    });
  };

  const showUploadError = (error) => {
    return addNotification({
      type: 'error',
      title: 'Upload Failed',
      message: 'Failed to upload MRI scan. Please try again.',
      details: error,
      persistent: true
    });
  };

  const showSystemAlert = (message) => {
    return addNotification({
      type: 'warning',
      title: 'System Alert',
      message,
      persistent: true
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showUploadSuccess,
    showAnalysisComplete,
    showUploadError,
    showSystemAlert
  };
};

export default NotificationToast;