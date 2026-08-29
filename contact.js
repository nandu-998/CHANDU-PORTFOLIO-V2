/* =========================================
   CONTACT PAGE CONFIG
========================================= */


/*
   IMPORTANT:
   Replace this with your actual WhatsApp number.

   Example:
   919876543210

   Don't use + or spaces.
*/

const WHATSAPP_NUMBER = "917093489320";


/*
   Your LinkedIn
*/

const LINKEDIN_URL =
    "https://www.linkedin.com/in/r-chandu-visualmerchandising";


/*
   Replace with your actual email.
*/

const EMAIL =
    "chandur9989@gmail.com";


/*
   Portfolio URL

   If the portfolio is hosted on GitHub Pages,
   keep your live portfolio URL here.
*/

const PORTFOLIO_URL =
    "https://nandu-998.github.io/portfolio/";


/* =========================================
   THEME
========================================= */

const themeButton =
    document.getElementById("themeButton");

const themeIcon =
    document.getElementById("themeIcon");


const savedTheme =
    localStorage.getItem("chandu-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeIcon.textContent = "☀";

}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const isLight =
        document.body.classList.contains("light");


    themeIcon.textContent =
        isLight ? "☀" : "☾";


    localStorage.setItem(
        "chandu-theme",
        isLight ? "light" : "dark"
    );

});


/* =========================================
   WHATSAPP DIRECT
========================================= */

const whatsappDirect =
    document.getElementById(
        "whatsappDirect"
    );


const defaultWhatsAppMessage =
    "Hi Chandu, I visited your portfolio and would like to connect with you.";


whatsappDirect.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        defaultWhatsAppMessage
    )}`;


/* =========================================
   EMAIL
========================================= */

const emailDirect =
    document.getElementById(
        "emailDirect"
    );


emailDirect.href =
    `mailto:${EMAIL}?subject=${encodeURIComponent(
        "Portfolio Contact — CHANDU"
    )}`;


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "visitorName"
            ).value.trim();


        const email =
            document.getElementById(
                "visitorEmail"
            ).value.trim();


        const message =
            document.getElementById(
                "visitorMessage"
            ).value.trim();


        if (
            !name ||
            !email ||
            !message
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        const whatsappMessage =
`Hi Chandu,

My name is ${name}.

Email: ${email}

Message:
${message}

I contacted you through your portfolio.`;


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/* =========================================
   SHARE PORTFOLIO
========================================= */

const shareButton =
    document.getElementById(
        "shareButton"
    );


shareButton.addEventListener(
    "click",
    async () => {

        const shareData = {

            title:
                "CHANDU — Visual Merchandising Portfolio",

            text:
                "Check out CHANDU's Visual Merchandising Portfolio.",

            url:
                PORTFOLIO_URL

        };


        /*
           Mobile / supported browsers
        */

        if (
            navigator.share
        ) {

            try {

                await navigator.share(
                    shareData
                );

            } catch (error) {

                /*
                   User cancelled share.
                   No action required.
                */

            }

            return;

        }


        /*
           Desktop fallback
        */

        try {

            await navigator.clipboard.writeText(
                PORTFOLIO_URL
            );


            showButtonMessage(
                shareButton,
                "LINK COPIED ✓"
            );

        } catch {

            alert(
                PORTFOLIO_URL
            );

        }

    }
);


/* =========================================
   COPY PORTFOLIO LINK
========================================= */

const copyButton =
    document.getElementById(
        "copyButton"
    );


copyButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                PORTFOLIO_URL
            );


            showButtonMessage(
                copyButton,
                "COPIED ✓"
            );

        } catch {

            /*
               Older browsers fallback
            */

            const temp =
                document.createElement(
                    "textarea"
                );

            temp.value =
                PORTFOLIO_URL;

            document.body.appendChild(
                temp
            );

            temp.select();

            document.execCommand(
                "copy"
            );

            temp.remove();


            showButtonMessage(
                copyButton,
                "COPIED ✓"
            );

        }

    }
);


/* =========================================
   BUTTON FEEDBACK
========================================= */

function showButtonMessage(
    button,
    message
) {

    const original =
        button.innerHTML;


    button.innerHTML =
        `<span>${message}</span>`;


    setTimeout(() => {

        button.innerHTML =
            original;

    }, 1800);

}


/* =========================================
   MOUSE GLOW MOVEMENT
========================================= */

const glows =
    document.querySelectorAll(
        ".bg-glow"
    );


document.addEventListener(
    "mousemove",
    event => {

        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        glows.forEach(
            (glow, index) => {

                const strength =
                    (index + 1) * 14;


                glow.style.transform =
                    `translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )`;

            }
        );

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems =
    document.querySelectorAll(
        ".profile-glass, .message-glass, .connect-card, .share-glass, .resume-glass"
    );


const observer =
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
                                    "translateY(45px)"
                            },

                            {
                                opacity: 1,

                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 850,

                            easing:
                                "cubic-bezier(.16,1,.3,1)",

                            fill: "forwards"
                        }
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealItems.forEach(
    item => observer.observe(item)
);