/* ============================================================
   PRAFOLIO
   Living Creative Universe — V1
============================================================ */

(() => {

    "use strict";


    /* ========================================================
       ELEMENTS
    ========================================================= */

    const body = document.body;

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");

    const cursor =
        document.getElementById("cursor");

    const pageTransition =
        document.getElementById("pageTransition");

    const transitionNumber =
        document.getElementById("transitionNumber");

    const transitionGerman =
        document.getElementById("transitionGerman");

    const navNumber =
        document.getElementById("navNumber");

    const navGerman =
        document.getElementById("navGerman");

    const shareButton =
        document.getElementById("shareButton");

    const copyButton =
        document.getElementById("copyButton");


    /* ========================================================
       NUMBER SYSTEM
       German is intentionally ONLY used for numbers.
    ======================================================== */

    const numberSystem = {

        home: {
            number: "01",
            german: "EINS",
            accent: "#8be9ff"
        },

        work: {
            number: "02",
            german: "ZWEI",
            accent: "#a98bff"
        },

        experiments: {
            number: "03",
            german: "DREI",
            accent: "#63e5d1"
        },

        production: {
            number: "04",
            german: "VIER",
            accent: "#ff9c70"
        },

        about: {
            number: "05",
            german: "FÜNF",
            accent: "#f2d38a"
        },

        resume: {
            number: "06",
            german: "SECHS",
            accent: "#c7d0d7"
        },

        contact: {
            number: "07",
            german: "SIEBEN",
            accent: "#78e6a4"
        }

    };


    /* ========================================================
       SECTION STATE
    ======================================================== */

    function setSectionState(sectionName) {

        const state =
            numberSystem[sectionName] ||
            numberSystem.home;

        document.documentElement.style.setProperty(
            "--section-accent",
            state.accent
        );

        navNumber.textContent =
            state.number;

        navGerman.textContent =
            state.german;

        transitionNumber.textContent =
            state.number;

        transitionGerman.textContent =
            state.german;

    }


    /* ========================================================
       MENU
    ======================================================== */

    function openMenu() {

        body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        navigation.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeMenu() {

        body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        navigation.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    menuButton.addEventListener("click", () => {

        if (body.classList.contains("menu-open")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* ========================================================
       SMOOTH SECTION NAVIGATION
    ======================================================== */

    const navigationLinks =
        document.querySelectorAll(
            "[data-section]"
        );


    function navigateToSection(sectionName) {

        const target =
            document.getElementById(sectionName);

        if (!target) return;

        setSectionState(sectionName);

        closeMenu();

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            target.scrollIntoView();

            return;

        }


        pageTransition.classList.add("active");


        window.setTimeout(() => {

            target.scrollIntoView({
                behavior: "auto",
                block: "start"
            });

        }, 300);


        window.setTimeout(() => {

            pageTransition.classList.remove("active");

        }, 850);

    }


    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            navigateToSection(
                link.dataset.section
            );

        });

    });


    const directNavigation =
        document.querySelectorAll(
            "[data-navigate]"
        );


    directNavigation.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            navigateToSection(
                link.dataset.navigate
            );

        });

    });


    /* ========================================================
       POINTER / MOUSE RESPONSE
    ======================================================== */

    let pointerX = 50;
    let pointerY = 50;

    let targetX = 50;
    let targetY = 50;


    function updatePointer() {

        pointerX +=
            (targetX - pointerX) * 0.08;

        pointerY +=
            (targetY - pointerY) * 0.08;


        document.documentElement.style.setProperty(
            "--mx",
            `${pointerX}%`
        );

        document.documentElement.style.setProperty(
            "--my",
            `${pointerY}%`
        );


        requestAnimationFrame(updatePointer);

    }


    updatePointer();


    window.addEventListener(
        "pointermove",
        event => {

            targetX =
                (event.clientX / window.innerWidth) * 100;

            targetY =
                (event.clientY / window.innerHeight) * 100;

            if (
                event.pointerType === "mouse" ||
                event.pointerType === "pen"
            ) {

                cursor.classList.add("active");

            }

        },
        { passive: true }
    );


    window.addEventListener(
        "pointerleave",
        () => {
            cursor.classList.remove("active");
        }
    );


    /* ========================================================
       CUSTOM CURSOR
    ======================================================== */

    window.addEventListener(
        "pointermove",
        event => {

            if (
                event.pointerType !== "mouse" &&
                event.pointerType !== "pen"
            ) {
                return;
            }

            cursor.style.left =
                `${event.clientX}px`;

            cursor.style.top =
                `${event.clientY}px`;

        },
        { passive: true }
    );


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project-card, .process-step"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                cursor.classList.add("hovering");
            }
        );


        element.addEventListener(
            "mouseleave",
            () => {
                cursor.classList.remove("hovering");
            }
        );

    });


    /* ========================================================
       SECTION OBSERVER
    ======================================================== */

    const sections =
        document.querySelectorAll(
            "[data-section-name]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.35
                    ) {

                        setSectionState(
                            entry.target.dataset.sectionName
                        );

                    }

                });

            },
            {
                threshold: [0.35, 0.6]
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* ========================================================
       SHARE
    ======================================================== */

    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async () => {

                const shareData = {

                    title:
                        "PRAfolio — Pratham Chhabra",

                    text:
                        "Explore PRAfolio by Pratham Chhabra.",

                    url:
                        window.location.href

                };


                if (
                    navigator.share &&
                    navigator.canShare &&
                    navigator.canShare(shareData)
                ) {

                    try {

                        await navigator.share(
                            shareData
                        );

                    } catch (error) {

                        /*
                         User cancelled sharing.
                         No action required.
                        */

                    }

                    return;

                }


                copyCurrentUrl();

            }
        );

    }


    /* ========================================================
       COPY LINK
    ======================================================== */

    async function copyCurrentUrl() {

        const url =
            window.location.href;


        try {

            await navigator.clipboard.writeText(
                url
            );

            showTemporaryButtonMessage(
                copyButton,
                "Copied ✓"
            );

        } catch (error) {

            showTemporaryButtonMessage(
                copyButton,
                "Copy unavailable"
            );

        }

    }


    if (copyButton) {

        copyButton.addEventListener(
            "click",
            copyCurrentUrl
        );

    }


    function showTemporaryButtonMessage(
        button,
        message
    ) {

        if (!button) return;


        const original =
            button.innerHTML;


        button.innerHTML =
            `${message}`;


        window.setTimeout(() => {

            button.innerHTML =
                original;

        }, 1600);

    }


    /* ========================================================
       KEYBOARD ACCESSIBILITY
    ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                body.classList.contains("menu-open")
            ) {

                closeMenu();

            }

        }
    );


    /* ========================================================
       RESUME PLACEHOLDER
    ======================================================== */

    const resumeButton =
        document.getElementById("resumeButton");


    if (resumeButton) {

        resumeButton.addEventListener(
            "click",
            event => {

                /*
                 Temporary behavior.

                 Later replace href="#"
                 with the final resume URL/file.
                */

                event.preventDefault();

                showTemporaryButtonMessage(
                    resumeButton,
                    "Resume coming soon"
                );

            }
        );

    }


    /* ========================================================
       INITIAL STATE
    ======================================================== */

    setSectionState("home");
   

   })();
