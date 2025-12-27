function Settings(){
    var app = document.createElement('div');
    var apphead = document.createElement('div');
    var appheadtext = document.createElement('ui');
    var appbody = document.createElement('div');
    var close = document.createElement('button');
    var fullscreen = document.createElement('button');
    var minimize = document.createElement('button');
    var isfull = false;
    var headbuttdiv = document.createElement('div');
    var headtextdiv = document.createElement('div');
    var appnumber = Math.random();
    var appsname = 'Settings';
    app.scroll = false;
    appbody.scroll = true;
    tasks++;

    headtextdiv.style.textAlign = 'left';
    headtextdiv.style.width = '50%';
    headtextdiv.style.cssFloat = 'left';
    headbuttdiv.style.textAlign = 'right';
    headbuttdiv.style.width = '50%';
    headbuttdiv.style.cssFloat = 'right';
    appnumber++;

    app.className = 'settapp';
    apphead.className = 'appheader';
    appheadtext.className = 'appheadtxt';
    appheadtext.innerText = appsname;

    close.type = 'image';
    close.id = "close"
    close.title = 'Close';
    close.style.fontFamily = "Arial";
    close.className = "appheadbutt";

    fullscreen.title = 'Fullscreen';
    fullscreen.id = "fullscreen";
    fullscreen.type = 'image';
    fullscreen.style.textAlign = 'right';
    fullscreen.className = "appheadbutt";

    minimize.type = 'image';
    minimize.title = 'Minimize';
    minimize.id = "minimize";
    minimize.className = "appheadbutt";

    appbody.className = 'appbody';

    headtextdiv.append(appheadtext);
    apphead.append(headtextdiv);
    apphead.append(headbuttdiv);
    headbuttdiv.append(minimize);
    headbuttdiv.append(fullscreen);
    headbuttdiv.append(close);

    app.appendChild(apphead);
    app.appendChild(appbody);

    if(savedtheme){
        app.style.backgroundColor = localStorage.getItem('theme');
    } else{
        app.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }

    desktopbody.appendChild(app);
    app.id = appsname + "(" + appnumber + ")";
    apphead.id = app.id + "header";
    dragWindow(document.getElementById(app.id));
    app.onclick = function () {bringToFront(app.id)};

    // 2. Error sound on/off
    var errorSoundEnabled = (localStorage.getItem('errorSoundEnabled') !== 'false');
    // Apply error sound setting immediately
    app.onerror = function(){
        if (errorSoundEnabled && typeof errorsound !== 'undefined') {
            errorsound.play();
        }
    };

    // Fullscreen button now respects default size when exiting fullscreen
    fullscreen.onclick = function () {
        if (isfull == false){
            app.style.width = '100%';
            app.style.height = 'calc(100% - 80px)';
            app.style.top = '0px';
            app.style.left = '0%';
            if(savedtheme){
                app.style.backgroundColor = localStorage.getItem('theme');
            }
            isfull = true;
        } else if (isfull == true){
            app.style.width = '600px';
            app.style.height = '800px';
            app.style.top = 'calc(50% - 400px)';
            app.style.left = 'calc(50% - 300px)';
            if(savedtheme){
                app.style.backgroundColor = localStorage.getItem('theme');
            }
            isfull = false;
        }
    };
    close.onclick = function () {
        desktopbody.removeChild(app);
        tasks--;
    };
    minimize.onclick = function () {minimizer(appsname + "(" + appnumber + ")")};

    var tab = document.createElement('div');
    var generalsettings = document.createElement('div');
    var backgroundsettings = document.createElement('div');
    var about = document.createElement('div');
    var basssett = document.createElement('div');
    var shortcuts = document.createElement('div');
    var usersett = document.createElement('div');
    var changelogsett = document.createElement('div');

    var sett = ['General', 'Personalization', 'User', 'Changelog', 'About'];
    for(let i = 0; i < sett.length; i++){
        var settbutt = document.createElement('button');
        tab.className = 'tab';
        settbutt.className = 'tablinks';
        settbutt.innerHTML = sett[i];
        tab.appendChild(settbutt);
        settbutt.onclick = function(){
            openSett(event, sett[i]);
        };
    }

    appbody.scroll = false;
    appbody.style.overflow = 'hidden';
    tab.className = 'tab';

    generalsettings.className = 'tabcontent';
    generalsettings.id = 'General';
    generalsettings.style.display = 'inline';

    var genTitle = document.createElement('h1');
    genTitle.innerText = 'General';
    generalsettings.appendChild(genTitle);

    // Error sound toggle
    var soundH2 = document.createElement('h2');
    soundH2.innerText = 'Sound';
    generalsettings.appendChild(soundH2);
    var soundLabel = document.createElement('label');
    var soundCheck = document.createElement('input');
    soundCheck.type = 'checkbox';
    soundCheck.checked = errorSoundEnabled;
    soundCheck.onchange = function() {
        localStorage.setItem('errorSoundEnabled', this.checked);
        errorSoundEnabled = this.checked;
    };
    soundLabel.appendChild(soundCheck);
    soundLabel.appendChild(document.createTextNode(' Play error sound when something goes wrong'));
    generalsettings.appendChild(soundLabel);

    var resetH2 = document.createElement('h2');
    resetH2.innerText = 'System';
    generalsettings.appendChild(resetH2);
    var bstorereset = document.createElement ("button");
    bstorereset.innerHTML = "Reset betaStore";
    bstorereset.onclick = function(){
        localStorage.removeItem("savedApps");
        window.location.reload();
    };
    generalsettings.appendChild(bstorereset);
    var systemreset = document.createElement ("button");
    systemreset.innerHTML = "Reset System";
    systemreset.onclick = function(){
        localStorage.clear();
        location.reload();
    };
    generalsettings.appendChild(systemreset);

    appbody.appendChild(tab);
    appbody.appendChild(usersett);
    appbody.appendChild(generalsettings);

    usersett.id = 'User';
    usersett.className = 'tabcontent';

    var userTitle = document.createElement('h1');
    userTitle.innerText = 'User Settings';
    usersett.appendChild(userTitle);

    // Profile picture
    var savedIcon = localStorage.getItem('usericon');
    var iconContainer = document.createElement('div');
    iconContainer.style.textAlign = 'center';
    iconContainer.style.margin = '30px 0';

    var iconImg = document.createElement('img');
    iconImg.style.width = '120px';
    iconImg.style.height = '120px';
    iconImg.style.borderRadius = '50%';
    iconImg.style.objectFit = 'cover';
    iconImg.style.border = '4px solid white';
    if (savedIcon && savedIcon.trim() !== '') {
        iconImg.src = savedIcon.trim();
    } else {
        iconImg.src = 'images/defaultuser.png';
    }
    iconImg.onerror = function() {
        this.src = 'images/defaultuser.png';
        localStorage.removeItem('usericon');
    };
    iconContainer.appendChild(iconImg);

    var changeIconBtn = document.createElement('button');
    changeIconBtn.innerText = 'Change Profile Picture';
    changeIconBtn.style.padding = '12px 24px';
    changeIconBtn.style.fontSize = '18px';
    changeIconBtn.style.marginTop = '20px';
    changeIconBtn.style.cursor = 'pointer';
    changeIconBtn.style.display = 'block';
    changeIconBtn.style.marginLeft = 'auto';
    changeIconBtn.style.marginRight = 'auto';
    changeIconBtn.onclick = function() {
        var current = savedIcon && savedIcon.trim() !== '' ? savedIcon.trim() : '';
        var url = prompt('Enter direct image URL (must be .png, .jpg, etc.):', current);
        if (url && url.trim() !== '') {
            var cleanUrl = url.trim();
            localStorage.setItem('usericon', cleanUrl);
            iconImg.src = cleanUrl;
        }
    };
    iconContainer.appendChild(changeIconBtn);
    usersett.appendChild(iconContainer);

    // Change username
    var nameTitle = document.createElement('h2');
    nameTitle.innerText = 'Change Username';
    nameTitle.style.textAlign = 'center';
    nameTitle.style.margin = '30px 0 10px 0';
    usersett.appendChild(nameTitle);

    var currentUsername = localStorage.getItem('username') || 'User';

    var newNameInput = document.createElement('input');
    newNameInput.type = 'text';
    newNameInput.placeholder = 'New Username';
    newNameInput.value = currentUsername;
    newNameInput.className = 'logininput';
    newNameInput.style.width = '300px';
    newNameInput.style.padding = '10px';
    newNameInput.style.margin = '10px auto';
    newNameInput.style.display = 'block';
    usersett.appendChild(newNameInput);

    var changeNameBtn = document.createElement('button');
    changeNameBtn.innerText = 'Update Username';
    changeNameBtn.className = 'loginbutt';
    changeNameBtn.style.padding = '12px 30px';
    changeNameBtn.style.fontSize = '18px';
    changeNameBtn.style.display = 'block';
    changeNameBtn.style.margin = '10px auto';
    changeNameBtn.onclick = function() {
        var newName = newNameInput.value.trim();
        if (newName === '') {
            alert('Username cannot be empty!');
            return;
        }
        localStorage.setItem('username', newName);
        alert('Username updated to "' + newName + '"!\nIt will show on next lock screen.');
    };
    usersett.appendChild(changeNameBtn);

    // Change password
    var passTitle = document.createElement('h2');
    passTitle.innerText = 'Change Password';
    passTitle.style.textAlign = 'center';
    passTitle.style.margin = '40px 0 10px 0';
    usersett.appendChild(passTitle);

    var newPassInput = document.createElement('input');
    newPassInput.type = 'password';
    newPassInput.placeholder = 'New Password';
    newPassInput.className = 'logininput';
    newPassInput.style.width = '300px';
    newPassInput.style.padding = '10px';
    newPassInput.style.margin = '10px auto';
    newPassInput.style.display = 'block';
    usersett.appendChild(newPassInput);

    var confirmPassInput = document.createElement('input');
    confirmPassInput.type = 'password';
    confirmPassInput.placeholder = 'Confirm New Password';
    confirmPassInput.className = 'logininput';
    confirmPassInput.style.width = '300px';
    confirmPassInput.style.padding = '10px';
    confirmPassInput.style.margin = '10px auto';
    confirmPassInput.style.display = 'block';
    usersett.appendChild(confirmPassInput);

    var changePassBtn = document.createElement('button');
    changePassBtn.innerText = 'Update Password';
    changePassBtn.className = 'loginbutt';
    changePassBtn.style.padding = '12px 30px';
    changePassBtn.style.fontSize = '18px';
    changePassBtn.style.display = 'block';
    changePassBtn.style.margin = '20px auto';
    changePassBtn.onclick = function() {
        var newPass = newPassInput.value;
        var confirmPass = confirmPassInput.value;
        if (newPass === '') {
            alert('Password cannot be empty!');
            return;
        }
        if (newPass !== confirmPass) {
            alert('Passwords do not match!');
            return;
        }
        localStorage.setItem('password', newPass);
        alert('Password updated successfully!');
        newPassInput.value = '';
        confirmPassInput.value = '';
    };
    usersett.appendChild(changePassBtn);

    backgroundsettings.scroll = true;
    backgroundsettings.style.overflow = 'scroll';
    backgroundsettings.className = 'tabcontent';
    appbody.appendChild(backgroundsettings);
    backgroundsettings.style.display = 'none';
    backgroundsettings.id = 'Personalization';

    // === Backgrounds collapsible section ===
    var bgHeader = document.createElement('div');
    bgHeader.style.padding = '15px';
    bgHeader.style.backgroundColor = 'rgba(255,255,255,0.1)';
    bgHeader.style.cursor = 'pointer';
    bgHeader.style.borderRadius = '8px';
    bgHeader.style.margin = '10px 0';

    var bgTitle = document.createElement('h2');
    bgTitle.innerText = 'Backgrounds ▼';
    bgTitle.style.margin = '0';
    bgHeader.appendChild(bgTitle);

    var bgContainer = document.createElement('div');
    bgContainer.style.display = 'none'; // closed by default

    var backgroundtxt = document.createElement("h1");
    backgroundtxt.innerHTML = "Background";
    bgContainer.appendChild(backgroundtxt);

    var bchoices = ['Nonono', 'HiddenGooner', 'Backside', 'Exposed', 'GettinDirty',
    'Pineapple', 'WindowShopper', 'Anime1', 'Hermoine', 'Boobs', 'AssInTheWoods',
    'CarShot', 'InTheField', 'OnTheTracks', 'BlackLatex', 'LoveHer', 'BlackLace',
    'BeachTime', 'GuitarGirl', 'ShoesOffFeetUp', 'PurpleLights', 'MidnightDowntown',
    'NeonRose', 'Nope', 'HurtMe', 'EnterSign', 'RacingDots', 'GoodVibesOnly',
    'DownTheSpiral', 'GameOn', 'LongLiveBacon', 'NeonRainbow', 'NeonSign1',
    'Open24Hours', 'OpenSign', 'RainbowDoors'];

    for (var i = 0; i < bchoices.length; i++){
        var bchoice = document.createElement('button');
        bchoice.id = bchoices[i] + appnumber;
        bchoice.type = 'image';
        bchoice.style.backgroundImage = "url('images/" + bchoices[i] + ".png')";
        bchoice.className = 'backgroundoption';
        bchoice.choiceName = bchoices[i];
        bchoice.onclick = function () {
            document.body.style.backgroundImage = 'url(images/' + this.choiceName + '.png)';
            localStorage.setItem('background','url(images/' + this.choiceName + '.png)');
        };
        bgContainer.appendChild(bchoice);
    }

    var backgroundinput = document.createElement('input');
    var backgroundaddbutt = document.createElement('button');
    backgroundaddbutt.innerHTML = 'Add';
    backgroundinput.placeholder = "Background URL";
    backgroundaddbutt.onclick = function () {
        document.body.style.backgroundImage = "url('" + backgroundinput.value + "')";
        var custombackground = document.createElement('button');
        custombackground.type = 'image';
        custombackground.style.backgroundImage = "url('" + backgroundinput.value + "')";
        custombackground.className = 'backgroundoption';
        custombackground.onclick = function () {
            document.body.style.backgroundImage = "url('" + backgroundinput.value + "')";
            localStorage.setItem('background',"url('" + backgroundinput.value + "')");
        };
        bgContainer.appendChild(custombackground);
    };
    bgContainer.appendChild(backgroundinput);
    bgContainer.appendChild(backgroundaddbutt);

    bgHeader.onclick = function() {
        if (bgContainer.style.display === 'none') {
            bgContainer.style.display = 'block';
            bgTitle.innerText = 'Backgrounds ▲';
        } else {
            bgContainer.style.display = 'none';
            bgTitle.innerText = 'Backgrounds ▼';
        }
    };

    backgroundsettings.appendChild(bgHeader);
    backgroundsettings.appendChild(bgContainer);

    // === Themes collapsible section ===
    var themeHeader = document.createElement('div');
    themeHeader.style.padding = '15px';
    themeHeader.style.backgroundColor = 'rgba(255,255,255,0.1)';
    themeHeader.style.cursor = 'pointer';
    themeHeader.style.borderRadius = '8px';
    themeHeader.style.margin = '10px 0';

    var themeTitle = document.createElement('h2');
    themeTitle.innerText = 'Themes ▼';
    themeTitle.style.margin = '0';
    themeHeader.appendChild(themeTitle);

    var themeContainer = document.createElement('div');
    themeContainer.style.display = 'none'; // closed by default

    var themetxt = document.createElement("h1");
    themetxt.innerHTML = "Themes";
    themeContainer.appendChild(themetxt);

    var tchoices = [
        {name: 'One In The Pink', color: 'rgba(238, 39, 149, 0.65)'},
        {name: 'Red Sea', color: 'rgba(255, 0, 0, 0.65)'},
        {name: 'Mars', color: 'rgba(234, 95, 3, 0.65)'},
        {name: 'Orange Soda', color: 'rgba(255, 165, 0, 0.65)'},
        {name: 'Sunrays', color: 'rgba(254, 224, 3, 0.65)'},
        {name: 'Green Apple', color: 'rgba(0, 255, 0, 0.65)'},
        {name: 'Aquarium', color: 'rgba(12, 224, 178, 0.65)'},
        {name: 'Ocean Water', color: 'rgba(0, 0, 255, 0.65)'},
        {name: 'Midnight Light', color: 'rgba(117, 14, 227, 0.65)'},
        {name: 'Violet Vision', color: 'rgba(128, 0, 128, 0.65)'},
        {name: 'Dark Mode', color: 'rgba(0, 0, 0, 0.65)'},
        {name: 'Light Mode', color: 'rgba(149, 149, 149, 0.65)'},
        {name: 'Clear Mode', color: 'rgba(0, 0, 0, 0)'}
    ];

    for (var i = 0; i < tchoices.length; i++){
        var tchoice = document.createElement('button');
        tchoice.id = tchoices[i].name + appnumber;
        tchoice.type = 'text';
        tchoice.innerHTML = tchoices[i].name;
        tchoice.style.backgroundColor = tchoices[i].color;
        tchoice.className = 'backgroundoption';
        tchoice.onclick = function () {
            document.getElementById('navbar').style.backgroundColor = this.style.backgroundColor;
            app.style.backgroundColor = this.style.backgroundColor;
            actioncenter.style.backgroundColor = this.style.backgroundColor;
            document.getElementById('datetime').style.backgroundColor = this.style.backgroundColor;
            document.getElementById('rightcon').style.backgroundColor = this.style.backgroundColor;
            document.getElementById('menu').style.backgroundColor = this.style.backgroundColor;
            document.getElementById('notificon').style.backgroundColor = this.style.backgroundColor;
            document.getElementById('datetime').style.backgroundColor = this.style.backgroundColor;
            document.getElementById('timetxt').style.backgroundColor = this.style.backgroundColor;
            localStorage.setItem('theme', this.style.backgroundColor);
        };
        themeContainer.appendChild(tchoice);
    }

    themeHeader.onclick = function() {
        if (themeContainer.style.display === 'none') {
            themeContainer.style.display = 'block';
            themeTitle.innerText = 'Themes ▲';
        } else {
            themeContainer.style.display = 'none';
            themeTitle.innerText = 'Themes ▼';
        }
    };

    backgroundsettings.appendChild(themeHeader);
    backgroundsettings.appendChild(themeContainer);

    // Navbar Position collapsible
    var navPosHeader = document.createElement('div');
    navPosHeader.style.padding = '15px';
    navPosHeader.style.backgroundColor = 'rgba(255,255,255,0.1)';
    navPosHeader.style.cursor = 'pointer';
    navPosHeader.style.borderRadius = '8px';
    navPosHeader.style.margin = '10px 0';

    var navPosTitle = document.createElement('h2');
    navPosTitle.innerText = 'Navbar Position ▼';
    navPosTitle.style.margin = '0';
    navPosHeader.appendChild(navPosTitle);

    var navPosContainer = document.createElement('div');
    navPosContainer.style.display = 'none'; // closed by default
    navPosContainer.style.padding = '15px 0';

    var navPosTxt = document.createElement('h1');
    navPosTxt.innerHTML = 'Navbar Position';
    navPosContainer.appendChild(navPosTxt);

    var posChoices = [
        {name: 'Bottom (default)', value: 'bottom'},
        {name: 'Left side (hover on left side to show)', value: 'left'}
    ];

    var currentPos = localStorage.getItem('navbarPosition') || 'bottom';

    posChoices.forEach(function(choice) {
        var posBtn = document.createElement('button');
        posBtn.innerText = choice.name;
        posBtn.style.padding = '12px';
        posBtn.style.margin = '5px';
        posBtn.style.width = '70%';
        posBtn.style.fontSize = '16px';
        if (choice.value === currentPos) {
            posBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.46)';
        }
        posBtn.onclick = function() {
            applyNavbarPosition(choice.value);
            // Update button highlights
            posChoices.forEach(function(c) {
                if (c.value === choice.value) {
                    posBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.46)';
                } else {
                    posChoices.forEach(function(other) {
                        if (other.value !== choice.value) {
                            // Find other buttons and reset
                            navPosContainer.querySelectorAll('button').forEach(b => {
                                if (b.innerText === other.name) {
                                    b.style.backgroundColor = '';
                                }
                            });
                        }
                    });
                }
            });
        };
        navPosContainer.appendChild(posBtn);
    });

    navPosHeader.onclick = function() {
        if (navPosContainer.style.display === 'none') {
            navPosContainer.style.display = 'block';
            navPosTitle.innerText = 'Navbar Position ▲';
        } else {
            navPosContainer.style.display = 'none';
            navPosTitle.innerText = 'Navbar Position ▼';
        }
    };

    backgroundsettings.appendChild(navPosHeader);
    backgroundsettings.appendChild(navPosContainer);

    appbody.appendChild(about);
    about.className = 'tabcontent';
    about.id = "About" ;

    var betaOStxt = document.createElement('h1');
    var browserversion = document.createElement('p');
    var copyright = document.createElement('p');
    var logoimg = document.createElement('img');
    var logoimg2 = document.createElement('img');
    app.style.color = 'white';
    browserversion.innerHTML = objbrowserName + ": " + objfullVersion;
    betaOStxt.innerHTML = "betaOS " + betaosversion;
    copyright.innerHTML = "© Nononopmv 2026";
    logoimg.src = 'images/beta.png';
    logoimg.style = 'height: 150px';
    logoimg2.src = 'images/Nono.png';
    logoimg2.style = 'height: 150px';
    about.appendChild(betaOStxt);
    about.appendChild(logoimg);
    about.appendChild(logoimg2);
    about.appendChild(copyright);
    about.appendChild(browserversion);

    // Update check button moved to About tab
    var updateH2 = document.createElement('h1');
    updateH2.innerText = 'Updates';
    about.appendChild(updateH2);
    var updateBtn = document.createElement('button');
    updateBtn.innerText = 'Check for Updates';
    updateBtn.style.padding = '12px 30px';
    updateBtn.style.fontSize = '18px';
    updateBtn.style.display = 'block';
    updateBtn.style.margin = '10px auto';
    updateBtn.onclick = checkForUpdate;
    about.appendChild(updateBtn);

    appbody.appendChild(shortcuts);
    shortcuts.id = "Shortcuts";
    shortcuts.className = "tabcontent"

    var appnameshort = document.createElement('input');
    var shortaddnav = document.createElement('button');
    var shortadddesk = document.createElement('button');
    var newshortcut = document.createElement('button');
    var navshort = document.createElement('button');
    var noticetxt = document.createElement("h3");
    var resetsc = document.createElement("button");
    var iconpreview = document.createElement('img');

    newshortcut.type = 'image';
    newshortcut.style.width = '50px';
    newshortcut.style.height = '50px';
    newshortcut.style.textAlign = 'center';

    appnameshort.type = 'text';
    appnameshort.placeholder = "App name";

    shortaddnav.innerHTML = 'Navbar';
    shortadddesk.innerHTML = 'Desktop';

    noticetxt.innerHTML = "***NAMES ARE CASE SENSITIVE***"

    resetsc.innerHTML = "Reset Shortcuts";
    resetsc.title = "This will remove all added shortcuts";
    resetsc.onclick = function () {
        localStorage.removeItem("savednav");
        localStorage.removeItem("saveddesk");
        window.location.reload();
    };

    iconpreview.style.width = '20%';
    iconpreview.style.height = 'auto';

    shortcuts.appendChild(appnameshort);
    shortcuts.appendChild(shortaddnav);
    shortcuts.appendChild(shortadddesk);
    shortcuts.appendChild(resetsc);
    shortcuts.appendChild(noticetxt);
    shortcuts.appendChild(iconpreview);

    shortaddnav.onclick = function () {
        iconpreview.src = "images/" + appnameshort.value + ".png";
        navshort.title = appnameshort.value;
        navshort.style = 'background-image: url("images/' + appnameshort.value + '.png"); background-size: 50px 50px;';
        navshort.className = 'appicon';
        if(appnameshort.value != "Shortcuts"){
            navshort.setAttribute("onclick", appnameshort.value + "()");
        } else {
            navshort.setAttribute("onclick", "Settings(); openSett(event, 'Shortcuts');");
        }
        pinneddiv.appendChild(navshort);
        localStorage.setItem("savednav", pinneddiv.innerHTML);
        desktopbody.removeChild(app);
    };

    shortadddesk.onclick = function () {
        iconpreview.src = "images/" + appnameshort.value + ".png";
        newshortcut.title = appnameshort.value;
        newshortcut.style = 'background-image: url("images/' + appnameshort.value + '.png"); background-size: 50px 50px;';
        newshortcut.className = 'appicon';
        if(appnameshort.value != "Shortcuts"){
            newshortcut.setAttribute("onclick", appnameshort.value + "()");
        } else {
            newshortcut.setAttribute("onclick", "Settings(); openSett(event, 'Shortcuts');");
        }
        deskgrid.appendChild(newshortcut);
        localStorage.setItem("saveddesk", deskgrid.innerHTML);
        desktopbody.removeChild(app);
    };

    appbody.appendChild(changelogsett);
    changelogsett.id = "Changelog";
    changelogsett.className = "tabcontent";
    changelogsett.style.textAlign = 'left';
    changelogsett.style.fontSize = '11px';
    changelogsett.style.whiteSpace = 'pre';  // Preserve whitespace and line breaks
    changelogsett.style.paddingBottom = '5px'; // Add padding to the bottom
    changelogsett.textContent = changelog + `\n\n\n`; // Preserve exact format


}

function openSett(evt, pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

function applyNavbarPosition(position) {
    var nbar = document.querySelector('.navbar');
    var adiv = document.querySelector('.appdiv');
    var pdiv = document.querySelector('.pinneddiv');
    var rdiv = document.querySelector('.rightdiv');
    var fdiv = document.querySelector('.funcdiv');
    var rcon = document.querySelector('.rightcon');
    var alib = document.querySelector('.popuplist');
    var noti = document.querySelector('.notifcontain');
    var dtime = document.querySelector('.datetime');

    // Remove left/right classes
    nbar.classList.remove('navbar-left', 'navbar-right');
    adiv.classList.remove('appdiv-left-right');
    pdiv.classList.remove('pinneddiv-lr');
    rdiv.classList.remove('rightdiv-left', 'rightdiv-right');
    fdiv.classList.remove('funcdiv-lr');
    rcon.classList.remove('rightcon-left');
    alib.classList.remove('popuplist-left');
    noti.classList.remove('notifcontain-left');

    // Wipe ANY old listener by using a single named function
    document.removeEventListener('mousemove', handleNavbarMouseMove);

    if (position === 'left') {
        nbar.classList.add('navbar-left');
        adiv.classList.add('appdiv-left-right');
        pdiv.classList.add('pinneddiv-lr');
        rdiv.classList.add('rightdiv-left');
        fdiv.classList.add('funcdiv-lr');
        rcon.classList.add('rightcon-left');
        alib.classList.add('popuplist-left');
        noti.classList.add('notifcontain-left');

        nbar.style.display = 'none';
        rdiv.style.display = 'none';

        document.addEventListener('mousemove', handleNavbarMouseMove);
        
    } else if (position === 'right') {
        nbar.classList.add('navbar-right');
        adiv.classList.add('appdiv-left-right');
        pdiv.classList.add('pinneddiv-lr');
        rdiv.classList.add('rightdiv-right');
        fdiv.classList.add('funcdiv-lr');

        nbar.style.display = 'none';
        rdiv.style.display = 'none';

        document.addEventListener('mousemove', handleNavbarMouseMove);
        
    } else if (position === 'bottom') {
        nbar.classList.add('navbar');
        adiv.classList.add('appdiv');
        pdiv.classList.add('pinneddiv');
        rdiv.classList.add('rightdiv');
        fdiv.classList.add('funcdiv');
        rcon.classList.add('rightcon');
        alib.classList.add('popuplist');
        noti.classList.add('notifcontain');

        nbar.style.display = 'flex';
        rdiv.style.display = 'block';
        // listener already removed above
    }

    localStorage.setItem('navbarPosition', position);
}

// Single shared handler
function handleNavbarMouseMove(event) {
    var nbar = document.querySelector('.navbar');
    var rdiv = document.querySelector('.rightdiv');

    if (nbar.classList.contains('navbar-left')) {
        if (event.clientX < 100) {
            nbar.style.display = 'flex';
            rdiv.style.display = 'block';
        } else if (event.clientY > window.innerHeight - 500 && event.clientX < 500) {
            nbar.style.display = 'flex';
            rdiv.style.display = 'block';
        } else {
            nbar.style.display = 'none';
            rdiv.style.display = 'none';
        }
    } else if (nbar.classList.contains('navbar-right')) {
        if (event.clientX > window.innerWidth - 100) {
            nbar.style.display = 'flex';
            rdiv.style.display = 'flex';
        } else {
            nbar.style.display = 'none';
            rdiv.style.display = 'none';
        }
    }
}