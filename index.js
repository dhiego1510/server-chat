import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('User connected' )
    
    socket.on('message', (body) => {
        console.log(body);
        //store message in database

        //send message to all clientes
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        })
    })
})

server.listen(4000)
console.log('Server on por', 4000);