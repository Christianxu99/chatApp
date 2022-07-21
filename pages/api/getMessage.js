import { connectMongo } from '../../utils/connectMongo'
import Message from '../../models/messageModel';
/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function getAllMessage(req, res) { // POINT B
    try {
        const { fromId, toId } = JSON.parse(req.body)

        await connectMongo();
        const data1 = await Message.find({ fromId, toId })
        const data2 = await Message.find({ fromId: toId, toId: fromId })
        const data = [...data1,...data2]
        const sortedData = data.sort((data1,data2) => data1.timestamp - data2.timestamp)
        return res.json(sortedData)
    } catch( error ){
        console.log(error)
        return res.json({ error })
    }
}