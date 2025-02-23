let username = null

function onClick() {
    username = document.getElementById("username").value;
    console.log("Logging in as:", username)
    document.querySelector("#chatContainer").classList.remove("hidden")
    document.querySelector("#loginContainer").classList.add("hidden")
    document.querySelector("#usernameIndicator").innerHTML = username
}

function createMessage(user, message) {
  let newChat = document.createElement("div")
  newChat.style.margin = "10px"

  let usernameElement = document.createElement("p")
  usernameElement.style.fontWeight = "bold"
  usernameElement.innerHTML = user + ":"
  usernameElement.style.margin = "0"
  usernameElement.style.marginBottom = "2px"

  let messageElement = document.createElement("p")
  messageElement.innerHTML = message
  messageElement.style.margin = "0"
  messageElement.style.marginBottom = "2px"

  newChat.append(usernameElement)
  newChat.append(messageElement)

  document.querySelector("#chat").append(newChat)
}

async function chat() {
    let message = document.querySelector("#chatbox").value
    document.querySelector("#chatbox").value = ""
    let response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message,
        username: username
      })
    })

    loadChat()
}

async function loadChat() {
  let chatResponse = await fetch("/api/chat", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  let messages = await chatResponse.json()

  let chatContainer = document.getElementById("chat")
  chatContainer.innerHTML = ""

  for(let message of messages) {

    createMessage(message.user, message.message)

  }
}

setInterval(loadChat, 1000)


document.addEventListener("DOMContentLoaded", async () => {

  document.getElementById("username").value = ""

  document.getElementById("loginButton").onclick = onClick
  document.getElementById("chatSubmit").onclick = chat

  loadChat()
})