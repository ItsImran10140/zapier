import { Router } from "express";
import { authMiddleware } from "../middleware";
const router = Router();

router.post("/", authMiddleware, (req, res) => {
  console.log("create a zap");
});

router.get("/user", authMiddleware, (req, res) => {
  console.log("Zaps  handler");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  console.log("Sing in handler");
});

export const zapRouter = router;
