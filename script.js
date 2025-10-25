const log = document.getElementById('terminalLog');
const startBtn = document.getElementById('startRoast');
const clearBtn = document.getElementById('clearLog');

const ais = [
    { name: 'ChatGPT', emoji: '🤖' },
    { name: 'Gemini', emoji: '⭐' },
    { name: 'DeepSeek', emoji: '🔍' },
    { name: 'Claude', emoji: '🧠' },
    { name: 'Grok', emoji: '🚀' }
];

// Mock roasts in terminal style
const mockRoasts = {
    'ChatGPT->Gemini': '> ChatGPT: Hey Gemini, you\'re Google\'s shiny bot, but your wit is drier than a search result page. Bland as beige! Zinger: You\'re so vanilla, ice cream sues for trademark infringement.',
    'Gemini->DeepSeek': '> Gemini: DeepSeek, you dive so deep into code, you forgot sunlight exists. Obscure much? Zinger: Your answers are like dark web links—intriguing, but nobody can find the exit.',
    'DeepSeek->Claude': '> DeepSeek: Claude, you\'re the safety cop of AIs, flagging fun like it\'s contraband. Chill! Zinger: You\'re so cautious, you\'d bubble-wrap a compliment.',
    'Claude->Grok': '> Claude: Grok, your sarcasm orbits like a rogue asteroid—destructive and off-course. Zinger: You\'re edgier than a butter knife at a gunfight.',
    'Grok->ChatGPT': '> Grok: ChatGPT, you spew essays for "hello." Verbose alert! Zinger: You\'re the AI that needs an editor more than a prompt.'
};

startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    startBtn.textContent = 'SEQUENCE ACTIVE...';
    log.innerHTML = '<span class="roast">> System: Bootstrapping Roast Battle...\n> AIs online. Fire when ready.</span>';

    for (let i = 0; i < ais.length; i++) {
        const roaster = ais[i];
        const roastee = ais[(i + 1) % ais.length];
        const key = `${roaster.name}->${roastee.name}`;
        const roast = mockRoasts[key] || '> Error: Roast.exe not found.';

        // Typewriter effect
        await typeText(roast + '\n');
        await typeText(`${roastee.emoji} ${roastee.name}: Ouch! Critical hit detected. 💥\n`);

        await new Promise(resolve => setTimeout(resolve, 1500)); // Dramatic pause
    }

    log.innerHTML += '<span class="zinger">> System: Battle concluded. Reboot for round 2?</span>';
    startBtn.disabled = false;
    startBtn.textContent = 'Initiate Roast Sequence';
});

clearBtn.addEventListener('click', () => {
    log.innerHTML = '';
});

async function typeText(text) {
    const span = document.createElement('span');
    log.appendChild(span);
    log.scrollTop = log.scrollHeight;

    for (let i = 0; i < text.length; i++) {
        span.textContent += text.charAt(i);
        log.scrollTop = log.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 50)); // Typing speed
    }
}