const puppeteer = require('puppeteer');

async function extractColors(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        const colors = await page.evaluate(() => {
            function rgbToHex(rgb) {
                if (!rgb) return null;
                if (rgb.startsWith('#')) return rgb;
                const rgbMatch = rgb.match(/\d+/g);
                if (!rgbMatch || rgbMatch.length < 3) return null;
                const [r, g, b] = rgbMatch;
                return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
            }

            // Get styles of key elements
            const body = window.getComputedStyle(document.body);
            const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(el => window.getComputedStyle(el));
            const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], a[class*="button"]')).map(el => window.getComputedStyle(el));

            const bg = rgbToHex(body.backgroundColor) || '#FFFFFF';
            const text = rgbToHex(body.color) || '#000000';

            let primary = '#000000';
            let accent = '#FFFF00';

            // Find primary from buttons or headings
            const potentialColors = {};
            [...headings, ...buttons].forEach(style => {
                const color = rgbToHex(style.color);
                const bg = rgbToHex(style.backgroundColor);
                if (color && color !== '#000000' && color !== '#ffffff') potentialColors[color] = (potentialColors[color] || 0) + 1;
                if (bg && bg !== '#000000' && bg !== '#ffffff' && bg !== 'rgba(0, 0, 0, 0)') potentialColors[bg] = (potentialColors[bg] || 0) + 1;
            });

            const sortedColors = Object.entries(potentialColors).sort((a, b) => b[1] - a[1]);
            if (sortedColors.length > 0) primary = sortedColors[0][0];
            if (sortedColors.length > 1) accent = sortedColors[1][0];

            return {
                background: bg,
                text: text,
                primary: primary,
                secondary: '#1A1A1A', // Fallback
                accent: accent
            };
        });

        return colors;
    } catch (error) {
        console.error('Error extracting colors:', error);
        return {
            primary: '#000000', secondary: '#333333', accent: '#666666', background: '#ffffff', text: '#000000'
        };
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { extractColors };
