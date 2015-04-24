var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "****@gmail.com",
    pass: "****"
  }
});


module.exports = function(app, root) {

  app.get('/api/send', function(req, res) {
    var mailOptions = {
      to : req.query.to,
      subject : req.query.subject,
      text : req.query.text
    };

    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response) {
      if(error) {
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent: " + response.message);
        res.end("sent");
      }
    });
  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(root, 'public/views/', 'index.html'));
  });

};
