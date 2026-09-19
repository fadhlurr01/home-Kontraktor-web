import React from 'react';
import { CheckCircle, AlertTriangle, Zap, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div id="contractor-toast-container" aria-live="polite">
      {toasts.map(toast => {
        const IconComponent =
          toast.type === 'success' ? CheckCircle : toast.type === 'warning' ? AlertTriangle : Zap;

        return (
          <div key={toast.id} className={`contractor-toast toast-${toast.type}`}>
            <div className="toast-icon">
              <IconComponent style={{ width: 20, height: 20 }} />
            </div>
            <div className="toast-body">
              <div className="toast-header-row">
                <div className="toast-title">{toast.title}</div>
                <div className="toast-time">{toast.timeStr}</div>
              </div>
              <div className="toast-message">{toast.message}</div>
              {toast.action && (
                <button
                  className="toast-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.action.onClick();
                    removeToast(toast.id);
                  }}
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Tutup notifikasi"
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
            <div
              className="toast-progress"
              style={{ animationDuration: `${toast.duration}ms` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
