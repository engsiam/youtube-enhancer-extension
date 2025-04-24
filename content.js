// Function to force HD video quality (called only when user clicks in popup)
function setHDQuality() {
    const settingsButton = document.querySelector('.ytp-settings-button');
    if (settingsButton) {
        settingsButton.click(); // Open the settings menu

        setTimeout(() => {
            // Look for the "Quality" menu option
            const qualityMenuButton = Array.from(document.querySelectorAll('.ytp-menuitem')).find(
                (item) => item.textContent.includes('Quality')
            );

            if (qualityMenuButton) {
                qualityMenuButton.click(); // Open the quality menu

                setTimeout(() => {
                    // Select the highest quality (usually the first option)
                    const qualityOptions = document.querySelectorAll('.ytp-quality-menu .ytp-menuitem');
                    if (qualityOptions.length > 0) {
                        qualityOptions[0].click(); // Select the highest quality available
                        console.log('HD Quality selected!');
                    } else {
                        console.log('No quality options found.');
                    }
                }, 500); // Allow the quality options to load
            } else {
                console.log('Quality menu button not found.');
            }
        }, 500); // Allow the settings menu to load
    } else {
        console.log('Settings button not found.');
    }
}
