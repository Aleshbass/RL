'use server'

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendCommentNotification({ to, courseTitle, commentText }: { to: string; courseTitle: string; commentText: string }) {
  return resend.emails.send({
    from: "no-reply@rehabifylearn.com",
    to,
    subject: `New comment on your course: ${courseTitle}`,
    html: `<p>You have a new comment on <b>${courseTitle}</b>:</p><blockquote>${commentText}</blockquote>`
  });
}
