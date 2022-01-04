import sendGrid from '@sendgrid/mail';

const emailSender = (to, subject, plainText, markup) => {
  const email = {
    to: to,
    from: 'josefurtado.digital@gmail.com',
    subject: `Audiophile: ${subject}`,
    text: plainText,
    html: markup,
  };

  sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
  sendGrid
    .send(email)
    .then(() => console.log(`Email Sent successfully to ${email.to}`))
    .catch(err => console.log('Email not sent, error: ', err));
};

export default emailSender;
