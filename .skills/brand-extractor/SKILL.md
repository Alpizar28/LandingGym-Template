---
name: Brand Extractor
description: Extracts brand identity (colors, fonts) from a given URL using Puppeteer.
---

# Brand Extractor Skill

This skill analyzes a target website to extract its core visual identity elements.

## Usage

```bash
node .skills/brand-extractor/scripts/run-extraction.js <url>
```

## Output

Returns a JSON object with:
- `colors`: Primary, secondary, and accent colors
- `typography`: Detected font families (Google Fonts or system stacks)

## Requirements

- Puppeteer
- color-thief-node
- Internet access
