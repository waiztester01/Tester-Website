const toggleBtn = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('chatbot-close');
const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

// Toggle chatbot visibility
toggleBtn.addEventListener('click', () => {
  chatbot.classList.toggle('hidden');
  toggleBtn.style.display = chatbot.classList.contains('hidden') ? 'flex' : 'none';
});

// Close chatbot
closeBtn.addEventListener('click', () => {
  chatbot.classList.add('hidden');
  toggleBtn.style.display = 'flex';
});

// Simple demo messages
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const msg = document.createElement('div');
    msg.className = 'user-msg';
    msg.textContent = input.value;
    messages.appendChild(msg);

    const reply = document.createElement('div');
    reply.className = 'bot-msg';
    reply.textContent = '🤖 Thanks for your message! (Demo bot)';
    messages.appendChild(reply);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
});
