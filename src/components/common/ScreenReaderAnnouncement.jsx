/**
 * Screen Reader Announcement Component
 * 
 * Provides an accessible way to announce dynamic content changes to screen readers
 * using ARIA live regions. Content is visually hidden but announced by assistive technology.
 * 
 * param {string} message - The message to announce to screen readers
 * param {string} priority - 'polite' (default) or 'assertive' for urgency level
 * param {boolean} atomic - Whether to read the entire region (default: true)
 * 
 * example
 * <ScreenReaderAnnouncement message="Movie added to watch list" />
 * <ScreenReaderAnnouncement message="Error occurred" priority="assertive" />
 */
const ScreenReaderAnnouncement = ({ 
  message, 
  priority = 'polite', 
  atomic = true 
}) => {
  return (
    <div 
      aria-live={priority} 
      aria-atomic={atomic}
      className="sr-only"
      role="status"
    >
      { message ? message : "" }
    </div>
  );
};

export default ScreenReaderAnnouncement;
