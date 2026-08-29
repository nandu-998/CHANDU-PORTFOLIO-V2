/* =========================================================
   CHANDU PORTFOLIO
   CREATIVE ABOUT PAGE
========================================================= */


/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeIcon.textContent = "☾";

    } else {

        document.body.classList.remove("dark");

        themeIcon.textContent = "☼";

    }

}


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme) {

    applyTheme(savedTheme);

} else {

    applyTheme("light");

}


themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.classList.contains("dark");

        const nextTheme =
            isDark
                ? "light"
                : "dark";

        applyTheme(nextTheme);

        localStorage.setItem(
            "portfolio-theme",
            nextTheme
        );

    }
);



/* =========================================================
   MOUSE FOLLOW LIGHT
========================================================= */

const mouseLight =
    document.querySelector(".mouse-light");


let mouseX =
    window.innerWidth / 2;

let mouseY =
    window.innerHeight / 2;

let lightX =
    mouseX;

let lightY =
    mouseY;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function moveLight() {

    lightX +=
        (mouseX - lightX) * .08;

    lightY +=
        (mouseY - lightY) * .08;


    mouseLight.style.left =
        `${lightX}px`;

    mouseLight.style.top =
        `${lightY}px`;


    requestAnimationFrame(
        moveLight
    );

}


moveLight();



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = [

    ".profile-stage",
    ".philosophy",
    ".journey-section",
    ".about-close"

];


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    selector => {

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );

            });

    }
);



/* =========================================================
   GLASS SHEET MOVEMENT
========================================================= */

const profileStage =
    document.querySelector(
        ".profile-stage"
    );

const sheetLeft =
    document.querySelector(
        ".sheet-left"
    );

const sheetRight =
    document.querySelector(
        ".sheet-right"
    );


profileStage.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            profileStage.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left -
            rect.width / 2;


        const y =
            event.clientY -
            rect.top -
            rect.height / 2;


        sheetLeft.style.transform =
            `translate(${x * .015}px, ${y * .01}px) rotate(-7deg)`;


        sheetRight.style.transform =
            `translate(${x * -.012}px, ${y * -.008}px) rotate(5deg)`;

    }
);


profileStage.addEventListener(
    "mouseleave",
    () => {

        sheetLeft.style.transform =
            "rotate(-7deg)";

        sheetRight.style.transform =
            "rotate(5deg)";

    }
);



/* =========================================================
   CARD TILT
========================================================= */

const cards =
    document.querySelectorAll(
        ".philosophy-card"
    );


cards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 5;


                const rotateX =
                    ((y / rect.height) - .5) * -5;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

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