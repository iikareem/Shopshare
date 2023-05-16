// const socket = require('socket.io');

// function setupSocket(server) {

//     // lazem a3rfo el server ely hysht8al 3lih
//     const io = socket(server);

// // kol request ykon leh his own socket
//     io.on('connection',(socket)=>{

        
//         socket.on("chat",(data)=>{
//             io.sockets.emit("chat",data);
//         });

//         socket.on("typing",(data)=>{
//             socket.broadcast.emit("typing",data);
//         })
//     });

//     return io;
// }



// module.exports = setupSocket;
