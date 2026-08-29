/* =========================================
   SKILLS PAGE
========================================= */


/* =========================================
   DARK MODE
========================================= */

const darkToggle =
    document.getElementById("darkToggle");

const toggleIcon =
    darkToggle.querySelector(".toggle-icon");


darkToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const light =
        document.body.classList.contains(
            "light-mode"
        );

    toggleIcon.textContent =
        light ? "☀" : "☾";

});


/* =========================================
   SKILL CARDS
========================================= */

const skillCards =
    document.querySelectorAll(".skill-card");


/* =========================================
   SET INDIVIDUAL COLOUR
========================================= */

skillCards.forEach(card => {

    const color =
        card.dataset.color;

    card.style.setProperty(
        "--skill-color",
        color
    );

});


/* =========================================
   3D MOUSE FOLLOW
========================================= */

skillCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateY =
            ((mouseX - centerX) / centerX) * 10;

        const rotateX =
            ((centerY - mouseY) / centerY) * 10;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateZ(18px)`;


        const glow =
            card.querySelector(".skill-glow");


        if (glow) {

            glow.style.left =
                `${mouseX}px`;

            glow.style.top =
                `${mouseY}px`;

        }

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

        const glow =
            card.querySelector(".skill-glow");

        if (glow) {

            glow.style.left =
                "50%";

            glow.style.top =
                "50%";

        }

    });

});


/* =========================================
   360 DEGREE ROTATION
========================================= */

skillCards.forEach(card => {

    let lastTouch = 0;


    card.addEventListener("mouseenter", () => {

        const now =
            Date.now();


        /*
         Prevent the card from
         constantly rotating when
         moving between cards.
        */

        if (now - lastTouch < 1200) {
            return;
        }


        lastTouch = now;


        card.classList.remove("rotating");


        /*
         Force browser reflow so
         animation can restart.
        */

        void card.offsetWidth;


        card.classList.add("rotating");


        setTimeout(() => {

            card.classList.remove(
                "rotating"
            );

        }, 1000);

    });

});


/* =========================================
   MOBILE TOUCH
========================================= */

skillCards.forEach(card => {

    card.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.touches[0];

            const rect =
                card.getBoundingClientRect();


            const x =
                touch.clientX - rect.left;

            const y =
                touch.clientY - rect.top;


            const rotateY =
                ((x - rect.width / 2)
                / (rect.width / 2)) * 8;


            const rotateX =
                ((rect.height / 2 - y)
                / (rect.height / 2)) * 8;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(15px)`;


            card.classList.remove(
                "rotating"
            );


            void card.offsetWidth;


            card.classList.add(
                "rotating"
            );


            setTimeout(() => {

                card.style.transform = "";

                card.classList.remove(
                    "rotating"
                );

            }, 1000);

        },
        { passive: true }
    );

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealCards =
    document.querySelectorAll(
        ".skill-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    "translateY(70px)"
                            },

                            {
                                opacity: 1,
                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 900,
                            easing:
                                "cubic-bezier(.16,1,.3,1)",
                            fill: "forwards"
                        }
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .15
        }
    );


revealCards.forEach(card => {

    revealObserver.observe(card);

});


/* =========================================
   BACKGROUND MOUSE PARALLAX
========================================= */

const ambientOrbs =
    document.querySelectorAll(
        ".ambient"
    );


document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX /
            window.innerWidth - .5);

        const y =
            (event.clientY /
            window.innerHeight - .5);


        ambientOrbs.forEach(
            (orb, index) => {

                const strength =
                    (index + 1) * 18;


                orb.style.transform =
                    `translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )`;

            }
        );

    }
);


/* =========================================
   CARD CLICK FEEDBACK
========================================= */

skillCards.forEach(card => {

    card.addEventListener("click", () => {

        card.animate(
            [
                {
                    scale: 1
                },
                {
                    scale: 1.04
                },
                {
                    scale: 1
                }
            ],
            {
                duration: 500,
                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );

    });

});