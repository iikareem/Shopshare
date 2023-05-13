const socket = io();

const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', ()=>{
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
    window.history.back();
});

message.addEventListener('keypress',()=>{
    socket.emit("typing",handle.value);
});

socket.on("chat",(data)=>{
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on("typing",(data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

