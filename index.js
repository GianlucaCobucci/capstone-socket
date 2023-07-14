const io = require ("socket.io")(8900, {
    cors : {
        origin: "http://localhost:3000"
    }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId)=>{
    users = users.filter(user => user.socketId !== socketId)
}

io.on("connection", (socket)=>{
    //quando mi connetto
    console.log("L'utente è connesso")
    /* io.emit("Benvenuto", "Questo è il server socket") */
    //dopo ogni connessione prendi userId e socketId dall'utente
    socket.on("addUser", userId =>{
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //invia e prendi messaggi

    //quando mi disconnetto
    socket.on("disconnect", ()=>{
        console.log("L'utente si è disconnesso")
        removeUser(socket.id)
        io.emit("getUsers", users)

    })
})