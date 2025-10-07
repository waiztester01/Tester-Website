const toggleBtn = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('chatbot-close');
const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

// Toggle open/close when clicking the icon
toggleBtn.addEventListener('click', () => {
  chatbot.classList.toggle('hidden');
});

// Close when clicking the × button
closeBtn.addEventListener('click', () => {
  chatbot.classList.add('hidden');
});

// Demo message handling
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const msg = document.createElement('div');
    msg.className = 'user-msg';
    msg.textContent = input.value;
    messages.appendChild(msg);

    const reply = document.createElement('div');
    reply.className = 'bot-msg';
    reply.textContent = '🤖 Thanks for your message! (This is a demo bot.)';
    messages.appendChild(reply);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
});
