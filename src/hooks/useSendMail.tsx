import React from "react";
import axios from "axios";
import Mailgun from "mailgun.js";
import FormData from "form-data";

type SendMailObject = {
  to: string;
  message: string;
  subject: string;
};

const useSendMail = (props: SendMailObject) => {
  const MailGunData = new Mailgun(FormData);
  const mg = MailGunData.client({
    username: "api",
    key: process.env.REACT_APP_MAILGUN_API_KEY!,
  });

  mg.messages
    .create("noreply@crusaderyb.com", {
      from: "The Crusader Yearbook",
      to: props.to,
      subject: props.subject,
      html: props.message,
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
};

export default useSendMail;
