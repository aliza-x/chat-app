const socket = io();

const loginBox = document.getElementById('loginBox');
const nameInput = document.getElementById('nameInput');
const joinBtn = document.getElementById('joinBtn');
const chatBox = document.getElementById('chatBox');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

let username = '';

joinBtn.onclick = () => {
username = nameInput.value.trim();
if (username === '') return alert('Please enter your name!');
socket.emit('join', username);
loginBox.classList.add('hidden');
chatBox.classList.remove('hidden');
};

sendBtn.onclick = () => {
const text = messageInput.value.trim();
if (text === '') return;
socket.emit('send', text);
messageInput.value = '';
};

socket.on('message', (msg) => {
const div = document.createElement('div');
div.classList.add('message');
div.innerHTML = `<b>${msg.user}:</b> ${msg.text}`;
messages.appendChild(div);
messages.scrollTop = messages.scrollHeight;
});