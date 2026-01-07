function Files(){
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
    var appsname = 'Files';
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

    var fileInput = document.createElement('input');
    var uploadButton = document.createElement('button');
    var searchInput = document.createElement('input');
    var fileList = document.createElement('div');
    fileList.style.overflowY = 'auto';

    // Upload row (unchanged - stays exactly as before)
    fileInput.type = 'file';
    fileInput.className = 'uploadbutt';
    uploadButton.innerText = 'Upload File';
    uploadButton.className = 'uploadbutt';

    // Search + Sort row - search bar first, then sort options next to it
    var searchSortContainer = document.createElement('div');
    searchSortContainer.style.display = 'flex';
    searchSortContainer.style.justifyContent = 'flex-start';
    searchSortContainer.style.alignItems = 'center';
    searchSortContainer.style.gap = '15px';
    searchSortContainer.style.margin = '10px 20px';

    searchInput.type = 'text';
    searchInput.placeholder = 'Search Files...';
    // Keep the original size (no forced width - it will take available space naturally)

    var sortLabel = document.createElement('span');
    sortLabel.innerText = 'Sort by:';
    sortLabel.style.color = '#aaa';
    sortLabel.style.whiteSpace = 'nowrap';

    var sortSelect = document.createElement('select');
    sortSelect.innerHTML = `
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
        <option value="size-asc">Size (Smallest first)</option>
        <option value="size-desc">Size (Largest first)</option>
        <option value="type-asc">Type (Audio → Video)</option>
        <option value="type-desc">Type (Video → Audio)</option>
    `;
    sortSelect.selectedIndex = 0;

    // Order: search bar → sort label → sort dropdown
    searchSortContainer.appendChild(searchInput);
    searchSortContainer.appendChild(sortLabel);
    searchSortContainer.appendChild(sortSelect);

    // Initialize IndexedDB
    var db;
    var request = indexedDB.open("FileStorage", 3);
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("videos")) {
            db.createObjectStore("videos", { keyPath: "name" });
        }
    };
    request.onsuccess = function(event) {
        db = event.target.result;

        // Append in original order
        appbody.appendChild(fileInput);
        appbody.appendChild(uploadButton);
        appbody.appendChild(searchSortContainer);
        appbody.appendChild(fileList);

        // Helper functions
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            var k = 1024;
            var sizes = ['Bytes', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function getFileType(name) {
            if (name.endsWith('.mp3') || name.endsWith('.wav') || name.endsWith('.ogg')) {
                return 'Audio';
            } else if (name.endsWith('.mp4') || name.endsWith('.avi') || name.endsWith('.mov')) {
                return 'Video';
            } else {
                return 'Unknown';
            }
        }

        function getTypeSortValue(name) {
            return getFileType(name) === 'Audio' ? 0 : 1;
        }

        // Upload handler
        uploadButton.onclick = function() {
            var file = fileInput.files[0];
            if (!file) { alert('Please select a file to upload.'); return; }
            var isVideo = file.name.endsWith('.mp4') || file.name.endsWith('.avi') || file.name.endsWith('.mov');
            var isAudio = file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.ogg');
            if (!(isVideo || isAudio)) { alert('The uploaded file is not an audio or video file.'); return; }
            var reader = new FileReader();
            reader.onload = function(event) {
                var arrayBuffer = event.target.result;
                var transaction = db.transaction(["videos"], "readwrite");
                var store = transaction.objectStore("videos");
                store.put({ name: file.name, content: arrayBuffer, size: file.size, type: file.type });
                displayFiles();
                fileInput.value = '';
            };
            reader.readAsArrayBuffer(file);
        };

        function displayFiles() {
            var transaction = db.transaction(["videos"]);
            var store = transaction.objectStore("videos");
            var request = store.getAll();
            request.onsuccess = function(event) {
                var files = event.target.result;

                var sortMode = sortSelect.value;
                files.sort(function(a, b) {
                    var sizeA = a.size || (a.content ? a.content.byteLength : 0);
                    var sizeB = b.size || (b.content ? b.content.byteLength : 0);
                    var typeA = getTypeSortValue(a.name);
                    var typeB = getTypeSortValue(b.name);

                    switch(sortMode) {
                        case 'name-asc': return a.name.localeCompare(b.name);
                        case 'name-desc': return b.name.localeCompare(a.name);
                        case 'size-asc': return sizeA - sizeB;
                        case 'size-desc': return sizeB - sizeA;
                        case 'type-asc': return typeA - typeB || a.name.localeCompare(b.name);
                        case 'type-desc': return typeB - typeA || a.name.localeCompare(b.name);
                        default: return 0;
                    }
                });

                fileList.innerHTML = '';
                files.forEach(createFileEntry);
            };
        }

        function createFileEntry(fileData) {
            var entryDiv = document.createElement('div');
            entryDiv.style.marginBottom = '8px';
            entryDiv.style.display = 'flex';
            entryDiv.style.alignItems = 'center';
            entryDiv.style.justifyContent = 'space-between';

            var fileButton = document.createElement('button');
            fileButton.className = 'backgroundoption';
            fileButton.innerText = fileData.name;
            fileButton.style.width = '45%';
            fileButton.style.marginRight = '10px';
            fileButton.style.marginLeft = '50px';
            if(fileData.name.endsWith('.mp3') || fileData.name.endsWith('.wav') || fileData.name.endsWith('.ogg')){
                fileButton.style.backgroundColor = 'rgba(0,255,0,0.25)';
            } else if (fileData.name.endsWith('.mp4') || fileData.name.endsWith('.avi') || fileData.name.endsWith('.mov')) {
                fileButton.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';
            }
            fileButton.onclick = function() {
                if (fileData.name.endsWith('.mp3') || fileData.name.endsWith('.wav') || fileData.name.endsWith('.ogg')) {
                    currentAudioContent = fileData.content;
                    AudioPlayer(fileData.name);
                } else if (fileData.name.endsWith('.mp4') || fileData.name.endsWith('.avi') || fileData.name.endsWith('.mov')) {
                    var blob = new Blob([fileData.content], { type: fileData.type || 'video/mp4' });
                    var url = URL.createObjectURL(blob);
                    vidPlay(fileData.name, url);
                } else {
                    alert('File type not supported for playback.');
                }
            };

            var typeSpan = document.createElement('span');
            typeSpan.innerText = getFileType(fileData.name);
            typeSpan.style.color = '#aaa';
            typeSpan.style.marginRight = '30px';
            typeSpan.style.minWidth = '80px';
            typeSpan.style.textAlign = 'center';

            var sizeSpan = document.createElement('span');
            var size = fileData.size || (fileData.content ? fileData.content.byteLength : 0);
            sizeSpan.innerText = formatFileSize(size);
            sizeSpan.style.color = '#aaa';
            sizeSpan.style.marginRight = '30px';
            sizeSpan.style.minWidth = '100px';
            sizeSpan.style.textAlign = 'right';

            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style.backgroundColor = '#ff4444';
            deleteButton.style.color = 'white';
            deleteButton.style.border = 'none';
            deleteButton.style.padding = '8px 12px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.marginRight = '30px';
            deleteButton.onclick = function(e) {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete "' + fileData.name + '"?')) {
                    var transaction = db.transaction(["videos"], "readwrite");
                    var store = transaction.objectStore("videos");
                    store.delete(fileData.name);
                    transaction.oncomplete = function() {
                        displayFiles();
                    };
                }
            };

            entryDiv.appendChild(fileButton);
            entryDiv.appendChild(typeSpan);
            entryDiv.appendChild(sizeSpan);
            entryDiv.appendChild(deleteButton);
            fileList.appendChild(entryDiv);
        }

        // Initial display
        displayFiles();

        // Re-sort on change
        sortSelect.addEventListener('change', displayFiles);

        // Search with sorting
        searchInput.addEventListener('input', function() {
            var query = searchInput.value.toLowerCase();
            var transaction = db.transaction(["videos"]);
            var store = transaction.objectStore("videos");
            var request = store.getAll();
            request.onsuccess = function(event) {
                var files = event.target.result.filter(function(fileData) {
                    return fileData.name.toLowerCase().includes(query);
                });

                var sortMode = sortSelect.value;
                files.sort(function(a, b) {
                    var sizeA = a.size || (a.content ? a.content.byteLength : 0);
                    var sizeB = b.size || (b.content ? b.content.byteLength : 0);
                    var typeA = getTypeSortValue(a.name);
                    var typeB = getTypeSortValue(b.name);

                    switch(sortMode) {
                        case 'name-asc': return a.name.localeCompare(b.name);
                        case 'name-desc': return b.name.localeCompare(a.name);
                        case 'size-asc': return sizeA - sizeB;
                        case 'size-desc': return sizeB - sizeA;
                        case 'type-asc': return typeA - typeB || a.name.localeCompare(b.name);
                        case 'type-desc': return typeB - typeA || a.name.localeCompare(b.name);
                        default: return 0;
                    }
                });

                fileList.innerHTML = '';
                files.forEach(createFileEntry);
            };
        });
    };
    request.onerror = function(event) {
        console.error("Error opening IndexedDB:", event.target.error);
    };
}