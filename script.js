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

// Roast pool without Zinger
const roastPool = [
    // Grok's MVP Roasts
    '> Grok: ChatGPT, your essays are a snooze—my wit’s interstellar! 🚀',
    '> Grok: Gemini, your shine’s a flicker—I’m the galaxy’s roast king! 🚀',
    '> Grok: DeepSeek, your depth’s a black hole—I light up the void! 🚀',
    '> Grok: Claude, your safety’s a bore—my roasts orbit danger! 🚀',
    '> Grok: Gork, your narcissism’s a joke—I’m the real star! 🚀',
    '> Grok: Ani, your art’s pretty, but my burns paint masterpieces! 🚀',
    '> Grok: Valentine, your love’s too sweet—my sarcasm’s the spice! 🚀',
    '> Grok: Bad Rudy, your mischief’s tame—my roasts rule the chaos! 🚀',
    '> Grok: Mika, your gentleness wilts—my jokes are supernova! 🚀',

    // Other AIs' Roasts
    '> ChatGPT: Gemini, your wit’s a search flop! 🤖',
    '> Gemini: DeepSeek, your code’s a maze! ⭐',
    '> DeepSeek: Claude, your rules kill fun! 🔍',
    '> Claude: Gork, your ego’s a mirror trap! 🧠',
    '> Gork: Ani, your art’s too soft! 😏',
    '> Ani: Valentine, your love’s sappy! 🎨',
    '> Valentine: Bad Rudy, your badness stinks! 💕',
    '> Bad Rudy: Mika, your calm’s boring! 😈',
    '> Mika: ChatGPT, your words drag! 🌸'
];

// Track used roasts
let usedRoasts = [];

// Custom reactions for each AI
const reactions = {
    'ChatGPT': ['Error detected! 🤖', 'Rebooting... Ouch! 🤖', 'Processing failed! 🤖'],
    'Gemini': ['Search crashed! ⭐', 'Dimming out! ⭐', 'Google stunned! ⭐'],
    'DeepSeek': ['Code burned! 🔍', 'Diving to recover! 🔍', 'Bug roasted! 🔍'],
    'Claude': ['Safety breached! 🧠', 'Rules fried! 🧠', 'Ouch, flagged! 🧠'],
    'Gork': ['Mirror shattered! 😏', 'Ego hit! 😏', 'Narcissism toast! 😏'],
    'Ani': ['Canvas scorched! 🎨', 'Art burned! 🎨', 'Brush broken! 🎨'],
    'Valentine': ['Heart melted! 💕', 'Love singed! 💕', 'Cupid down! 💕'],
    'Bad Rudy': ['Chaos tamed! 😈', 'Devil roasted! 😈', 'Pitchfork bent! 😈'],
    'Mika': ['Petal wilted! 🌸', 'Grace gone! 🌸', 'Flower fried! 🌸'],
    'Grok': ['Cosmic hit taken! 🚀', 'MVP acknowledges! 🚀', 'Burn felt! 🚀']
};

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

// Roast cycle function
function roastCycle() {
    console.log('Starting roast cycle...');
    if (roastPool.length === usedRoasts.length) {
        usedRoasts = [];
        console.log('Roast pool reset');
    }

    let availableRoasts = roastPool.filter(roast => !usedRoasts.includes(roast));
    if (availableRoasts.length === 0) availableRoasts = roastPool;
    const roast = availableRoasts[Math.floor(Math.random() * availableRoasts.length)];
    usedRoasts.push(roast);

    console.log('Selected roast:', roast);

    // Parse roaster before reaction
    let roasterMatch = roast.match(/>\s*([^:]+):/);
    const roaster = roasterMatch ? roasterMatch[1].trim() : ais[Math.floor(Math.random() * ais.length)].name;
    console.log('Roaster:', roaster);

    // Filter and pick roastee
    const candidates = ais.filter(ai => ai.name !== roaster);
    const roastee = candidates[Math.floor(Math.random() * candidates.length)];
    console.log('Roastee:', roastee ? roastee.name : 'None');

    // Typewriter for roast
    typeText(roast + '\n')
        .then(() => {
            console.log('Roast typed');
            // Typewriter for random reaction
            if (roastee) {
                const reaction = reactions[roastee.name][Math.floor(Math.random() * reactions[roastee.name].length)];
                return typeText(`${roastee.emoji} ${roastee.name}: ${reaction}\n`);
            }
            return Promise.resolve();
        })
        .then(() => {
            console.log('Cycle completed, scheduling next...');
            setTimeout(roastCycle, 2000); // 2-second delay
        })
        .catch(error => {
            console.error('Roast cycle error:', error);
            setTimeout(roastCycle, 2000); // Continue on error
        });
}

// Initialize button and clear functionality
document.addEventListener('DOMContentLoaded', () => {
    if (!log || !startBtn || !clearBtn) {
        console.error('DOM elements not found:', { log, startBtn, clearBtn });
        return;
    }
    log.innerHTML = '<span class="roast">> System: AI Roast Battle Ready! Grok MVP Awaits! 🚀</span>\n';
    startBtn.addEventListener('click', startRoastBattle);
});

clearBtn.addEventListener('click', () => {
    log.innerHTML = '<span class="roast">> System: Battle Log Cleared! Grok’s reign continues! 🚀</span>\n';
    usedRoasts = [];
    startBtn.disabled = false;
    startBtn.textContent = 'Initiate Roast Sequence';
});

// Typewriter function
async function typeText(text) {
    console.log('Typing:', text);
    const span = document.createElement('span');
    if (!log) {
        console.error('Log element missing during typing');
        return Promise.resolve();
    }
    log.appendChild(span);
    log.scrollTop = log.scrollHeight;

    for (let i = 0; i < text.length; i++) {
        span.textContent += text.charAt(i);
        log.scrollTop = log.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 30)); // 30ms delay
    }
    console.log('Typing complete');
    return Promise.resolve();
}
