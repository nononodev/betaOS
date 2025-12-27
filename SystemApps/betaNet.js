function betaNet(){
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
    var appsname = 'betaNet';
    app.scroll = false;
    appbody.scroll = false;
    tasks++;
    app.onerror = function(){errorsound.play();};

    headtextdiv.style.textAlign = 'left';
    headtextdiv.style.width = '50%';
    headtextdiv.style.cssFloat = 'left';
    headbuttdiv.style.textAlign = 'right';
    headbuttdiv.style.width = '50%';
    headbuttdiv.style.cssFloat = 'right';
    appnumber++;

    app.className = 'app';
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
    appbody.style.overflow = 'hidden';

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

    close.onclick = function () { desktopbody.removeChild(app); tasks--;};

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
            app.style.width = '50%';
            app.style.height = '50%';
            app.style.top = '25%';
            app.style.left = '25%';
            isfull = false;
            if(savedtheme){
                app.style.backgroundColor = localStorage.getItem('theme');
            }
        }
    };

    minimize.onclick = function () {minimizer(appsname + "(" + appnumber + ")")};

    // Navigation bar - at the top, above the iframe
    var navBar = document.createElement('div');
    navBar.style.height = '40px';
    navBar.style.backgroundColor = 'rgba(0,0,0,0.3)';
    navBar.style.display = 'flex';
    navBar.style.alignItems = 'center';
    navBar.style.padding = '0 10px';
    navBar.style.gap = '10px';

    var backBtn = document.createElement('button');
    backBtn.innerText = '← Back';
    backBtn.style.padding = '5px 10px';

    var forwardBtn = document.createElement('button');
    forwardBtn.innerText = 'Forward →';
    forwardBtn.style.padding = '5px 10px';

    var homeBtn = document.createElement('button');
    homeBtn.innerText = 'Home';
    homeBtn.style.padding = '5px 10px';

    navBar.appendChild(homeBtn);
    navBar.appendChild(backBtn);
    navBar.appendChild(forwardBtn);

    appbody.appendChild(navBar);

    // Iframe - below the nav bar, accounting for top space
    var nview = document.createElement('iframe');
    nview.style.marginTop = '40px'; // pushes iframe below the nav bar
    nview.sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox';

    appbody.appendChild(nview);

    // History
    var history = [];
    var historyIndex = -1;

    function loadSite(url) {
        nview.src = url;

        if (historyIndex < history.length - 1) {
            history = history.slice(0, historyIndex + 1);
        }
        history.push(url);
        historyIndex++;
        updateNavButtons();
    }

    function updateNavButtons() {
        backBtn.disabled = historyIndex <= 0;
        forwardBtn.disabled = historyIndex >= history.length - 1;
    }

    backBtn.onclick = function() {
        if (historyIndex > 0) {
            historyIndex--;
            nview.src = history[historyIndex];
            updateNavButtons();
        }
    };

    forwardBtn.onclick = function() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            nview.src = history[historyIndex];
            updateNavButtons();
        }
    };

    homeBtn.onclick = function() {
        showHomePage();
    };

    // Home page with buttons created in JavaScript
    function showHomePage() {
        nview.src = 'about:blank';
        nview.onload = function() {
            var doc = nview.contentDocument || nview.contentWindow.document;
            doc.open();
            doc.write('');
            doc.close();

            var container = doc.createElement('div');
            container.scroll = true;
            container.style.padding = '20px';
            container.style.color = 'white';
            container.style.fontFamily = 'Arial';
            container.style.background = 'rgba(0,0,0,0.5)';
            container.style.height = '100%';
            container.style.boxSizing = 'border-box';

            var title = doc.createElement('img');
            title.src = 'images/betaNet.png';
            title.style.width = '200px';
            title.style.marginLeft = 'calc(50% - 100px)';
            title.style.marginRight = 'calc(50% - 100px)';
            container.appendChild(title);

            var desc = doc.createElement('p');
            desc.innerText = 'Select a site (all iframe-compatible):';
            desc.style.textAlign = 'center';
            container.appendChild(desc);

            var grid = doc.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
            grid.style.gap = '15px';
            grid.style.marginTop = '30px';

            var sites = [
                {name: 'JSFiddle', url: 'https://jsfiddle.net'},
                {name: 'NudeVista', url: 'https://nudevista.com/'},
                {name: 'nononodev.github.io', url: 'https://nononodev.github.io'},
            ];

            sites.forEach(function(site) {
                var btn = doc.createElement('button');
                btn.innerText = site.name;
                btn.style.padding = '20px';
                btn.style.fontSize = '18px';
                btn.style.height = '100px';
                btn.onclick = function() {
                    loadSite(site.url);
                };
                grid.appendChild(btn);
            });

            container.appendChild(grid);
            doc.body.appendChild(container);
            doc.body.style.margin = '0';
            doc.body.style.overflow = 'hidden';
        };

        history = ['home'];
        historyIndex = 0;
        updateNavButtons();
    }

    // Start on home page
    showHomePage();
}