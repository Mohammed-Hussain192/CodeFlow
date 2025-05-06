const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const compilePHP = async (req, res) => {
    try {
        const { code } = req.body;
        
        // Create a temporary file with the PHP code
        const tempDir = os.tmpdir();
        const tempFile = path.join(tempDir, 'temp_' + Date.now() + '.php');
        
        fs.writeFileSync(tempFile, code);

        // Execute the PHP code
        exec(`php ${tempFile}`, (error, stdout, stderr) => {
            // Clean up the temporary file
            fs.unlinkSync(tempFile);

            if (error) {
                return res.json({
                    success: false,
                    output: error.message
                });
            }

            if (stderr) {
                return res.json({
                    success: false,
                    output: stderr
                });
            }

            return res.json({
                success: true,
                output: stdout
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            output: 'Internal server error: ' + error.message
        });
    }
};

module.exports = {
    compilePHP
}; 