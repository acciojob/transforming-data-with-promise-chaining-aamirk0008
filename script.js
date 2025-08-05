//your JS code here. If required.
 const inputElement = document.getElementById('ip');
      const buttonElement = document.getElementById('btn');
      const outputElement = document.getElementById('output');
      const progressElement = document.getElementById('progress');

      // Add click event listener to the button
      buttonElement.addEventListener('click', function() {
        // Get the input value and convert to number
        const inputValue = parseFloat(inputElement.value);
        
        // Validate input
        if (isNaN(inputValue)) {
          outputElement.textContent = 'Please enter a valid number';
          outputElement.className = '';
          return;
        }
        
        // Disable button during processing
        buttonElement.disabled = true;
        buttonElement.textContent = 'Processing...';
        
        // Reset progress bar
        progressElement.style.width = '0%';
        
        // Clear output
        outputElement.textContent = '';
        outputElement.className = '';
        
        // Start the promise chain
        startPromiseChain(inputValue);
      });

      function startPromiseChain(initialValue) {
        // First Promise - Display initial value after 2 seconds
        createDelayedPromise(initialValue, 2000)
          .then(result => {
            outputElement.textContent = `Result: ${result}`;
            outputElement.className = 'result';
            progressElement.style.width = '20%';
            return result;
          })
          // Second Promise - Multiply by 2 after 2 seconds
          .then(result => {
            return createDelayedPromise(result * 2, 2000);
          })
          .then(result => {
            outputElement.textContent = `Result: ${result}`;
            outputElement.className = 'result';
            progressElement.style.width = '40%';
            return result;
          })
          // Third Promise - Subtract 3 after 1 second
          .then(result => {
            return createDelayedPromise(result - 3, 1000);
          })
          .then(result => {
            outputElement.textContent = `Result: ${result}`;
            outputElement.className = 'result';
            progressElement.style.width = '60%';
            return result;
          })
          // Fourth Promise - Divide by 2 after 1 second
          .then(result => {
            return createDelayedPromise(result / 2, 1000);
          })
          .then(result => {
            outputElement.textContent = `Result: ${result}`;
            outputElement.className = 'result';
            progressElement.style.width = '80%';
            return result;
          })
          // Fifth Promise - Add 10 after 1 second
          .then(result => {
            return createDelayedPromise(result + 10, 1000);
          })
          .then(result => {
            outputElement.textContent = `Final Result: ${result}`;
            outputElement.className = 'result final-result';
            progressElement.style.width = '100%';
            
            // Re-enable button
            buttonElement.disabled = false;
            buttonElement.textContent = 'Start';
          })
          .catch(error => {
            outputElement.textContent = `Error: ${error.message}`;
            outputElement.className = '';
            buttonElement.disabled = false;
            buttonElement.textContent = 'Start';
            progressElement.style.width = '0%';
          });
      }

      // Helper function to create a promise that resolves after a delay
      function createDelayedPromise(value, delay) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value);
          }, delay);
        });
      }

      // Allow Enter key to trigger the calculation
      inputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          buttonElement.click();
        }
      });