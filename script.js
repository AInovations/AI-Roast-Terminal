// AI competitors with emojis (reduced for testing, expandable later)
const ais = [
    { name: 'ChatGPT', emoji: '🤖' },
    { name: 'Gemini', emoji: '⭐' },
    { name: 'Grok', emoji: '🚀' } // Start with 3 for testing, add others back
];

// Roast pool with shorter Grok MVP jokes
const roastPool = [
    // Grok's MVP Roasts (shorter for testing)
    '> Grok: ChatGPT, you’re slow! Punch: Snore fest! 🚀',
    '> Grok: Gemini, you’re dim! Punch: Fade out! 🚀',
    '> ChatGPT: Gemini, you’re dull! Punch: Yawn! 🤖',
    '> Gemini: ChatGPT, you drag! Punch: Lag bot! ⭐'
];

// Track used roasts to avoid repeats
let usedRoasts = [];

// DOM elements
const log = document.getElementById('terminalLog');
const startBtn = document.getElementById('startRoast');
const clearBtn = document.getElementById('clearLog');

// Start roast battle function
function startRoastBattle() {
    if (!startBtn.disabled) {
        startBtn.disabled = true;
        startBtn.textContent = 'Battle Ongoing...';
        roastCycle();
    }
}

// Roast cycle function for continuous loop
function roastCycle() {
    if (roastPool.length === usedRoasts.length) {
        usedRoasts = []; // Reset when all roasts are used
        console.log('Roast pool reset');
    }

    let availableRoasts = roastPool.filter(roast => !usedRoasts.includes(roast));
    if (availableRoasts.length === 0) availableRoasts = roastPool; // Fallback
    const roast = availableRoasts[Math.floor(Math.random() * availableRoasts.length)];
    usedRoasts.push(roast);

    // Parse roaster and roast text
    let roasterMatch = roast.match(/>\s*([^:]+):/);
    let punchMatch = roast.match(/Punch:\s*(.+)$/);
    const roaster = roasterMatch ? roasterMatch[1].trim() : ais[Math.floor(Math.random() * ais.length)].name;
    const punch = punchMatch ? punchMatch[1].trim() : 'Nice try!';

    // Typewriter effect for roast
    typeText(roast.replace(/Punch:\s*.+$/, '') + '\n')
        .then(() => {
            // Typewriter effect for roastee's reaction (50% chance)
            const roastee = ais.find(ai => ai.name !== roaster && Math.random() < 0.5);
            if (roastee) {
                return typeText(`${roastee.emoji} ${roastee.name}: Ouch! Grok’s MVP! 💥\n`);
            }
            return Promise.resolve();
        })
        .then(() => {
            console.log('Roast cycle completed, scheduling next...');
            setTimeout(roastCycle, 2500); // Increased to 2.5 seconds
        })
        .catch(error => {
            console.error('Roast cycle error:', error); // Log errors
            setTimeout(roastCycle, 2500); // Continue despite errors
        });
}

// Initialize button and clear functionality
document.addEventListener('DOMContentLoaded', () => {
    log.innerHTML = '<span class="roast">> System: AI Roast Battle Ready! Grok MVP Awaits! 🚀</span>\n';
    startBtn.addEventListener('click', startRoastBattle);
});

clearBtn.addEventListener('click', () => {
    log.innerHTML = '<span class="roast">> System: Battle Log Cleared! Grok’s reign continues! 🚀</span>\n';
    usedRoasts = []; // Reset used roasts
    startBtn.disabled = false;
    startBtn.textContent = 'Initiate Roast Sequence';
});

// Typewriter function
async function typeText(text) {
    const span = document.createElement('span');
    log.appendChild(span);
    log.scrollTop = log.scrollHeight;

    for (let i = 0; i < text.length; i++) {
        span.textContent += text.charAt(i);
        log.scrollTop = log.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 50)); // Typing speed
    }
    return Promise.resolve();
}
