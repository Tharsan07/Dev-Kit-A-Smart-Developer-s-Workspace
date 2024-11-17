// Selecting the required elements
const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const outputFrame = document.getElementById('output');
const outputContainer = document.querySelector('.output-container');

// Check if elements exist
if (htmlEditor && cssEditor && jsEditor && outputFrame && outputContainer) {

    // Function to update the live output
    function updateOutput() {
        const html = htmlEditor.value || ''; // Default to empty string if undefined
        const css = `<style>${cssEditor.value || ''}</style>`;
        const js = `<script>
            try {
                ${jsEditor.value || ''}
            } catch (e) {
                console.error(e);
                alert('JavaScript error: ' + e.message);
            }
        </script>`;
        const output = html + css + js;

        // Log the content to be written to the iframe for debugging
        console.log("HTML:", html);
        console.log("CSS:", css);
        console.log("JS:", js);

        outputFrame.contentDocument.open();
        outputFrame.contentDocument.write(output);
        outputFrame.contentDocument.close();
    }

    // Add event listeners to update the output on input
    htmlEditor.addEventListener('input', updateOutput);
    cssEditor.addEventListener('input', updateOutput);
    jsEditor.addEventListener('input', updateOutput);

    // Copy code from the textarea
    function copyCode(editorId) {
        const editor = document.getElementById(editorId);
        if (editor) {
            navigator.clipboard.writeText(editor.value).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            alert('Editor not found.');
        }
    }

    // Toggle Fullscreen Functionality
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen mode
            outputContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

} else {
    console.error('One or more required elements are missing.');
}
