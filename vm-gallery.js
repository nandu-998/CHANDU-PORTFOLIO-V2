/* =========================================================
   VM GALLERY JS
   CHANDU PORTFOLIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       IMAGE DATA
    ====================================================== */

    const galleryImages = [

        /* PLANOGRAMS */
        {
            src: "assets/planogram1.jpeg",
            category: "planograms"
        },
        {
            src: "assets/planogram2.jpeg",
            category: "planograms"
        },
        {
            src: "assets/planogram3.jpeg",
            category: "planograms"
        },
        {
            src: "assets/planogram4.jpeg",
            category: "planograms"
        },
        {
            src: "assets/planogram5.jpeg",
            category: "planograms"
        },
        {
            src: "assets/planogram6.jpeg",
            category: "planograms"
        },
        {
            src: "assets/planogram7.jpeg",
            category: "planograms"
        },


        /* DISPLAY */
        {
            src: "assets/d1.jpeg",
            category: "display"
        },
        {
            src: "assets/d2.jpeg",
            category: "display"
        },
        {
            src: "assets/d3.jpeg",
            category: "display"
        },
        {
            src: "assets/d4.jpeg",
            category: "display"
        },
        {
            src: "assets/d5.jpeg",
            category: "display"
        },
        {
            src: "assets/d6.jpeg",
            category: "display"
        },
        {
            src: "assets/d7.jpeg",
            category: "display"
        },
        {
            src: "assets/d8.jpeg",
            category: "display"
        },


        /* CAMPAIGNS */
        {
            src: "assets/Campaigns1.jpeg",
            category: "campaigns"
        },
        {
            src: "assets/Campaigns2.jpeg",
            category: "campaigns"
        },
        {
            src: "assets/Campaigns3.jpeg",
            category: "campaigns"
        },
        {
            src: "assets/Campaigns4.jpeg",
            category: "campaigns"
        },
        {
            src: "assets/Campaigns5.jpeg",
            category: "campaigns"
        },


        /* STYLING */
        {
            src: "assets/styling1.jpeg",
            category: "styling"
        },
        {
            src: "assets/styling2.jpeg",
            category: "styling"
        },
        {
            src: "assets/styling3.jpeg",
            category: "styling"
        },
        {
            src: "assets/styling4.jpeg",
            category: "styling"
        },
        {
            src: "assets/styling5.jpeg",
            category: "styling"
        },
        {
            src: "assets/styling6.jpeg",
            category: "styling"
        },
        {
            src: "assets/styling7.jpeg",
            category: "styling"
        },


        /* PROJECTS */
        {
            src: "assets/project1.jpeg",
            category: "projects"
        },
        {
            src: "assets/project2.jpeg",
            category: "projects"
        },
        {
            src: "assets/project3.jpeg",
            category: "projects"
        }

    ];


    /* =====================================================
       HORIZONTAL AUTO IMAGE STRIP
    ====================================================== */

    const stripTrack =
        document.getElementById("stripTrack");

    if (stripTrack) {

        const stripImages =
            galleryImages
                .map((image, index) => {

                    return `
                        <img
                            class="strip-image"
                            src="${image.src}"
                            data-index="${index}"
                            alt="${image.category}"
                            loading="lazy"
                        >
                    `;

                })
                .join("");

        /*
         * Duplicate the images.
         * This creates a continuous seamless marquee.
         */

        stripTrack.innerHTML =
            stripImages + stripImages;

    }


    /* =====================================================
       FILTER SYSTEM
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const sections =
        document.querySelectorAll(".gallery-section");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /* Active button */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            /* Show / hide categories */

            sections.forEach(section => {

                const category =
                    section.dataset.category;


                if (
                    filter === "all" ||
                    filter === category
                ) {

                    section.classList.remove(
                        "filtered-out"
                    );

                } else {

                    section.classList.add(
                        "filtered-out"
                    );

                }

            });


            /*
             * Move to selected category.
             */

            if (filter !== "all") {

                const target =
                    document.getElementById(filter);

                if (target) {

                    setTimeout(() => {

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 80);

                }

            } else {

                document
                    .getElementById("galleryStart")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

        });

    });


    /* =====================================================
       GALLERY IMAGE FULLSCREEN
    ====================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const currentImage =
        document.getElementById("currentImage");

    const totalImages =
        document.getElementById("totalImages");


    let currentIndex = 0;


    /*
     * Only currently available gallery images
     * are used in the lightbox.
     */

    function getVisibleImages() {

        const activeSection =
            document.querySelector(
                ".gallery-section:not(.filtered-out)"
            );

        if (!activeSection) {

            return galleryImages;

        }

        const images =
            [...document.querySelectorAll(
                ".gallery-section:not(.filtered-out) .gallery-card img"
            )];

        return images.map(img => ({
            src: img.src,
            alt: img.alt
        }));

    }


    function openLightbox(src, alt, index = 0) {

        const images =
            getVisibleImages();

        currentIndex =
            Math.max(
                0,
                Math.min(index, images.length - 1)
            );

        lightboxImage.src = src;
        lightboxImage.alt = alt || "";

        updateCounter(images.length);

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    function updateCounter(total) {

        currentImage.textContent =
            String(currentIndex + 1)
                .padStart(2, "0");

        totalImages.textContent =
            String(total)
                .padStart(2, "0");

    }


    function showImage(direction) {

        const images =
            getVisibleImages();

        if (!images.length) return;

        currentIndex += direction;


        if (currentIndex < 0) {

            currentIndex =
                images.length - 1;

        }

        if (currentIndex >= images.length) {

            currentIndex = 0;

        }


        const image =
            images[currentIndex];

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt || "";

        updateCounter(images.length);

    }


    /* Gallery cards */

    document
        .querySelectorAll(".gallery-card img")
        .forEach((image) => {

            image.addEventListener("click", () => {

                const visibleImages =
                    getVisibleImages();

                const index =
                    visibleImages.findIndex(
                        item =>
                            item.src === image.src
                    );

                openLightbox(
                    image.src,
                    image.alt,
                    index
                );

            });

        });


    /* Horizontal strip */

    document
        .querySelectorAll(".strip-image")
        .forEach(image => {

            image.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            image.dataset.index
                        );

                    const data =
                        galleryImages[index];

                    openLightbox(
                        data.src,
                        data.category,
                        index
                    );

                }
            );

        });


    lightboxClose
        ?.addEventListener(
            "click",
            closeLightbox
        );


    lightboxPrev
        ?.addEventListener(
            "click",
            () => showImage(-1)
        );


    lightboxNext
        ?.addEventListener(
            "click",
            () => showImage(1)
        );


    /* Close by clicking outside image */

    lightbox
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


    /* Keyboard navigation */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "open"
                )
            ) {
                return;
            }

            if (event.key === "Escape") {

                closeLightbox();

            }

            if (event.key === "ArrowLeft") {

                showImage(-1);

            }

            if (event.key === "ArrowRight") {

                showImage(1);

            }

        }
    );


    /* =====================================================
       VIEW ALL BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".view-all")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.closest(
                            ".gallery-section"
                        );

                    if (!section) return;

                    const images =
                        section.querySelectorAll(
                            ".gallery-card img"
                        );

                    if (!images.length) return;

                    images[0].click();

                }
            );

        });


    /* =====================================================
       EXPLORE BUTTON
    ====================================================== */

    document
        .querySelectorAll(
            "[data-scroll-target]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        document.querySelector(
                            button.dataset.scrollTarget
                        );

                    target?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       SCROLL TOP
    ====================================================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 600
            ) {

                scrollTop.classList.add(
                    "visible"
                );

            } else {

                scrollTop.classList.remove(
                    "visible"
                );

            }

        },
        { passive: true }
    );


    scrollTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       INTERSECTION REVEAL
    ====================================================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    document
        .querySelectorAll(
            ".gallery-section"
        )
        .forEach(section => {

            observer.observe(section);

        });


    /* =====================================================
       TOUCH SWIPE FOR LIGHTBOX
    ====================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox
        ?.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            { passive: true }
        );


    lightbox
        ?.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;

                const distance =
                    touchEndX - touchStartX;

                if (
                    Math.abs(distance) < 50
                ) {
                    return;
                }

                if (distance < 0) {

                    showImage(1);

                } else {

                    showImage(-1);

                }

            },
            { passive: true }
        );


    /* =====================================================
       IMAGE ERROR HANDLING
    ====================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.opacity = "0";

                }
            );

        });

});