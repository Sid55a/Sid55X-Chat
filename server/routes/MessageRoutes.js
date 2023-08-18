import { Router } from "express";
import {
  addAudioMessage,
  addImageMessage,
  addMessage,
  getInitialContactsSwitchMessages,
  getMessage,
} from "../controllers/MessageController.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "/uploads/recordings/" });
const uploadImage = multer({ dest: "/uploads/images/" });
router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessage);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", upload.single("audio"), addAudioMessage);
router.get("/add-initial-contacts/:from", getInitialContactsSwitchMessages);

export default router;
