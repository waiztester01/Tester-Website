const toggleBtn = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('chatbot-close');
const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

let agentClient = null;
let isConnected = false;

// Toggle UI
toggleBtn.addEventListener('click', () => {
  const hidden = chatbot.classList.toggle('hidden');
  toggleBtn.style.display = hidden ? 'flex' : 'none';
});

// Close chatbot
closeBtn.addEventListener('click', () => {
  chatbot.classList.add('hidden');
  toggleBtn.style.display = 'flex';
});

// Try to fetch Copilot connection string (for real deployment)
async function initCopilotAgent() {
  try {
    const res = await fetch('/api/copilot-connection');
    if (!res.ok) throw new Error('Endpoint not found');
    const data = await res.json();
    const cs = data.connectionString;

    if (typeof m365Agents === 'undefined') {
      console.warn('m365Agents SDK not loaded.');
      return;
    }

    agentClient = await m365Agents.createClientAsync({ connectionString: cs });
    console.log('✅ Connected to Microsoft 365 Agent.');
    isConnected = true;
  } catch (err) {
    console.warn('Copilot connection not available — running in demo mode:', err);
  }
}

window.addEventListener('DOMContentLoaded', initCopilotAgent);

// Handle user input
input.addEventListener('keypress', async (e) => {
  if (e.key !== 'Enter' || !input.value.trim()) return;

  const text = input.value.trim();
  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.textContent = text;
  messages.appendChild(userMsg);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Either talk to Copilot or fallback to demo mode
  if (isConnected && agentClient) {
    try {
      const response = await agentClient.sendMessageAsync(text);
      const replyText = response.outputText || 'No response';
      const botMsg = document.createElement('div');
      botMsg.className = 'bot-msg';
      botMsg.textContent = replyText;
      messages.appendChild(botMsg);
    } catch (err) {
      console.error('Copilot error:', err);
      addBotMsg('⚠️ Copilot connection error — demo mode active.');
    }
  } else {
    addBotMsg(`🤖 Demo bot: I heard "${text}"`);
  }

  messages.scrollTop = messages.scrollHeight;
});

function addBotMsg(text) {
  const msg = document.createElement('div');
  msg.className = 'bot-msg';
  msg.textContent = text;
  messages.appendChild(msg);
}
