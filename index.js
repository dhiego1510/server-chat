import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 4000

const io = new SocketServer(server)

app.get('/', (req, res) => {
    res.send( 'Hello World!' )
})

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

server.listen(port , () => {
    console.log(`Server listening on port ${port}`)
})