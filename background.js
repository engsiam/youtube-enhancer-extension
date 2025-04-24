chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (command === 'force_hd') {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setHDQuality
            });
        } else if (command === 'set_speed_1') {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setPlaybackSpeed,
                args: [1]
            });
        } else if (command === 'set_speed_1_5') {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setPlaybackSpeed,
                args: [1.5]
            });
        } else if (command === 'set_speed_1_7') {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setPlaybackSpeed,
                args: [1.7]
            });
        } else if (command === 'set_speed_2') {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setPlaybackSpeed,
                args: [2]
            });
        }
    });
});

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
