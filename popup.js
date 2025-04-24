// Listen for Skip Ads button click
document.getElementById("skipAdsBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: skipAds
        });
    });
});

// Listen for Force HD Quality button click
document.getElementById("setHDQualityBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: setHDQuality
        });
    });
});

// Add event listeners for each speed button
document.querySelectorAll('.speed-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const speed = event.target.getAttribute('data-speed');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setPlaybackSpeed,
                args: [parseFloat(speed)]
            });
        });
    });
});

// Functions to be executed on YouTube page

// Function to skip ads
function skipAds() {
    const skipButton = document.querySelector('.ytp-ad-skip-button');
    if (skipButton) {
        skipButton.click();
        console.log("Ad skipped!");
    }
}

// Function to set HD video quality
function setHDQuality() {
    const settingsButton = document.querySelector('.ytp-settings-button');
    if (settingsButton) {
        settingsButton.click();

        setTimeout(() => {
            const qualityMenuButton = Array.from(document.querySelectorAll('.ytp-menuitem')).find(
                (item) => item.textContent.includes('Quality')
            );

            if (qualityMenuButton) {
                qualityMenuButton.click();

                setTimeout(() => {
                    const qualityOptions = document.querySelectorAll('.ytp-quality-menu .ytp-menuitem');
                    if (qualityOptions.length > 0) {
                        qualityOptions[0].click(); // Select the highest quality available
                        console.log('HD Quality selected!');
                    } else {
                        console.log('No quality options found.');
                    }
                }, 500);
            } else {
                console.log('Quality menu button not found.');
            }
        }, 500);
    } else {
        console.log('Settings button not found.');
    }
}

// Function to set the playback speed
function setPlaybackSpeed(speed) {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = speed;
        console.log(`Playback speed set to ${speed}x`);
    } else {
        console.log('Video element not found.');
    }
}
