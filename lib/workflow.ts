/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(config.env.sendGrid.apiKey);

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
    const response = await sendgrid.send({
      to: to_email,
      from: `${from_name} <sergijba@gmail.com>`,
      subject,
      text: message,
      html: message,
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error on API call! ${error}`);

    if (error instanceof Error) {
      console.error("Erorr details:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};
