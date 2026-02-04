const { extractColors } = require('./extract-colors');
const { extractFonts } = require('./extract-fonts');
const fs = require('fs');
const path = require('path');

const url = process.argv[2];

if (!url) {
    console.error("Please provide a URL as an argument.");
    process.exit(1);
}

(async () => {
    console.log(`Starting extraction for ${url}...`);
    try {
        const [colors, typography] = await Promise.all([
            extractColors(url),
            extractFonts(url)
        ]);

        const result = {
            gymId: "extracted-gym",
            brandName: "Extracted Brand",
            extractedFrom: url,
            colors,
            typography,
            activeSections: ["home", "services", "contact"] // Default
        };

        console.log(JSON.stringify(result, null, 2));

        // Optional: write to file if needed
        // fs.writeFileSync(path.join(__dirname, '../../../config/extracted.json'), JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("Extraction failed:", error);
        process.exit(1);
    }
})();
