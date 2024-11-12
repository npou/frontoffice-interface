const apiKey = 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; // Reemplaza con tu clave de API de OpenAI

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
