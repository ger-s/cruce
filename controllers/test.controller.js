const Test = require("../models/Test");

class TestController {
  static async getAllTest(req, res) {
    try {
      const tests = await Test.find({});
      res.status(200).json({ success: true, data: tests });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  static async postTest(req, res) {
    try {
      const test = await Test.create(req.body);

      res.status(201).json({ success: true, data: test });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}

module.exports = TestController;
