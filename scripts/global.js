
// LOAD - load page wrurzbita.live
window.onload = function() {
    setTimeout(function() {
        // fade out loading screen
        document.getElementById('loading-screen').classList.add('hidden');

        // show elements
        document.querySelector('.video-container').classList.add('visible');
        document.querySelector('.chat-container').classList.add('visible');
        document.querySelector('.link-container').classList.add('visible');
    },100); 
};

// POPUP - show popup after 7 sec
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var popup = document.getElementById('popup');
        popup.style.display = 'block'; 

        // auto hide after 7 sec
        var hideTimeout = setTimeout(function() {
            popup.style.display = 'none'; 
        }, 7000); 

        // instant hide on click
        popup.addEventListener("click", function() {
            clearTimeout(hideTimeout);
            popup.style.display = 'none';
        });
    }, 7000); // load after 7 sec
});

// STREAM MEDIA - load yt media/stream & ttv chat from stream.json
fetch('stream.json')
    .then(response => response.json())
    .then(data => {
        // yt media id
        const youtubeIframe = document.getElementById('youtube-iframe');
        youtubeIframe.src = `https://www.youtube.com/embed/${data.youtube.video_id}?autoplay=1&mute=0`;

        // ttv chat nickname & domain
        const twitchIframe = document.getElementById('twitch-iframe');
        twitchIframe.src = `https://www.twitch.tv/embed/${data.twitch.nickname}/chat?parent=${data.domain.name}&darkpopout`;
});


// FULLSCREEN - toggle fullscreen
function toggleStylesheet() {
    let stylesheet = document.getElementById("stylesheet");
    let currentHref = stylesheet.getAttribute("href");

    // toggle "css/layout.css" and "css/view.css"
    stylesheet.setAttribute("href", currentHref === "css/layout.css" ? "css/view.css" : "css/layout.css");
}

// STRUSZUFKA
setTimeout(() => {
    // ignore
    const ignoredSelectors = ["#popup", ".donate", ".watermark"];

    // extract
    function getTrackedElements() {
        let elements = document.querySelectorAll("body *");
        let tracked = new Set();
        
        elements.forEach(el => {
            if (ignoredSelectors.some(selector => el.matches(selector))) return;
            if (el.id) tracked.add(`#${el.id}`);
            el.classList.forEach(cls => tracked.add(`.${cls}`));
        });

        return tracked;
    }

    // save
    let initialElements = getTrackedElements();

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach(node => {
                    if (!(node instanceof HTMLElement)) return;

                    let nodeId = node.id ? `#${node.id}` : null;
                    let nodeClasses = [...node.classList].map(cls => `.${cls}`);

                    if (nodeId && initialElements.has(nodeId)) {
                        console.log(`Element ${nodeId} removed! Reloading...`);
                        location.reload();
                    }
                    
                    nodeClasses.forEach(cls => {
                        if (initialElements.has(cls)) {
                            console.log(`Element with class ${cls} removed! Reloading...`);
                            location.reload();
                        }
                    });
                });
            }
        }
    });

    observer.observe(document.body, { 
        childList: true,  
        subtree: true     
    });

}, 1000);

document.addEventListener("contextmenu", (event) => event.preventDefault());