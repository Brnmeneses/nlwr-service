import { SubmitFeebackUseCase } from "./submit-feedback-use-case";

//spies - saber se alguma funcao foi chamada
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeebackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Generic error",
        screenshot: "data:image/png;base64genericerror",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Generic error",
        screenshot: "",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Generic error",
        screenshot: "image.png",
      })
    ).rejects.toThrow();
  });
});
