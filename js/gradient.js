document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        interactive: document.querySelector(".interactive"),
        toggle: document.getElementById("toggleButton"),
        gradients: document.querySelector(".gradients-container")
    };

    const state = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        tracking: true,
        running: true,
        lastTime: 0,
        lastMove: 0,
        animationId: null
    };

    elements.interactive.style.transition = "opacity 0.3s ease-in-out";
    elements.interactive.style.willChange = "transform";

    const showMessage = message => {
        const popup = document.createElement("div");
        popup.textContent = message;
        popup.style.cssText =
            "position:fixed;bottom:20px;right:20px;background:rgba(0,0,0,0.7);color:#fff;padding:10px 20px;border-radius:5px;z-index:1000;opacity:0;transition:opacity 0.3s ease;backdrop-filter:blur(5px);";
        document.body.appendChild(popup);
        requestAnimationFrame(() => {
            popup.style.opacity = "1";
            setTimeout(() => {
                popup.style.opacity = "0";
                setTimeout(() => document.body.removeChild(popup), 300);
            }, 2000);
        });
    };

    const updateVisuals = () => {
        // Update interactive element opacity based on tracking state
        elements.interactive.style.opacity = state.tracking ? "0.7" : "0";
        
        // Update gradient elements if they exist
        const gradientElements = document.querySelectorAll(".g1,.g2,.g3,.g4,.g5,.g6");
        gradientElements.forEach(element => {
            element.style.opacity = state.tracking ? "1" : "0";
        });
    };

    const animate = time => {
        // Only run animation if tracking is enabled
        if (!state.running || !state.tracking) {
            if (state.animationId) {
                cancelAnimationFrame(state.animationId);
                state.animationId = null;
            }
            return;
        }
        
        state.animationId = requestAnimationFrame(animate);
        if (time - state.lastTime < 33.33) return;
        state.lastTime = time;

        const ease = 0.08;
        state.x += ease * (state.targetX - state.x);
        state.y += ease * (state.targetY - state.y);
        elements.interactive.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
    };

    const handlePointerMove = e => {
        if (!state.tracking) return;
        const now = Date.now();
        if (now - state.lastMove < 20) return;
        state.lastMove = now;

        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        state.targetX = clientX;
        state.targetY = clientY;
    };

    const handleToggleChange = () => {
        const toggle = document.getElementById("toggleButton");
        if (toggle) {
            state.tracking = toggle.checked;
        } else {
            // If toggle is removed, disable tracking
            state.tracking = false;
        }
        
        updateVisuals();
        
        // Start or stop animation based on tracking state
        if (state.tracking && !state.animationId) {
            state.animationId = requestAnimationFrame(animate);
        }
    };

    // Add event listeners
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Monitor toggle changes
    if (elements.toggle) {
        elements.toggle.addEventListener("change", handleToggleChange);
        state.tracking = elements.toggle.checked;
    }

    // Use MutationObserver to detect when toggle is removed
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.removedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.id === "toggleButton" || node.querySelector("#toggleButton")) {
                        handleToggleChange(); // This will disable tracking since toggle is gone
                    }
                }
            });
        });
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial setup
    updateVisuals();
    state.targetX = window.innerWidth / 2;
    state.targetY = window.innerHeight / 2;
    state.lastTime = performance.now();
    
    // Only start animation if tracking is enabled
    if (state.tracking) {
        state.animationId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        if (state.tracking) {
            state.targetX = window.innerWidth / 2;
            state.targetY = window.innerHeight / 2;
        }
    }, { passive: true });
});

const isMobile = /Android|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function checkHardwareAcceleration() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
        showHardwareAccelerationMessage();
        return false;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (
            renderer.toLowerCase().indexOf("swiftshader") >= 0 ||
            renderer.toLowerCase().indexOf("software") >= 0 ||
            renderer.toLowerCase().indexOf("llvmpipe") >= 0
        ) {
            showHardwareAccelerationMessage();
            return false;
        }
    }

    return true;
}

function showHardwareAccelerationMessage() {
    const gradientElements = document.querySelectorAll(".g1,.g2,.g3,.g4,.g5,.g6,.interactive");
    gradientElements.forEach(element => {
        element.style.display = "none";
    });

    const popup = document.createElement("div");
    popup.textContent = "Hardware acceleration is disabled in your browser. For better performance, please enable it in your browser settings.";
    popup.style.cssText =
        "position:fixed;bottom:20px;left:20px;background:rgba(255,100,100,0.9);color:#fff;padding:10px 20px;border-radius:5px;z-index:1000;opacity:1;transition:opacity 0.3s ease;backdrop-filter:blur(5px);max-width:300px;";
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.cssText =
        "position:absolute;top:5px;right:5px;background:transparent;border:none;color:white;font-size:16px;cursor:pointer;";
    closeButton.addEventListener("click", () => {
        popup.style.opacity = "0";
        setTimeout(() => document.body.removeChild(popup), 300);
    });
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}