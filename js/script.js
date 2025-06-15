function showMessage(message) {
    const messageDiv = document.createElement("div");
    Object.assign(messageDiv.style, {
        fontFamily: "MonaSansExpanded",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#080a0f52",
        backdropFilter: "blur(10px)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        zIndex: "1000",
        opacity: "0",
        transition: "opacity 0.5s ease-in-out"
    });
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.style.opacity = "1";
    }, 100);
    setTimeout(() => {
        messageDiv.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", (function() {
    const header = document.querySelector("header");
    window.addEventListener("scroll", (function() {
        header.classList.toggle("sticky", window.scrollY > 100);
    }));

    // Hamburger menu functionality with error checking
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-section");
    const body = document.body;

    // Debug: Check if elements exist
    console.log("Hamburger element found:", hamburger !== null);
    console.log("Nav menu element found:", navMenu !== null);

    // Only add event listener if hamburger element exists
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            console.log("Hamburger clicked!"); // Debug log
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            body.classList.toggle("no-scroll");
        });

        // Close menu when clicking nav links
        document.querySelectorAll(".nav-section a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            });
        });
    } else {
        console.error("Hamburger or nav menu element not found!");
    }

    const navLinks = document.querySelectorAll(".nav-section li a");

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768) {
            header.classList.remove("sticky");
        } else if (window.scrollY > 50) {
            header.classList.add("sticky");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            }
        }));
    });

    window.addEventListener("scroll", (function() {
        let current = "";
        document.querySelectorAll("section").forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
            if (current === "" && link.getAttribute("href") === "#") {
                link.classList.add("active");
            }
        });
    }));

    const spinningText = document.getElementById("Spinning-Text");
    if (spinningText) {
        const words = ["Adriane", "Aspiring Developer", "Gamer"];
        let currentIndex = 0;
        spinningText.textContent = words[0];

        const animate = () => {
            spinningText.style.animation = "textFadeOut 0.5s forwards ease";
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                spinningText.textContent = words[currentIndex];
                spinningText.style.animation = "textFadeIn 0.5s forwards ease";
            }, 500);
        };

        setInterval(animate, 3000);
    }

    // Force hamburger visibility on mobile (emergency fix)
    function ensureHamburgerVisibility() {
        if (window.innerWidth <= 992 && hamburger) {
            hamburger.style.display = "flex";
            hamburger.style.flexDirection = "column";
            hamburger.style.gap = "5px";
            hamburger.style.cursor = "pointer";
            hamburger.style.zIndex = "1001";
            console.log("Hamburger forced to show on mobile");
        }
    }

    // Check visibility on load and resize
    ensureHamburgerVisibility();
    window.addEventListener("resize", ensureHamburgerVisibility);
}));