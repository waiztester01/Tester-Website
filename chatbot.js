const toggleBtn = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('chatbot-close');
const input = document.getElementById('chatbot-input');
const messages = document.getElementById('chatbot-messages');

// Open/close chatbot when clicking the floating icon
toggleBtn.addEventListener('click', () => {
  const isHidden = chatbot.classList.toggle('hidden');
  // Hide the toggle button when the chat is open
  toggleBtn.style.display = isHidden ? 'flex' : 'none';
});

// Close chatbot when clicking the × button in the header
closeBtn.addEventListener('click', () => {
  chatbot.classList.add('hidden');
  toggleBtn.style.display = 'flex';
});
