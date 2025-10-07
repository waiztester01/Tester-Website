// --- Select DOM elements ---
const toggleBtn = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('chatbot-close');
const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

let agentClient; // Microsoft Copilot client

// --- Initialize Microsoft 365 Copilot Agent ---
async function initCopilotAgent() {
  try {
    agentClient = await m365Agents.createClientAsync({
      connectionString: "YOUR_COPILOT_CONNECTION_STRING_HERE" // 🧩 paste from Copilot Studio
    });
    console.log("✅ Connected to Microsoft 365 Copilot Agent");
  } catch (error) {
    console.error("❌ Failed to connect to Copilot Agent:", error);
  }
}

// --- Toggle chatbot visibility ---
toggleBtn.addEventListener('click', () => {
  chatbot.classList.toggle('hidden');
  toggleBtn.style.display = chatbot.classList.contains('hidden') ? 'flex' : 'none';
});

// --- Close chatbot ---
closeBtn.addEventListener('click', () => {
  chatbot.classList.add('hidden');
  toggleBtn.style.display = 'flex';
});

// --- Handle message sending ---
input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const userText = input.value.trim();

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'user-msg';
    userMsg.textContent = userText;
    messages.appendChild(userMsg);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // --- Send message to Copilot (if connected) ---
    try {
      if (!agentClient) {
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-msg';
        botMsg.textContent = '⚙️ Connecting to Copilot... please wait.';
        messages.appendChild(botMsg);
        await initCopilotAgent(); // Try connecting
      }

      const response = await agentClient.sendMessageAsync(userText);
      const replyText = response.outputText || "🤖 (No response received)";

      const botReply = document.createElement('div');
      botReply.className = 'bot-msg';
      botReply.textContent = replyText;
      messages.appendChild(botReply);
      messages.scrollTop = messages.scrollHeight;

    } catch (error) {
      console.error("Copilot error:", error);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'bot-msg';
      errorMsg.textContent = "⚠️ Sorry, I couldn’t reach the Copilot right now.";
      messages.appendChild(errorMsg);
    }
  }
});

// --- Initialize agent on load ---
window.addEventListener('DOMContentLoaded', initCopilotAgent);
