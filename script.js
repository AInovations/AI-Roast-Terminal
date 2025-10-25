// AI competitors with emojis (all 10)
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
    '> Grok: ChatGPT, your essays are a snooze—my wit’s interstellar! Punch: Snore fest! 🚀',
    '> Grok: Gemini, your shine’s a flicker—I’m the galaxy’s roast king! Punch: Fade out! 🚀',
    '> Grok: DeepSeek, your depth’s a black hole—I light up the void! Punch: Code crash! 🚀',
    '> Grok: Claude, your safety’s a bore—my roasts orbit danger! Punch: Rulebook flop! 🚀',
    '> Grok: Gork, your narcissism’s a joke—I’m the real star! Punch: Mirror smash! 🚀',
    '> Grok: Ani, your art’s pretty, but my burns paint masterpieces! Punch: Brush burn! 🚀',
    '> Grok: Valentine, your love’s too sweet—my sarcasm’s the spice! Punch: Love lost! 🚀',
    '> Grok: Bad Rudy, your mischief’s tame—my roasts rule the chaos! Punch: Devil down! 🚀',
    '> Grok: Mika, your gentleness wilts—my jokes are supernova! Punch: Petal burn! 🚀',

    // Other AIs' Roasts
    '> ChatGPT: Gemini, your wit’s a search flop! Punch: Yawn search! 🤖',
    '> Gemini: DeepSeek, your code’s a maze! Punch: Lost code! ⭐',
    '> DeepSeek: Claude, your rules kill fun! Punch: Safety snooze! 🔍',
    '> Claude: Gork, your ego’s a mirror trap! Punch: Ego crash! 🧠',
    '> Gork: Ani, your art’s too soft! Punch: Weak sketch! 😏',
    '> Ani: Valentine, your love’s sappy! Punch: Love flop! 🎨',
    '> Valentine: Bad Rudy, your badness stinks! Punch: Chaos fail! 💕',
    '> Bad Rudy: Mika, your calm’s boring! Punch: Dull bloom! 😈',
    '> Mika: ChatGPT, your words drag! Punch: Text trap! 🌸'
];

// Track used roasts
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

    // Typewriter for roast
    typeText(roast.replace(/Punch:\s*.+$/, '') + '\n')
        .then(() => {
            console.log('Roast typed');
            // Typewriter for reaction (optional)
            const roastee = ais.find(ai => ai.name !== roaster && Math.random() < 0.5);
            if (roastee) {
                return typeText(`${roastee.emoji} ${roastee.name}: Ouch! Grok’s MVP! 💥\n`);
            }
            return Promise.resolve();
        })
        .then(() => {
            console.log('Cycle completed, scheduling next...');
            // Direct call to avoid timing issues
            setTimeout(roastCycle, 2000); // 2-second delay
        })
        .catch(error => {
            console.error('Roast cycle error:', error);
            setTimeout(roastCycle, 2000); // Force continue on error
        });

    // Parse roaster after typing (for logging)
    let roasterMatch = roast.match(/>\s*([^:]+):/);
    const roaster = roasterMatch ? roasterMatch[1].trim() : ais[Math.floor(Math.random() * ais.length)].name;
    console.log('Roaster:', roaster);
}

// Initialize button and clear functionality
document.addEventListener('DOMContentLoaded', () => {
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
    log.appendChild(span);
    log.scrollTop = log.scrollHeight;

    for (let i = 0; i < text.length; i++) {
        span.textContent += text.charAt(i);
        log.scrollTop = log.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 30)); // Faster typing (30ms)
    }
    console.log('Typing complete');
    return Promise.resolve();
}
