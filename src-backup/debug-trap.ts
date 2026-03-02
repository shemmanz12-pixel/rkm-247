// src/debug-trap.ts
if (typeof window !== 'undefined') {
  // Function to show the Red Box
  const showError = (title, message, details) => {
    const errorBox = document.createElement('div');
    errorBox.style.position = 'fixed';
    errorBox.style.top = '0';
    errorBox.style.left = '0';
    errorBox.style.width = '100%';
    errorBox.style.height = '100vh';
    errorBox.style.backgroundColor = '#fee2e2';
    errorBox.style.color = '#991b1b';
    errorBox.style.zIndex = '2147483647'; // Max Z-Index
    errorBox.style.padding = '20px';
    errorBox.style.fontFamily = 'monospace';
    errorBox.style.overflow = 'auto';
    
    errorBox.innerHTML = `
      <div style="background: white; padding: 20px; border: 4px solid red; max-width: 800px; margin: 0 auto; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <h1 style="margin-top: 0; color: red;">🚨 ${title}</h1>
        <p style="font-size: 1.2em; font-weight: bold;">${message}</p>
        <pre style="background: #1e293b; color: #fff; padding: 15px; overflow-x: auto; border-radius: 4px;">${details}</pre>
        <p>Take a screenshot of this and share it.</p>
      </div>
    `;
    document.body.appendChild(errorBox);
  };

  // 1. Catch Standard Crashes
  window.onerror = function(message, source, lineno, colno, error) {
    showError('CRASH DETECTED', message, `File: ${source}\nLine: ${lineno}\nStack: ${error?.stack}`);
    return false;
  };

  // 2. Catch Missing Files / Async Crashes (The likely culprit)
  window.onunhandledrejection = function(event) {
    showError('UNHANDLED REJECTION', event.reason?.message || event.reason, event.reason?.stack || 'No stack trace');
  };
  
  console.log("✅ AGGRESSIVE FAULT FINDER ACTIVE");
}