/* =========================================================
   CHANDU PORTFOLIO
   NAVIGATION + ACTIVE GLASS + DARK MODE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section");

const themeToggle =
    document.getElementById("themeToggle");


/* =========================================================
   NAV CLICK
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        /* Remove active from every item */
        navLinks.forEach((item) => {
            item.classList.remove("active");
        });


        /* Apply glass effect to clicked item */
        link.classList.add("active");

    });

});


/* =========================================================
   SCROLL ACTIVE SECTION
========================================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentID =
                    entry.target.id;


                navLinks.forEach((link) => {

                    link.classList.remove("active");


                    if (
                        link.getAttribute("href") ===
                        `#${currentID}`
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },
        {
            threshold: 0.55
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("chandu-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "chandu-theme",
        isDark ? "dark" : "light"
    );

});