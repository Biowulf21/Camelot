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
  const response: any = axios({
    method: "POST",
    url: process.env.REACT_APP_MAILGUN_BASEURL!,
    auth: {
      username: "api",
      password: process.env.REACT_APP_MAILGUN_API_KEY!,
    },
    params: {
      from: "The Crusader Yearbook <noreply@crusaderyb.com>",
      to: props.to,
      subject: props.subject,
      message: props.message,
    },
  })
    .then(
      (response) => {
        console.log(response);
        // Log success message
      },
      (reject) => console.log(reject)
      //   Log failed message
    )
    .catch((err) => console.log(err));
};

export default useSendMail;
