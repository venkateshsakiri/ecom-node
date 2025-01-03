const Messages = require('../models/message');

module.exports = {
    getMessages:getMessages,
    sendMessages:sendMessages
}

function getMessages(req,res){
    async function getMessages(){
        try{
            console.log(req.params)
            console.log(req.body)
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


function sendMessages(req,res){
    async function sendMessages(){
        try{
            // console.log('User:', req.user);
            // if (!req.user || !req.user._id) {
            //     return res.status(401).json({
            //         code: 401,
            //         data: null,
            //         message: 'User not authenticated'
            //     });
            // }
            const {text, image} = req.body;
            const { id:receiverId } = req.params;
            const senderId = req.body.senderId;
            const newMessage = new Messages({
                senderId,
                receiverId,
                text,
                image
            });
            await newMessage.save();
            if(newMessage){
                res.json({
                    code:200,
                    data:newMessage,
                    message:'message sent successfully !!'
                })
            }
        }catch(err){
            console.log(err)
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }sendMessages().then(function(){}).catch(err=>{
        res.json({
            code:500,
            data:null,
            message:'Internal server error'
        })
    })
}