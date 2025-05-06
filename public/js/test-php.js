// Simple PHP execution test
async function testPHPExecution() {
    try {
        // Simple PHP code to test
        const testCode = '<?php echo "Hello from PHP test!"; ?>';
        
        // Create a simple executor that uses fetch directly
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: "php",
                version: "8.2.3",
                files: [{
                    name: "main.php",
                    content: testCode
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log("PHP Test Response:", data);
        
        // Display the result
        const outputDiv = document.createElement('div');
        outputDiv.style.padding = '10px';
        outputDiv.style.margin = '10px';
        outputDiv.style.border = '1px solid #ccc';
        outputDiv.style.borderRadius = '5px';
        
        if (data.run && data.run.stdout) {
            outputDiv.innerHTML = `<strong>Success!</strong> Output: ${data.run.stdout}`;
            outputDiv.style.color = 'green';
        } else if (data.run && data.run.stderr) {
            outputDiv.innerHTML = `<strong>Error:</strong> ${data.run.stderr}`;
            outputDiv.style.color = 'red';
        } else {
            outputDiv.innerHTML = `<strong>Unknown response:</strong> ${JSON.stringify(data)}`;
            outputDiv.style.color = 'orange';
        }
        
        document.getElementById('test1-result').innerHTML = outputDiv.innerHTML;
        document.getElementById('test1-result').style.color = outputDiv.style.color;
        
    } catch (error) {
        console.error("PHP Test Error:", error);
        
        // Display the error
        document.getElementById('test1-result').innerHTML = `<strong>Error:</strong> ${error.message}`;
        document.getElementById('test1-result').style.color = 'red';
    }
}

// Run the test when the page loads
document.addEventListener('DOMContentLoaded', testPHPExecution); 