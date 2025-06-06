// Simple PHP Code Executor
class PHPExecutor {
    constructor() {
        this.apiEndpoint = "https://emkc.org/api/v2/piston/execute";
    }

    async executeCode(code) {
        try {
            console.log("Executing PHP code with Piston API...");
            
            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: "php",
                    version: "8.2.3",
                    files: [{
                        name: "main.php",
                        content: code
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log("Piston API response:", data);
            
            // Check for compilation errors
            if (data.compile && data.compile.stderr) {
                return {
                    output: "",
                    error: data.compile.stderr,
                    status: "compilation_error"
                };
            }
            
            // Check for runtime errors
            if (data.run && data.run.stderr) {
                return {
                    output: data.run.stdout || "",
                    error: data.run.stderr,
                    status: "runtime_error"
                };
            }
            
            // Success case
            return {
                output: data.run.stdout || "",
                error: "",
                status: "success"
            };
        } catch (error) {
            console.error("PHP execution error:", error);
            return {
                output: "",
                error: error.message,
                status: "error"
            };
        }
    }
}

// Export the executor
window.PHPExecutor = PHPExecutor; 