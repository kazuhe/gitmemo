import express from "express";
var router = express.Router();
router.get('/api/version', function (req, res) {
    console.log("/api/version");
    res.json({ version: '0.0.1' });
});
export default router;
