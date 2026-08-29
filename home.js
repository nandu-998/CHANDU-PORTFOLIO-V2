/* =====================================================
   CHANDU PORTFOLIO
   HOME PAGE JAVASCRIPT
===================================================== */


/* ================= THEME ================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


function setTheme(mode) {

    if (mode === "dark") {

        document.body.classList.add("dark");

        themeIcon.textContent = "☾";

        localStorage.setItem(
            "chandu-theme",
            "dark"
        );

    } else {

        document.body.classList.remove("dark");

        themeIcon.textContent = "☼";

        localStorage.setItem(
            "chandu-theme",
            "light"
        );

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("chandu-theme");


if (savedTheme === "dark") {

    setTheme("dark");

} else {

    setTheme("light");

}


/* Toggle */

themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.classList.contains("dark");

        setTheme(
            isDark
                ? "light"
                : "dark"
        );

    }
);


/* ================= MOUSE FOLLOW GLOW ================= */

const mouseGlow =
    document.querySelector(".mouse-glow");


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


function animateGlow() {

    currentX +=
        (mouseX - currentX) * 0.08;

    currentY +=
        (mouseY - currentY) * 0.08;

    mouseGlow.style.left =
        `${currentX}px`;

    mouseGlow.style.top =
        `${currentY}px`;

    requestAnimationFrame(
        animateGlow
    );

}


animateGlow();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".section-reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* ================= ACTIVE NAV ================= */

/*
   Home page has no active page link.
   When another page is opened,
   that page's own JS can add .active.
*/

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


document.querySelectorAll(
    ".nav-link"
).forEach(
    (link) => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    }
);


/* ================= CARD MAGNETIC EFFECT ================= */

const cards =
    document.querySelectorAll(
        ".area-card, .stat-card"
    );


cards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                card.style.transform =
                    `translate(${x * 0.025}px, ${y * 0.025}px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);