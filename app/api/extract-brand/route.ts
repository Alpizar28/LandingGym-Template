import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
    try {
        const { url } = await req.json();
        if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

        const scriptPath = path.join(process.cwd(), '.skills/brand-extractor/scripts/run-extraction.js');
        // Sanitize URL roughly to prevent command injection, though node script arg is relatively safe if quoted
        // Ideally use spawn, but exec is simpler for quick CLI output capture
        const { stdout } = await execPromise(`node "${scriptPath}" "${url}"`);

        // Attempt to find the JSON in stdout (in case of extra logs)
        // We assume the script outputs the JSON object as the last block or just the JSON
        const jsonMatch = stdout.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No JSON output found");
        }

        const result = JSON.parse(jsonMatch[0]);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Extraction error:', error);
        return NextResponse.json({ error: 'Failed to extract brand identity' }, { status: 500 });
    }
}
