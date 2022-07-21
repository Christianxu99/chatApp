import { connectMongo } from '../../utils/connectMongo'
import Message from '../../models/messageModel';
/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function addMessage(req, res) { 
    try {
        const date = new Date()
        const body = JSON.parse(req.body);

        await connectMongo(); 

        const docs = await Message.create({
            message: body.message,
            fromId: body.fromId,
            toId: body.toId,
            timestamp: date.getTime()
        }) 
         
        return res.json(docs);
    } catch( error ){
        console.log(error)
        res.json({ error })
    }
}