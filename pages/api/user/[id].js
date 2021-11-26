import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
              const user = await User.findOne({_id: req.params._id});
              res.status(200).json({ success: true, data: user });
            } catch (error) {
              res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}