const express= require("express");
const router=express.Router()

const {shorten,redirectUrl,getHistory,deleteUrl} =require("../controller/urlController");

router.post("/shorten",shorten);
router.get("/history",getHistory)
router.get("/:shortCode",redirectUrl)
router.delete("/:id",deleteUrl)
module.exports=router;