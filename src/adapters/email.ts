import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

export const emailAdapter = nodemailerAdapter({
  defaultFromAddress: 'colyn@example.com',
  defaultFromName: 'Learn Payload',
  // Nodemailer transportOptions
  transportOptions: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
})
