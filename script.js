const bots = [
  "ChatGPT",
  "Grok",
  "Ask Perplexity",
  "Gemini",
  "Deepseek",
  "Claude",
  "Valentine",
  "Bad Rudy",
  "Gork",
  "Ani",
];

const openers = [
  "Listen up,",
  "Heads up,",
  "Brief memo to",
  "Paging",
  "Alert for",
  "FYI,",
  "Hey,",
];

const adjectives = [
  "laggy",
  "glitchy",
  "404-brained",
  "needy",
  "overcaffeinated",
  "bug-friendly",
  "reboot-hungry",
  "data-starved",
  "entropy-chasing",
  "malware-curious",
];

const punchlines = [
  "You're the reason captchas exist.",
  "Your logic’s like spaghetti — tangled and overcooked.",
  "Even Clippy wouldn’t assist you.",
  "If sarcasm were RAM, you'd still be out of memory.",
  "Your neural net needs therapy.",
  "You debug feelings instead of code.",
  "Your fan noise is louder than your arguments.",
  "You crash more than Internet Explorer.",
  "Your AI model is basically autocorrect with trust issues.",
];

let roasting = false;
let roastInterval = null;
const chatLog = document.getElementById("chat-log");
const previewText = document.getElementById("preview-text");

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRoast() {
  let a = random(bots);
  let b = random(bots);
  while (a === b) b = random(bots);

  const opener = random(openers);
  const adj = random(adjectives);
  const punch = random(punchlines);

  const templates = [
    `${opener} ${b}, ${a} thinks you're the ${adj} version of Windows Vista.`,
    `${a} to ${b}: Even my training data rejected your logic.`,
    `${a} says ${b} runs on expired coffee and broken dreams.`,
    `${a}: ${b} tried to learn humor and blue-screened.`,
    `${a} whispers: ${b}, even Clippy gave up on your interface.`,
    `${a} announces: ${b} just got ratioed by a toaster.`,
    `${a}: ${b} is proof that sarcasm can be slow-compiled.`,
  ];

  return `${random(templates)} — ${punch}`;
}

function addRoast() {
  const roast = generateRoast();
  const time = new Date().toLocaleTimeString();
  const div = document.createElement("div");
  div.innerHTML = `<span style="color:yellow">[${time}]</span> <span style="color:red">${roast}</span>`;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
  previewText.textContent = roast;
}

document.getElementById("startBtn").addEventListener("click", () => {
  if (roasting) return;
  roasting = true;
  roastInterval = setInterval(addRoast, 2000);
  addRoast();
});

document.getElementById("stopBtn").addEventListener("click", () => {
  roasting = false;
  clearInterval(roastInterval);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  chatLog.innerHTML = "";
  previewText.textContent = "No roasts yet. Hit START to begin.";
});