// ==========================================================
//  Portfolio Website - Error Logging & Monitoring System
// ==========================================================

// Logger Utility
const logger = {
    error: (message, data = {}) =>{
        console.error(`[Portfolio Error] ${message}`, data);
        // TODO: Send to server or external logging service
    },

    warn: (message, data = {}) => {
        console.warn(`[Portfolio Warning] ${message}`, data);
    },

    info: (message, data = {}) => {
        console.info(`[Portfolio Info] ${message}`, data);
    }
};

// Global Error Handler
window.addEventListener('error', (event) => {
    logger.error('Uncaught Errors', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// Check for Unhandled rejection handlers
window.addEventListener('unhandledRejection', (event) => {
    logger.error('Unhandled Promise Rejection', {
        reason: event.reason,
        promise: event.promise
    });
});

// Check performance issues
window.addEventListener('load', () =>{
    // Log page load performance
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    logger.info('page Loaded', {
        loadTime: `${pageLoadTime}ms`,
        domContentLoaded: `${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`,
    });

    // Setting a current year in the footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// For Accessibility: Focusing visibility on keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

logger.info('Keshon Portfolio Script is loading successfully.')