/* =========================================================
   CHANDU PORTFOLIO
   SKILLS PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.querySelector(".theme-icon");



    /* =====================================================
       THEME SYSTEM
    ===================================================== */

    const savedTheme = localStorage.getItem("chandu-theme");

    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeIcon) return;

        if (body.classList.contains("dark-mode")) {

            themeIcon.textContent = "☾";

        } else {

            themeIcon.textContent = "☼";

        }

    }


    updateThemeIcon();



    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const isDark =
                body.classList.contains("dark-mode");

            localStorage.setItem(
                "chandu-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }



    /* =====================================================
       SKILL PROGRESS ANIMATION
    ===================================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");


    const progressObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const card = entry.target;

                    const level =
                        card.dataset.level || 0;

                    const progress =
                        card.querySelector(".progress span");

                    if (progress) {

                        requestAnimationFrame(() => {

                            progress.style.width =
                                `${level}%`;

                        });

                    }

                    observer.unobserve(card);

                });

            },
            {
                threshold: 0.25
            }
        );


    skillCards.forEach(card => {

        progressObserver.observe(card);

    });



    /* =====================================================
       3D MOUSE EFFECT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".skill-card, .core-card"
        );


    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".skill-section, .skills-cta"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08
            }
        );


    revealItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(35px)";

        item.style.transition =
            "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)";

        revealObserver.observe(item);

    });


    /* =====================================================
       REVEAL CLASS
    ===================================================== */

    document.addEventListener(
        "scroll",
        () => {

            document
                .querySelectorAll(".visible")
                .forEach(item => {

                    item.style.opacity = "1";

                    item.style.transform =
                        "translateY(0)";

                });

        },
        {
            passive: true
        }
    );



    /* =====================================================
       ACTIVE NAV
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            if (
                href.toLowerCase() === currentPage
            ) {

                link.classList.add("active");

            }

        });

});