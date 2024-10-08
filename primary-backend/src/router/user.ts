import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User Already Exists",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      //  TODO: Don't store password in plane text.
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  return res.json({
    message: "Please verify your account by checking  your email",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parseData = SigninSchema.safeParse(body);

  if (!parseData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parseData.data.username,
      password: parseData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Sorry credentails are incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );
  res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  //  TODO: Fix the type
  //  @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  return res.json({
    user,
  });
});

export const userRouter = router;
