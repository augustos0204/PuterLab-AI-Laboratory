const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const sendImage = document.getElementById('send-image');
let isWaitingForResponse = false;

// Ativa/desativa o botão de enviar conforme o input
userInput.addEventListener('input', () => {
    sendButton.disabled = userInput.value.trim() === '' || isWaitingForResponse || !puter.auth.isSignedIn();
    sendImage.disabled = userInput.value.trim() === '' || isWaitingForResponse || !puter.auth.isSignedIn();
});

function getTimeStamp () {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    return timeString;
}

/**
 * Adiciona uma mensagem ao chat.
 * @param {string} text - Texto da mensagem a ser adicionada.
 * @param {boolean} isReceived - Se a mensagem foi recebida da puter.ai (true) ou foi enviada pelo usuário (false).
 */
function addMessage(text, isReceived) {
    // Cria um novo elemento de mensagem
    const messageDiv = document.createElement('div');
    // Adiciona classes para o lado e estilo da mensagem
    messageDiv.classList.add('message');
    messageDiv.classList.add(isReceived ? 'received' : 'sent');

    // Obtém a hora atual
    const timeString = getTimeStamp();

    // Cria um elemento de parágrafo para o texto da mensagem
    const textElement = document.createElement('p');
    textElement.textContent = text;

    // Cria um elemento de div para a hora da mensagem
    const timeStampElement = document.createElement('div');
    timeStampElement.classList.add('timestamp');
    timeStampElement.textContent = timeString;

    const containerBtnMessage = document.createElement('div');
    containerBtnMessage.classList.add('container-btn-message');

    if (isReceived) {
        const btnMessage = document.createElement('div');
        btnMessage.classList.add('btn-msg');
        btnMessage.addEventListener('click', () => textSpeech(text));

        const btnMessageIcon = document.createElement('div');
        btnMessageIcon.classList.add('btn-msg-icon', "speak-icon");

        btnMessage.appendChild(btnMessageIcon);
        containerBtnMessage.appendChild(btnMessage);
        messageDiv.appendChild(containerBtnMessage);
    }

    // Adiciona os elementos ao elemento de mensagem
    messageDiv.appendChild(textElement);
    messageDiv.appendChild(timeStampElement);

    // Adiciona o elemento de mensagem ao chat
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Adiciona uma imagem ao chat.
 * @param {string} imageDiv - Base64 para a imagem gerada pela puter.ai.
 * @param {boolean} isReceived - Se a imagem foi recebida da puter.ai (true) ou foi enviada pelo usuário (false).
 */
/**
 * Adiciona uma imagem ao chat.
 * @param {string} imageDiv - Base64 para a imagem gerada pela puter.ai.
 * @param {boolean} isReceived - Se a imagem foi recebida da puter.ai (true) ou foi enviada pelo usuário (false).
 */
function addImage(imageDiv, isReceived) {
    const messageDiv = document.createElement('div');
    const figureElement = document.createElement('figure');
    const imageElement = document.createElement('img');
    imageElement.src = imageDiv;
    imageElement.alt = 'Image-ai-generated';
    figureElement.appendChild(imageElement);
    messageDiv.appendChild(figureElement);

    // Adiciona a hora e estilo da mensagem
    const timeString = getTimeStamp();
    const timestampElement = document.createElement('div');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = timeString;
    messageDiv.appendChild(timestampElement);
    messageDiv.classList.add('message');
    messageDiv.classList.add(isReceived ? 'received' : 'sent');

    // Adiciona a mensagem ao chat
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mostra indicador de "digitando"
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove o indicador de "digitando"
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '' || isWaitingForResponse || !puter.auth.isSignedIn()) return;
    
    // Adiciona mensagem do usuário
    addMessage(message, false);
    userInput.value = '';
    sendButton.disabled = true;
    isWaitingForResponse = true;
    
    // Mostra que a IA está digitando
    showTypingIndicator();
    
    try {
        // Chama a API da puter.ai
        const response = await puter.ai.chat(message, { model: "gpt-4.1-nano" });
        
        // Remove o indicador de digitação e mostra a resposta
        hideTypingIndicator();
        addMessage(response, true);
    } catch (error) {
        hideTypingIndicator();
        addMessage("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.", true);
        console.error("Erro ao chamar puter.ai:", error);
    } finally {
        isWaitingForResponse = false;
        sendButton.disabled = userInput.value.trim() === '';
    }
}

async function generateImage() {
    const message = userInput.value.trim();
    if (message === '' || isWaitingForResponse || !puter.auth.isSignedIn()) return;
    
    // Adiciona mensagem do usuário
    addMessage(message, false);
    userInput.value = '';
    sendButton.disabled = true;
    isWaitingForResponse = true;
    
    // Mostra que a IA está digitando
    showTypingIndicator();
    
    try {
        // Chama a API da puter.ai
        const response = await puter.ai.txt2img(message);
        
        // Remove o indicador de digitação e mostra a resposta
        hideTypingIndicator();
        addImage(response, true);
    } catch (error) {
        hideTypingIndicator();
        addMessage("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.", true);
        console.error("Erro ao chamar puter.ai:", error);
    } finally {
        isWaitingForResponse = false;
        sendButton.disabled = userInput.value.trim() === '';
    }
}

function textSpeech(message) {
    const options = {
        language: "pt-BR",
        engine: "generative"
    }

    puter.ai.txt2speech(message, options).then( (audio) => audio.play());
}

// Enviar mensagem quando clicar no botão
sendButton.addEventListener('click', sendMessage);
sendImage.addEventListener('click', generateImage);

// Enviar mensagem quando pressionar Enter
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !sendButton.disabled) {
        sendMessage();
    }
});

// Inicializa a puter.ai (opcional)
document.addEventListener('DOMContentLoaded', async () => {
    // Você pode adicionar qualquer inicialização necessária aqui
    const isAuth = await puter.auth.isSignedIn();
    if (!isAuth) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add('received');

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = "Autentique-se ";

        const linkButton = document.createElement('span');
        linkButton.classList.add('link');
        linkButton.textContent = 'pressionando aqui';
        linkButton.addEventListener('click', () => {
            puter.auth.signIn();
        }); 

        messageParagraph.appendChild(linkButton);
        messageDiv.appendChild(messageParagraph);
        chatMessages.appendChild(messageDiv);

        const verifyAuth = setInterval( async() => {
            if (await puter.auth.isSignedIn()) {
                const user = await puter.auth.getUser();
                addMessage(`Olá ${user.username}! Bem-vindo ao PuterLab! Sou seu assistente de testes de IA. Como posso te ajudar hoje?`, true);
                clearInterval(verifyAuth);
            }
        }, 1000);
    } else {
        const user = await puter.auth.getUser();
        addMessage(`Olá ${user.username}! Bem-vindo ao PuterLab! Sou seu assistente de testes de IA. Como posso te ajudar hoje?`, true);
    }
});