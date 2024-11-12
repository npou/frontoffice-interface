const apiKey = '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'; // Reemplaza con tu clave de API de OpenAI

document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessage(`Tú: ${userInput}`, 'user');
    document.getElementById('user-input').value = '';

    const response = await getChatGPTResponse(userInput);
    addMessage(`ChatGPT: ${response}`, 'chatgpt');
});

async function getChatGPTResponse(prompt) {
    const endpoint = 'https://api.openai.com/v1/completions';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003", // Puedes elegir otro modelo si prefieres
            prompt: prompt,
            max_tokens: 100
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

function addMessage(text, sender) {
    const messageContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
