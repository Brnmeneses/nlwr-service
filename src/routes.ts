import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRespository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeebackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRespository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  //Aqui quem passa a dependencia para o Submit é quem chama
  //Inversao de dependencias
  const submitFeebackUseCase = new SubmitFeebackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeebackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).json("ok");
});
