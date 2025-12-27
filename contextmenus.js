const menu = document.querySelector("#menu");
const menu2 = document.querySelector("#menu2");
const menu3 = document.querySelector("#menu3");
const menu4 = document.querySelector("#menu4");
let menuVisible = false;

const toggleMenu = command => {
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = command === "show";
};

const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu("show");
};

// --- YOUR ORIGINAL CODE (unchanged) ---
window.addEventListener("click", e => {
    if (menuVisible) toggleMenu("hide");
});

window.addEventListener("contextmenu", e => {
    e.preventDefault();

    // NEW: Right-click on appicon inside appcenter → show menu4
    if (e.target.closest(".appcenter .appicon")) {
        menu4.style.left = `${e.pageX}px`;
        menu4.style.top = `${e.pageY}px`;
        menu4.style.display = "block";

        // Hide all other menus
        toggleMenu("hide");
        menu2.style.display = "none";
        menu3.style.display = "none";

        return false;
    }

    // Right-click on deskgrid appicon → show menu3
    if (e.target.closest(".deskgrid .appicon")) {
        menu3.style.left = `${e.pageX}px`;
        menu3.style.top = `${e.pageY}px`;
        menu3.style.display = "block";

        // Hide regular menu and menu2
        toggleMenu("hide");
        menu2.style.display = "none";
        // Also hide menu4 just in case
        if (menu4) menu4.style.display = "none";

        return false;
    }

    // Right-click on navbar → menu2 above cursor
    if (navbar && navbar.contains(e.target)) {
        const origin = {
            left: e.pageX,
            top: e.pageY - (menu2.offsetHeight || 200)
        };
        menu2.style.left = `${origin.left}px`;
        menu2.style.top = `${origin.top}px`;
        menu2.style.display = "block";
        toggleMenu("hide");

        // Hide menu3 and menu4
        if (menu3) menu3.style.display = "none";
        if (menu4) menu4.style.display = "none";
    } else {
        // Any other right-click → regular menu
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition(origin);

        // Hide the special menus
        menu2.style.display = "none";
        if (menu3) menu3.style.display = "none";
        if (menu4) menu4.style.display = "none";
    }

    return false;
});

// --- YOUR ORIGINAL mousedown for navbar appicons (100% unchanged) ---
document.addEventListener("mousedown", e => {
    if (e.target.closest(".navbar .appicon")) {
        e.__handledForMenu2 = true;
        if (menuVisible) {
            menu.style.display = "none";
            menuVisible = false;
        }
        menu2.style.left = `${e.pageX}px`;
        menu2.style.top = `${e.pageY - (menu2.offsetHeight || 100)}px`;
        menu2.style.display = "block";
    }
});

// --- YOUR ORIGINAL window.onclick override + closing for menu3 and menu4 ---
window.onclick = function(e) {
    if (e.__handledForMenu2) {
        return;
    }
    if (menuVisible) toggleMenu("hide");

    if (menu2 && !menu2.contains(e.target)) {
        menu2.style.display = "none";
    }

    // Close menu3 when clicking outside
    if (menu3 && menu3.style.display === "block" && !menu3.contains(e.target)) {
        menu3.style.display = "none";
    }

    // Close menu4 when clicking outside
    if (menu4 && menu4.style.display === "block" && !menu4.contains(e.target)) {
        menu4.style.display = "none";
    }
};