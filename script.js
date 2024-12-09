// DOM Elements
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Function to create a chat message element
function createMessageElement(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    messageDiv.textContent = message;
    return messageDiv;
}

// Function to send a message to the chatbot
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to the chat box
    const userMessage = createMessageElement(message, "user");
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear the input field
    userInput.value = "";

    // Send the message to the Flask backend
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    })
        .then((response) => response.json())
        .then((data) => {
            const botMessage = createMessageElement(
                data.response || data.error || "Something went wrong",
                "bot"
            );
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch((error) => {
            const errorMessage = createMessageElement(
                "Error connecting to the server.",
                "bot"
            );
            chatBox.appendChild(errorMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            console.error("Error:", error);
        });
}

// Attach event listener to the send button
sendBtn.addEventListener("click", sendMessage);

// Send message when Enter key is pressed
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
