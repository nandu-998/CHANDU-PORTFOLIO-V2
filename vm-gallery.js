/* =========================================
   VM GALLERY JAVASCRIPT
========================================= */


/* =========================================
   DARK / LIGHT MODE
========================================= */

const darkToggle = document.getElementById("darkToggle");

const toggleIcon = darkToggle.querySelector(".toggle-icon");

darkToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const lightMode =
        document.body.classList.contains("light-mode");

    if (lightMode) {

        toggleIcon.textContent = "☀";

    } else {

        toggleIcon.textContent = "☾";

    }

});


/* =========================================
   FILTER SYSTEM
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const categories =
    document.querySelectorAll(".gallery-category");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove previous active */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Activate selected */

        button.classList.add("active");


        const selected =
            button.dataset.filter;


        /* ALL */

        if (selected === "all") {

            categories.forEach(category => {

                category.style.display = "block";

            });

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return;
        }


        /* Hide / show categories */

        categories.forEach(category => {

            const categoryName =
                category.dataset.category;

            if (categoryName === selected) {

                category.style.display = "block";

                setTimeout(() => {

                    category.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 50);

            } else {

                category.style.display = "none";

            }

        });

    });

});


/* =========================================
   REVEAL ANIMATION
========================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


galleryItems.forEach(item => {

    revealObserver.observe(item);

});


/* =========================================
   LIGHTBOX
========================================= */

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

const lightboxCounter =
    document.getElementById("lightboxCounter");


let allImages = [];

let currentImageIndex = 0;


/* =========================================
   GET ALL GALLERY IMAGES
========================================= */

function collectImages() {

    allImages = [];

    document
        .querySelectorAll(".gallery-item img, .auto-card img")
        .forEach(image => {

            allImages.push(image.src);

        });

}


/* Initial collection */

collectImages();


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {

    currentImageIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   UPDATE LIGHTBOX
========================================= */

function updateLightbox() {

    if (!allImages.length) return;

    lightboxImage.src =
        allImages[currentImageIndex];

    lightboxCounter.textContent =
        `${String(currentImageIndex + 1).padStart(2, "0")} / ${String(allImages.length).padStart(2, "0")}`;

}


/* =========================================
   IMAGE CLICK
========================================= */

function attachImageClicks() {

    const images =
        document.querySelectorAll(
            ".gallery-item img, .auto-card img"
        );

    images.forEach((image, index) => {

        image.addEventListener("click", () => {

            openLightbox(index);

        });

    });

}

attachImageClicks();


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* Click outside image */

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================================
   NEXT IMAGE
========================================= */

function nextImage() {

    currentImageIndex++;

    if (currentImageIndex >= allImages.length) {

        currentImageIndex = 0;

    }

    updateLightbox();

}


lightboxNext.addEventListener(
    "click",
    nextImage
);


/* =========================================
   PREVIOUS IMAGE
========================================= */

function previousImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex =
            allImages.length - 1;

    }

    updateLightbox();

}


lightboxPrev.addEventListener(
    "click",
    previousImage
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowRight") {

        nextImage();

    }


    if (event.key === "ArrowLeft") {

        previousImage();

    }

});


/* =========================================
   TOUCH / SWIPE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    if (Math.abs(distance) < 50) {

        return;

    }


    if (distance < 0) {

        nextImage();

    } else {

        previousImage();

    }

}


/* =========================================
   DUPLICATE AUTO-SCROLL CONTENT
========================================= */

const autoTrack =
    document.getElementById("autoTrack");


if (autoTrack) {

    const originalCards =
        [...autoTrack.children];


    originalCards.forEach(card => {

        const clone =
            card.cloneNode(true);

        autoTrack.appendChild(clone);

    });

}


/* =========================================
   PAUSE AUTO SCROLL ON HOVER
========================================= */

const autoWrapper =
    document.querySelector(".auto-track-wrapper");


if (autoWrapper) {

    autoWrapper.addEventListener(
        "mouseenter",
        () => {

            autoTrack.style.animationPlayState =
                "paused";

        }
    );


    autoWrapper.addEventListener(
        "mouseleave",
        () => {

            autoTrack.style.animationPlayState =
                "running";

        }
    );

}


/* =========================================
   PARALLAX GLASS EFFECT
========================================= */

document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        document
            .querySelectorAll(".background-orb")
            .forEach((orb, index) => {

                const strength =
                    (index + 1) * 12;

                orb.style.transform =
                    `translate(${x * strength}px, ${y * strength}px)`;

            });

    }
);