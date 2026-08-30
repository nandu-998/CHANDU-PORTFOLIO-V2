/* =========================================================
   CHANDU PORTFOLIO
   CONTACT PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   YOUR CONTACT DETAILS
   EDIT ONLY THIS SECTION
========================================================= */

const CONTACT = {

    /* Your Gmail */
    email: "chandur9989@gmail.com",

    /* Your phone number with country code */
    phone: "917093489320",

    /* WhatsApp number with country code
       NO + symbol
       NO spaces
       Example: 919876543210
    */
    whatsapp: "917093489320",

    /* Your LinkedIn */
    linkedin:
        "https://www.linkedin.com/in/r-chandu-visualmerchandising",

    /* Your portfolio */
    portfolio:
        "https://nandu-998.github.io/CHANDU-PORTFOLIO-V2/",

    /* Resume location */
    resume:
        "assets/CHANDU_RESUME.pdf"

};


/* =========================================================
   DOM
========================================================= */

const body =
    document.body;

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const emailLink =
    document.getElementById("emailLink");

const emailText =
    document.getElementById("emailText");

const phoneLink =
    document.getElementById("phoneLink");

const phoneText =
    document.getElementById("phoneText");

const whatsappLink =
    document.getElementById("whatsappLink");

const shareButton =
    document.getElementById("shareButton");

const copyButton =
    document.getElementById("copyButton");

const contactForm =
    document.getElementById("contactForm");

const toast =
    document.getElementById("toast");

const mouseGlow =
    document.querySelector(".mouse-glow");


/* =========================================================
   LOAD CONTACT DETAILS
========================================================= */

function loadContactDetails() {

    /*
     * EMAIL
     */

    emailText.textContent =
        CONTACT.email;

    emailLink.href =
        `mailto:${CONTACT.email}`;


    /*
     * PHONE
     */

    const formattedPhone =
        CONTACT.phone.startsWith("91")
            ? `+${CONTACT.phone.slice(0, 2)} ${CONTACT.phone.slice(2)}`
            : CONTACT.phone;

    phoneText.textContent =
        formattedPhone;

    phoneLink.href =
        `tel:+${CONTACT.phone}`;


    /*
     * WHATSAPP
     */

    const whatsappMessage =
        encodeURIComponent(
            "Hi Chandu, I found your portfolio and would like to connect with you."
        );

    whatsappLink.href =
        `https://wa.me/${CONTACT.whatsapp}?text=${whatsappMessage}`;
}


/* =========================================================
   THEME
========================================================= */

function setTheme(theme) {

    if (theme === "dark") {

        body.classList.add("dark-mode");

        themeIcon.textContent =
            "☾";

        localStorage.setItem(
            "chandu-theme",
            "dark"
        );

    } else {

        body.classList.remove("dark-mode");

        themeIcon.textContent =
            "☼";

        localStorage.setItem(
            "chandu-theme",
            "light"
        );
    }
}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("chandu-theme");

    if (savedTheme) {

        setTheme(savedTheme);

        return;
    }


    /*
     * Use system preference
     */

    const prefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    setTheme(
        prefersDark
            ? "dark"
            : "light"
    );
}


themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            body.classList.contains("dark-mode");

        setTheme(
            isDark
                ? "light"
                : "dark"
        );
    }
);


/* =========================================================
   MOUSE FOLLOW GLOW
========================================================= */

let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;
    },
    { passive: true }
);


function animateGlow() {

    glowX +=
        (mouseX - glowX) * 0.08;

    glowY +=
        (mouseY - glowY) * 0.08;


    mouseGlow.style.left =
        `${glowX}px`;

    mouseGlow.style.top =
        `${glowY}px`;


    requestAnimationFrame(
        animateGlow
    );
}


animateGlow();


/* =========================================================
   PORTFOLIO SHARE
========================================================= */

async function sharePortfolio() {

    const shareData = {

        title:
            "CHANDU — Visual Merchandiser",

        text:
            "Check out CHANDU's Visual Merchandising portfolio.",

        url:
            CONTACT.portfolio
    };


    /*
     * Native mobile/browser share
     */

    if (
        navigator.share &&
        window.isSecureContext
    ) {

        try {

            await navigator.share(
                shareData
            );

            showToast(
                "Portfolio shared"
            );

            return;

        } catch (error) {

            /*
             * User cancelled share.
             * Do nothing.
             */

            if (
                error.name ===
                "AbortError"
            ) {
                return;
            }
        }
    }


    /*
     * Fallback:
     * Copy portfolio URL
     */

    await copyPortfolio();

}


shareButton.addEventListener(
    "click",
    sharePortfolio
);


/* =========================================================
   COPY PORTFOLIO
========================================================= */

async function copyPortfolio() {

    try {

        await navigator.clipboard.writeText(
            CONTACT.portfolio
        );

        showToast(
            "Portfolio link copied"
        );

    } catch (error) {

        /*
         * Fallback for older browsers
         */

        const textarea =
            document.createElement("textarea");

        textarea.value =
            CONTACT.portfolio;

        document.body.appendChild(
            textarea
        );

        textarea.select();

        document.execCommand(
            "copy"
        );

        textarea.remove();

        showToast(
            "Portfolio link copied"
        );
    }
}


copyButton.addEventListener(
    "click",
    copyPortfolio
);


/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /*
         * Read form
         */

        const name =
            document
                .getElementById("name")
                .value
                .trim();

        const senderEmail =
            document
                .getElementById("senderEmail")
                .value
                .trim();

        const subject =
            document
                .getElementById("subject")
                .value
                .trim();

        const message =
            document
                .getElementById("message")
                .value
                .trim();


        /*
         * Validation
         */

        if (
            !name ||
            !senderEmail ||
            !subject ||
            !message
        ) {

            showToast(
                "Please complete all fields"
            );

            return;
        }


        /*
         * WhatsApp message
         */

        const whatsappText =

`Hi Chandu,

My name is ${name}.

Email: ${senderEmail}

Subject: ${subject}

Message:
${message}

Sent from your portfolio website.`;


        const encodedMessage =
            encodeURIComponent(
                whatsappText
            );


        const whatsappURL =
            `https://wa.me/${CONTACT.whatsapp}?text=${encodedMessage}`;


        /*
         * Open WhatsApp
         */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        /*
         * Reset form
         */

        contactForm.reset();

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* =========================================================
   RESUME PATH
========================================================= */

function updateResumeLinks() {

    const resumeLinks =
        document.querySelectorAll(
            'a[href*="CHANDU_RESUME.pdf"]'
        );


    resumeLinks.forEach(
        (link) => {

            link.href =
                CONTACT.resume;
        }
    );
}


/* =========================================================
   INITIALIZE
========================================================= */

function init() {

    loadContactDetails();

    loadTheme();

    updateResumeLinks();
}


init();
