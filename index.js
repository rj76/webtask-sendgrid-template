module.exports = function(context, callback) {
  var templateMapping = {
    stormy: 'dac48140-2b1e-428e-ad7a-9ff09519ac73'
  };

  var sg = require('sendgrid').SendGrid(context.secrets.SG_KEY),
    base64url = require('base64url'),
    helper = require('sendgrid').mail,
    emailBody = context.b ? base64url.decode(context.b) : 'Hello world',
    subject = context.s ? base64url.decode(context.s) : 'Test subject',
    toAddress = context.t || 'richard@jansenit.com',
    companycode = context.c || 'stormy';

  var mail = new helper.Mail(),
    personalization = new helper.Personalization(),
    fromEmail = new helper.Email('no-reply@my24service.com'),
    toEmail = new helper.Email(toAddress),
    substitution = new helper.Substitution('%mailbody%', emailBody);

  personalization.setSubject(subject);
  personalization.addTo(toEmail);

  personalization.addSubstitution(substitution);
  content = new helper.Content('text/html', 'hello world')
  mail.addContent(content)

  mail.setFrom(fromEmail);
  mail.setTemplateId(templateMapping[companycode]);
  mail.addPersonalization(personalization);

  mail = mail.toJSON();
  var requestBody = mail,
    emptyRequest = require('sendgrid-rest').request,
    requestPost = JSON.parse(JSON.stringify(emptyRequest));

  requestPost.method = 'POST';
  requestPost.path = '/v3/mail/send';
  requestPost.body = requestBody;

  sg.API(requestPost, function (response) {
    callback(null, response);
  });
};
