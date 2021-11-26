import dbConnect from '../../../utils/dbConnect';
import TestController from '../../../controllers/test.controller'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            TestController.getAllTest(req, res)
            break;
        case 'POST':
            TestController.postTest(req, res)
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}