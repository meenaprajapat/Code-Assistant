// runs when clicks the extension icon.

document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.getElementById('saveKey');
    const statusDiv = document.getElementById('status');
    const closeButton = document.getElementById('close-btn');
    const toggleKey = document.getElementById('toggleKey');
    const onboarding = document.getElementById('onboarding');
    const savedBadge = document.getElementById('saved-badge');
    const removeButton = document.getElementById('removeKey');

    // Toggle onboarding banner vs. "all set" badge based on whether a key exists.
    function reflectKeyState(hasKey) {
        if (hasKey) {
            onboarding.style.display = 'none';
            savedBadge.classList.add('show');
            removeButton.classList.add('show');
        } else {
            onboarding.style.display = 'block';
            savedBadge.classList.remove('show');
            removeButton.classList.remove('show');
        }
    }

    // show/hide the API key
    toggleKey.addEventListener('change', function () {
        apiKeyInput.type = toggleKey.checked ? 'text' : 'password';
    });

    // check for API Key
    chrome.storage.sync.get(['geminiApiKey'], function (result) {
        if (result.geminiApiKey) {
            apiKeyInput.value = result.geminiApiKey;
            statusDiv.textContent = 'API Key is loaded.';
            statusDiv.style.color = 'green';
            reflectKeyState(true);
        } else {
            statusDiv.textContent = 'API Key not set.';
            statusDiv.style.color = 'red';
            reflectKeyState(false);
        }
    });

    // save API Key
    saveButton.addEventListener('click', function () {
        const apiKey = apiKeyInput.value.trim();

        // Gemini keys come in two shapes from AI Studio: the classic "AIza..."
        // keys and the newer "AQ..." keys. Accept both; only reject something
        // that is clearly not a key (too short / obviously wrong).
        const looksLikeKey = apiKey.startsWith('AIza') || apiKey.startsWith('AQ');
        if (apiKey && (!looksLikeKey || apiKey.length < 20)) {
            statusDiv.innerHTML = 'That does not look like a valid key. Copy the full key from '
                + '<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Google AI Studio</a> '
                + 'using its <b>Copy</b> button.';
            statusDiv.style.color = '#e0a500';
            return;
        }

        if (apiKey) {
            // Save the key to Chrome's synchronized storage
            chrome.storage.sync.set({ 'geminiApiKey': apiKey }, function () {
                statusDiv.textContent = 'API Key saved successfully!';
                statusDiv.style.color = 'green';
                reflectKeyState(true);
                setTimeout(() => { statusDiv.textContent = ''; }, 3000);
            });
        } else {
            statusDiv.textContent = 'Please enter a valid API key.';
            statusDiv.style.color = 'red';
        }
    });

    // remove the saved key
    removeButton.addEventListener('click', function () {
        chrome.storage.sync.remove('geminiApiKey', function () {
            apiKeyInput.value = '';
            statusDiv.textContent = 'Key removed.';
            statusDiv.style.color = '#e0a500';
            reflectKeyState(false);
            setTimeout(() => { statusDiv.textContent = ''; }, 3000);
        });
    });

    // close the popup
    closeButton.addEventListener('click', function () {
        window.close();
    });
});