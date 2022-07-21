import { Schema , model, models } from 'mongoose'

const messageSchema =  new Schema({
    message : {type : String , required:true},
    fromId : {type : String , required:true},
    toId : {type : String , required:true},
    timestamp : {type : Number , required:true}
})

const Message = models.Message || model('Message', messageSchema);

export default Message;