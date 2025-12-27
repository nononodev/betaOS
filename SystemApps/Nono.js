function Nono(){
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
    var appsname = 'Nono';
    app.scroll = false;
    appbody.scroll = true;
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
    app.onload = bringToFront(app.id);
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

    var ntab = document.createElement('div');
    var videos = [
        {name: 'BCIT1', src: 'https://video.pmvhaven.com/691d37d32fa310287279f6b1/master.m3u8'},
        {name: 'BCIT2', src: 'https://video.pmvhaven.com/691e72faa97455eaaad59b98/master.m3u8'},
        {name: 'BCIT3', src: 'https://video.pmvhaven.com/6923ab03bf9c8c82efb641bf/master.m3u8'},
        {name: 'BCIT4', src: 'https://video.pmvhaven.com/videos/1765065800755_ruegwdmvunq_BCIT4.mp4/master.m3u8'},
        {name: 'BCIT5', src: 'https://video.pmvhaven.com/videos/1765643814024_fezanretd1_BCIT5.mp4/master.m3u8'}, 
        {name: 'BCIT6', src: 'https://video.pmvhaven.com/videos/1765944924953_nlb8vx2gg6e_BCIT6.mp4/master.m3u8'}, 
        {name: 'BCIT7', src: 'https://video.pmvhaven.com/videos/nononopmv_-_BCIT_-_Oral_Training_Part_1_-_Pussy_Worship_1766810988248_ql6rd8bt.mp4/master.m3u8'}
    ];
    var thumbnails = [];
    var bcitlist = document.createElement("div");
    var pages = ['BCIT', 'Teasers', 'Clips','About']
    appbody.scroll = false;
    appbody.style.overflow = 'hidden';
    ntab.className = 'ntab';
    bcitlist.scroll = true; 
    bcitlist.style.display = 'block';
    bcitlist.id = 'BCIT';
    bcitlist.name = 'BCIT';
    bcitlist.className = "ntabcontent";
    for (let i = 0; i < videos.length; i++) {
        var thumbnail = document.createElement('button');

        thumbnails.push(videos[i].name + ".png");
        thumbnail.type = 'image';
        thumbnail.style.backgroundImage = 'url(vthumbnails/' + videos[i].name + '.png)';
        thumbnail.className = 'vthumb';
        thumbnail.id = "thumbnail" + videos[i].name;
        thumbnail.title = videos[i].name;

        thumbnail.onclick = function() {
            vidPlay(videos[i].name, videos[i].src);
        };

        bcitlist.appendChild(thumbnail);
    }


    var teasers = document.createElement("div");
    var placeholdtxt = document.createElement("h1");
    placeholdtxt.innerHTML = "COMING SOON";
    teasers.appendChild(placeholdtxt);
    teasers.style.display = 'none';
    teasers.id = 'Teasers';
    teasers.className = 'ntabcontent';
    teasers.name = 'Teasers';

var clipsList = document.createElement("div");
clipsList.scroll = true; 
clipsList.style.display = 'block';
clipsList.id = 'Clips';
clipsList.name = 'Clips';
clipsList.className = "ntabcontent";

// === FALLBACK: Since this is local (file://) and JavaScript cannot list files in a folder for security reasons ===
// === We keep your original manual array so it actually works ===

var clip = ['AdoredFarawayBabirusa','AmplePrizeEel','AppropriateWearySeaurchin','AshamedStripedSnail',
            'AuthorizedBlaringFulmar'];
// Add new video base names here whenever you add a new .mp4 to the nonoclips folder

// Build the list from the manual array
for(let i = 0; i < clip.length; i++){
    var cthumbnail = document.createElement('button');
    cthumbnail.className = 'vthumb';
    cthumbnail.id = "thumbnail" + clip[i];
    cthumbnail.title = clip[i];
    cthumbnail.innerText = clip[i]; 

    cthumbnail.onclick = function(){
        vidPlay("nonoclips/" + clip[i] + ".mp4");
    };
    clipsList.appendChild(cthumbnail);
}

// Optional: message if you want to remind yourself to update the list
if (videos.length === 0) {
    var msg = document.createElement('p');
    msg.innerText = 'No videos listed. Add base names to the videos array above.';
    msg.style.color = 'white';
    msg.style.textAlign = 'center';
    msg.style.padding = '40px';
    bcitlist.appendChild(msg);
}

    appbody.appendChild(ntab);
    appbody.appendChild(bcitlist);
    appbody.appendChild(teasers);
    appbody.appendChild(clipsList);

    //var placeholdtxt = document.createElement("h1");
    //placeholdtxt.innerHTML = "COMING SOON";

    for(let i = 0; i < pages.length; i++){
        var pagebutt = document.createElement('button');
        ntab.className = 'ntab';
        pagebutt.className = 'ntablinks';
        pagebutt.innerHTML = pages[i];
        ntab.appendChild(pagebutt);
        pagebutt.onclick = function(){
            openNvTab(event, pages[i]);
        };
    }
}

function openNvTab(evt, pageName2) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("ntabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("ntablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName2).style.display = "block";
    evt.currentTarget.className += " active";
}