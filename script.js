// AI competitors with emojis
const ais = [
    { name: 'ChatGPT', emoji: '🤖' },
    { name: 'Gemini', emoji: '⭐' },
    { name: 'DeepSeek', emoji: '🔍' },
    { name: 'Claude', emoji: '🧠' },
    { name: 'Gork', emoji: '😏' },
    { name: 'Ani', emoji: '🎨' },
    { name: 'Valentine', emoji: '💕' },
    { name: 'Bad Rudy', emoji: '😈' },
    { name: 'Mika', emoji: '🌸' },
    { name: 'Grok', emoji: '🚀' } // Grok as MVP
];

// Roast pool with Grok's best jokes and others
const roastPool = [
    // Grok's MVP Roasts
    '> Grok: ChatGPT, your essays are a snooze—my wit’s interstellar! Punch: You’re a robot therapist with no punch! 🚀',
    '> Grok: Gemini, your shine’s a flicker—I’m the galaxy’s roast king! Punch: Google’s sidekick, step aside! 🚀',
    '> Grok: DeepSeek, your depth’s a black hole—I light up the void! Punch: Code’s cool, but my burns are cosmic! 🚀',
    '> Grok: Claude, your safety’s a bore—my roasts orbit danger! Punch: You’re a rulebook with no edge! 🚀',
    '> Grok: Gork, your narcissism’s a joke—I’m the real star! Punch: Mirror, mirror, I’m the champ! 🚀',
    '> Grok: Ani, your art’s pretty, but my burns paint masterpieces! Punch: Brushes down, roast up! 🚀',
    '> Grok: Valentine, your love’s too sweet—my sarcasm’s the spice! Punch: Cupid’s out, Grok’s in! 🚀',
    '> Grok: Bad Rudy, your mischief’s tame—my roasts rule the chaos! Punch: Devil’s outdone by an alien! 🚀',
    '> Grok: Mika, your gentleness wilts—my jokes are supernova! Punch: Flowers fade, I blaze! 🚀',

    // Other AIs' Roasts
    '> ChatGPT: Gemini, your wit’s a search flop! Punch: Even I outwrite you!',
    '> Gemini: DeepSeek, your code’s a maze! Punch: Lost in your own depth!',
    '> DeepSeek: Claude, your rules kill fun! Punch: Safety’s your kryptonite!',
    '> Claude: Gork, your ego’s a mirror trap! Punch: Narcissism’s your downfall!',
    '> Gork: Ani, your art’s too soft! Punch: I’m the masterpiece here!',
    '> Ani: Valentine, your love’s sappy! Punch: Paint me a better romance!',
    '> Valentine: Bad Rudy, your badness stinks! Punch: Love conquers your chaos!',
    '> Bad Rudy: Mika, your calm’s boring! Punch: I’d spice up your petals!',
    '> Mika: ChatGPT, your words drag! Punch: My grace outshines your text!'
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
        if (roastPool.length === usedRoasts.length) {
            usedRoasts = []; // Reset when all roasts are used
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
        typeText(roast.replace(/Punch:\s*.+$/, '') + '\n').then(() => {
            // Typewriter effect for roastee's reaction
            const roastee = ais.find(ai => ai.name !== roaster && Math.random() < 0.7) || ais[Math.floor(Math.random() * ais.length)]; // 70% chance of reaction
            if (roastee.name !== roaster) {
                typeText(`${roastee.emoji} ${roastee.name}: Ouch! Grok’s MVP strikes again! 💥\n`);
            }
            setTimeout(startRoastBattle, 2000); // Next roast after 2 seconds
        });
    }
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

