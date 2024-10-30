// document.addEventListener('DOMContentLoaded', function() {

//     const languageSelect = document.getElementById('language-select');
//     const translateBtn = document.getElementById('translate-btn');
//     const sentMsgTranslateBtn = document.getElementById('sent-msg-translate-btn');

//     // Event listener to translate messages from input field
//     sentMsgTranslateBtn.addEventListener('click', () => {
//         const selectedLanguage = languageSelect.value;
//         if (chrome && chrome.tabs) {
//             chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//                 console.log('Calling transformSentMessage');
//                 chrome.scripting.executeScript({
//                     target: { tabId: tabs[0].id },
//                     function: transformSentMessage,
//                     args: [selectedLanguage]
//                 });
//             });
//         }
//     });

//     // Event listener to translate existing messages in chat
//     translateBtn.addEventListener('click', () => {
//         const selectedLanguage = languageSelect.value;
//         if (chrome && chrome.tabs) {
//             chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//                 console.log('Calling transformMessages');
//                 chrome.scripting.executeScript({
//                     target: { tabId: tabs[0].id },
//                     function: transformMessages,
//                     args: [selectedLanguage]
//                 });
//             });
//         } else {
//             console.log('This code only works in Chrome Extension mode.');
//         }
//     });

// });

// // Function to translate the message in the input field
// async function transformSentMessage(selectedLanguage) {
//     const mainEl = document.querySelector('#main');
//     const textareaEl = mainEl?.querySelector('div[contenteditable="true"]');
    
//     if (!textareaEl) {
//         console.log('No active conversation found.');
//     } else {
//         textareaEl.focus();
//         const selection = window.getSelection();
//         const range = document.createRange();
//         range.selectNodeContents(textareaEl);
//         selection.removeAllRanges();
//         selection.addRange(range);
//         const currentText = selection.toString();

//         const translatedText = await getTranslatedText(currentText, selectedLanguage);
//         document.execCommand('insertText', false, translatedText);
//         selection.removeAllRanges();
//     }
// }

// // Function to translate existing messages
// async function transformMessages(selectedLanguage) {
//     const messageContainers = document.querySelectorAll('div[class*="message"] span[dir="ltr"]');
    
//     for (const messageEl of messageContainers) {
//         const originalText = messageEl.innerText;
//         const translatedText = await getTranslatedText(originalText, selectedLanguage);
//         messageEl.innerText = translatedText;
//     }
// }

// // Function to get the translated text from the backend API
// async function getTranslatedText(text, language) {
//     try {
//         const response = await fetch('http://localhost:3000/api/translate', {
//             method: 'POST',
//             body: JSON.stringify({ text, language }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await response.json();
//         return data.translatedText || 'Translation Error';
//     } catch (error) {
//         console.error('Error fetching translation:', error);
//         return 'Translation Error';
//     }
// }



document.addEventListener('DOMContentLoaded', function() {

    const languageSelect = document.getElementById('language-select');
    const translateBtn = document.getElementById('translate-btn');
    const sentMsgTranslateBtn = document.getElementById('sent-msg-translate-btn');

    // Event listener to translate messages from input field
    sentMsgTranslateBtn.addEventListener('click', () => {
        const selectedLanguage = languageSelect.value;
        if (chrome && chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                console.log('Calling transformSentMessage');
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: transformSentMessage,
                    args: [selectedLanguage]
                });
            });
        }
    });

    // Event listener to translate existing messages in chat
    translateBtn.addEventListener('click', () => {
        const selectedLanguage = languageSelect.value;
        if (chrome && chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                console.log('Calling transformMessages');
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: transformMessages,
                    args: [selectedLanguage]
                });
            });
        } else {
            console.log('This code only works in Chrome Extension mode.');
        }
    });

});

// Function to "translate" the message in the input field
function transformSentMessage(selectedLanguage) {
    const mainEl = document.querySelector('#main');
    const textareaEl = mainEl?.querySelector('div[contenteditable="true"]');
    
    if (!textareaEl) {
        console.log('No active conversation found.');
    } else {
        textareaEl.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(textareaEl);
        selection.removeAllRanges();
        selection.addRange(range);
        const currentText = selection.toString();

        const translatedText = `Translated text is: "${currentText}"`;
        document.execCommand('insertText', false, translatedText);
        selection.removeAllRanges();
    }
}

// Function to "translate" existing messages
function transformMessages(selectedLanguage) {
    const messageContainers = document.querySelectorAll('div[class*="message"] span[dir="ltr"]');
    
    for (const messageEl of messageContainers) {
        const originalText = messageEl.innerText;
        const translatedText = `Translated text is: "${originalText}"`;
        messageEl.innerText = translatedText;
    }
}
