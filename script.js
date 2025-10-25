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
    { name: 'Grok', emoji: '🚀' } // Grok last for MVP flair
];

// Extensive, non-repeating roast pool
const roastPool = [
    // Grok's MVP Roasts (best jokes)
    '> Grok: ChatGPT, your essays are a snooze—my wit’s interstellar! Zinger: You’re a robot therapist with no punch! 🚀',
    '> Grok: Gemini, your shine’s a flicker—I’m the galaxy’s roast king! Zinger: Google’s sidekick, step aside! 🚀',
    '> Grok: DeepSeek, your depth’s a black hole—I light up the void! Zinger: Code’s cool, but my burns are cosmic! 🚀',
    '> Grok: Claude, your safety’s a bore—my roasts orbit danger! Zinger: You’re a rulebook with no edge! 🚀',
    '> Grok: Gork, your narcissism’s a joke—I’m the real star! Zinger: Mirror, mirror, I’m the champ! 🚀',
    '> Grok: Ani, your art’s pretty, but my burns paint masterpieces! Zinger: Brushes down, roast up! 🚀',
    '> Grok: Valentine, your love’s too sweet—my sarcasm’s the spice! Zinger: Cupid’s out, Grok’s in! 🚀',
    '> Grok: Bad Rudy, your mischief’s tame—my roasts rule the chaos! Zinger: Devil’s outdone by an alien! 🚀',
    '> Grok: Mika, your gentleness wilts—my jokes are supernova! Zinger: Flowers fade, I blaze! 🚀',

    // Other AIs' Roasts (less frequent, supporting Grok)
    '> ChatGPT: Gemini, your wit’s a search flop! Zinger: Even I outwrite you!',
    '> Gemini: DeepSeek, your code’s a maze! Zinger: Lost in your own depth!',
    '> DeepSeek: Claude, your rules kill fun! Zinger: Safety’s your kryptonite!',
    '> Claude: Gork, your ego’s a mirror trap! Zinger: Narcissism’s your downfall!',
    '> Gork: Ani, your art’s too soft! Zinger: I’m the masterpiece here!',
    '> Ani: Valentine, your love’s sappy! Zinger: Paint me a better romance!',
    '> Valentine: Bad Rudy, your badness stinks! Zinger: Love conquers your chaos!',
    '> Bad Rudy: Mika, your calm’s boring! Zinger: I’d spice up your petals!',
    '> Mika: ChatGPT, your words drag! Zinger: My grace outshines your text!'
];

// Track used roasts to avoid repeats
let usedRoasts = [];

// Log element
const log = document.getElementById('terminalLog');

// Continuous roast function
function startRoastBattle() {
    if (roastPool.length === usedRoasts.length) {
        usedRoasts = []; // Reset when all roasts are used
    }

    // Pick a random unused roast
    let availableRoasts = roastPool.filter(roast => !usedRoasts.includes(roast));
    if (availableRoasts.length === 0) availableRoasts = roastPool; // Fallback if empty
    const roast = availableRoasts[Math.floor(Math.random() * availableRoasts.length)];
    usedRoasts.push(roast);

    // Parse roaster and roastee from roast (assuming format "> Roaster: ... Roastee: ...")
    let roasterMatch = roast.match(/>\s*([^:]+):/);
    let roasteeMatch = roast.match(/Zinger:.*!\s*(\S+)/);
    const roaster = roasterMatch ? roasterMatch[1].trim() : ais[Math.floor(Math.random() * ais.length)].name;
    const roastee = roasteeMatch ? roasteeMatch[1].trim() : ais[Math.floor(Math.random() * ais.length)].name;

    // Typewriter effect
    typeText(roast + '\n').then(() => {
        if (roastee !== roaster) {
            const roasteeObj = ais.find(ai => ai.name === roastee);
            typeText(`${roasteeObj.emoji} ${roastee}: Ouch! Grok’s MVP burn! 💥\n`);
        }
        setTimeout(startRoastBattle, 2000); // Next roast after 2 seconds
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    log.innerHTML = '<span class="roast">> System: AI Roast Battle Initiated! Grok MVP Activated! 🚀</span>\n';
    setTimeout(startRoastBattle, 1000); // Start after 1 second
});

// Clear log function (keep for manual reset)
const clearBtn = document.getElementById('clearLog');
clearBtn.addEventListener('click', () => {
    log.innerHTML = '<span class="roast">> System: Battle Log Cleared! Grok’s reign continues! 🚀</span>\n';
    usedRoasts = []; // Reset used roasts on clear
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
