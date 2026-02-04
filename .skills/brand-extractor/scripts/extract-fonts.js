const puppeteer = require('puppeteer');

async function extractFonts(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        const typography = await page.evaluate(() => {
            const bodyFn = window.getComputedStyle(document.body).fontFamily;
            const headingEl = document.querySelector('h1, h2, h3');
            const headingFn = headingEl ? window.getComputedStyle(headingEl).fontFamily : bodyFn;

            return {
                body: bodyFn.split(',')[0].replace(/['"]/g, ''),
                heading: headingFn.split(',')[0].replace(/['"]/g, ''),
                // Heuristic for Google Fonts
                googleFonts: [] // Identifying actual Google Fonts requires more complex parsing of <link> tags
            };
        });

        // Attempt to find Google Fonts links
        const googleFonts = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
            return links.map(link => link.href);
        });

        typography.googleFonts = googleFonts;
        return typography;

    } catch (error) {
        console.error('Error extracting fonts:', error);
        return { body: 'Inter', heading: 'Inter', googleFonts: [] };
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { extractFonts };
