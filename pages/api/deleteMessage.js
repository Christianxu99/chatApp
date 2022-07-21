import { connectMongo } from '../../utils/connectMongo'
import Message from '../../models/messageModel';
/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function deleteMessage(req, res) {
    try {
        const body = JSON.parse(req.body);

        await connectMongo();
        const deleted = await Message.deleteOne({ _id: body.idMessage})
        return res.json(deleted)
    } catch( error ){
        console.log(error)
        res.json({ error })
    }
}
