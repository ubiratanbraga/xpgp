export const Clipboard = {
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            // Modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            
            // Fallback for older browsers
            return this.fallbackCopyToClipboard(text);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            return false;
        }
    },
    
    // Fallback clipboard method for older browsers
    fallbackCopyToClipboard(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            return successful;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            return false;
        }
    },
    
    // Add copy button to output elements
    addCopyButton(outputElement, textToCopy) {
        // Remove existing copy button if present
        const existingButton = outputElement.querySelector('.copy-btn');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn copy-btn'; // Use your CSS classes
        copyBtn.textContent = '📋 Copy';
        
        copyBtn.addEventListener('click', async () => {
            const success = await this.copyToClipboard(textToCopy);
            if (success) {
                copyBtn.textContent = '✅ Copied!'; // Fixed typo here (was btn-copyBtn)
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                }, 2000);
            } else {
                copyBtn.textContent = '❌ Failed';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                }, 2000);
            }
        });
        
        outputElement.appendChild(copyBtn);
    }
};
