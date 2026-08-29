/* =========================================================
   CHANDU PORTFOLIO
   EXPERIENCE PAGE JS
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

        const dark =
            document.body.classList.contains("dark");

        const next =
            dark ? "light" : "dark";

        applyTheme(next);

        localStorage.setItem(
            "portfolio-theme",
            next
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

let currentX =
    mouseX;

let currentY =
    mouseY;


window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function animateLight() {

    currentX +=
        (mouseX - currentX) * .08;

    currentY +=
        (mouseY - currentY) * .08;


    mouseLight.style.left =
        `${currentX}px`;

    mouseLight.style.top =
        `${currentY}px`;


    requestAnimationFrame(
        animateLight
    );

}


animateLight();



/* =========================================================
   SCROLL REVEAL
========================================================= */

const cards =
    document.querySelectorAll(
        ".experience-card, .stat, .leadership-card, .close-panel"
    );


cards.forEach(
    element => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(50px)";

        element.style.transition =
            "opacity .9s ease, transform 1s cubic-bezier(.2,.8,.2,1)";

    }
);


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


cards.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   EXPERIENCE CARD TILT
========================================================= */

const experienceCards =
    document.querySelectorAll(
        ".card-main"
    );


experienceCards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 3;


                const rotateX =
                    ((y / rect.height) - .5) * -3;


                card.style.transform =
                    `perspective(1000px)
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



/* =========================================================
   STAT CARD TILT
========================================================= */

const stats =
    document.querySelectorAll(
        ".stat"
    );


stats.forEach(
    stat => {

        stat.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    stat.getBoundingClientRect();


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


                stat.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        stat.addEventListener(
            "mouseleave",
            () => {

                stat.style.transform =
                    "";

            }
        );

    }
);