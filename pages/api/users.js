import { connectMongo } from '../../utils/connectMongo'
import User from '../../models/userModel';
/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function getAllUsers(req, res) {
    try {
        await connectMongo();
        
        const data = await User.find()
        return res.json(data)
    } catch( error ){
        console.log(error)
        return res.json({ error })
    }
}
