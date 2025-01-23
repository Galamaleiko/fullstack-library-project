import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import emailjs from "@emailjs/browser";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  subject,
  from_name = "University Library",
  to_name,
  message,
  to_email,
}: {
  subject: string;
  from_name: string;
  to_name: string;
  message: string;
  to_email: string;
}) => {
  try {
    const response = await emailjs.send(
      config.env.emailjs.serviceId,
      config.env.emailjs.templateId,
      {
        subject,
        from_name,
        to_name,
        message,
        to_email,
      },
      config.env.emailjs.publicKey
    );

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error on API call! ", error);

    if (error instanceof Error) {
      console.error("Erorr details:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};
