import express from "express";
import { Tool } from "../model/index.js";
import { verifyToken } from "../utility/auth.utility.js";
import logger from "../config/log.config.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const tools = await Tool.findAll();
  res.send(tools);
});

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const tool = await Tool.findByPk(id);
  res.send(tool);
});

router.post("/", verifyToken, async (req, res) => {
  const tool = req.body;
  try {
    logger.info("Creating tool...", tool.email);
    const createTool = await Tool.create(tool);
    logger.info("Tool has been created...", tool.email);
    res.send(createTool);
  } catch (error) {
    logger.error("Error creating tool...", error.message);
    res.status(500).send(error.message);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const tool = req.body;

  const updateTool = await Tool.update(tool, { where: { id: id } });
  res.send(updateTool);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  await Tool.destroy({ where: { id: id } });

  res.send("Tool has been deleted successfully");
});

export { router };
