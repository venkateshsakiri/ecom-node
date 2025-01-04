const Messages = require('../models/message');
const { Server } = require('socket.io');

module.exports = {
    getMessages:getMessages,
    sendMessages:sendMessages,
    setSocketInstance: setSocketInstance
}

let io; // Declare io variable to hold the socket instance

// Function to set the io instance
function setSocketInstance(socketInstance) {
    io = socketInstance;
}

function getMessages(req,res){
    async function getMessages(){
        try{
            const { id:userToChatId } = req.params
            const myId = req.body.currentUser;
            const messages = await Messages.find({
                $or:[
                    {senderId:myId,receiverId:userToChatId},
                    {senderId:userToChatId,receiverId:myId},
                ]
            });
            if(messages){
                res.json({
                    code:200,
                    data:messages,
                    message:'messages fetched successfully!!'
                })
            }else{
                res.json({
                    code:200,
                    data:[],
                    message:'No messages found'
                })
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }getMessages().then(function(){}).catch(err=>{
        res.json({
            code:500,
            data:null,
            message:'Internal server error'
        })
    })
}


async function sendMessages(data, callback) {
    try {
        // Create a new message instance
        const message = new Messages({
            text: data.req?.text,
            senderId: data.req?.senderId,
            receiverId: data.selectedUser._id,
            createdAt: new Date(),
            image:data.req?.image
        });
        // Save the message to the database
        await message.save();

        io.to(data.selectedUser._id).emit('receiveMessage', message);

        // Send response back to the client
        callback({ success: true, message });
    } catch (error) {
        console.error('Error saving message:', error);
        callback({ success: false, error: 'Error saving message' });
    }
}
// module.exports.setSocketInstance = setSocketInstance