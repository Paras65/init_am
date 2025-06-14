function Notifications({ message, type = "info", onClose }) {
  if (!message) return null;

  return (
    <div className={`notification notification-${type}`}>
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close notification">&times;</button>
    </div>
  );
}
export default Notifications;