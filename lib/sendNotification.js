var postmark = require("postmark")(process.env.POSTMARK_API_KEY);
//var config = require('config.json');

function send(to, subject, message, response) {
  postmark.send({
    "From": "contact@hoparoundhuntsville.com",
    "To": to,
	"Cc": "hsvtransitdev@gmail.com",
    "Subject": subject,
    "TextBody": message,
    "Tag": "message from user on Hop Around Huntsville"
  }, function(error, success) {
    if(error) {
      console.error("Unable to send via postmark: " + error.message);
	  if (response) {
        var rdata = JSON.stringify({"error":error});
	    response.writeHead(401, {"Content-Type": "application/json"});
        response.write(rdata);
	  }
      return;
    } else {
	  var rtnmess = {"success":"sent","to":"glmason.lm@gmail.com","message":message};
      console.info("Sent to postmark for delivery ");
	  if (response) {
        var rdata = JSON.stringify(rtnmess);
	    response.writeHead(200, {"Content-Type": "application/json"});
	    console.info("Response: " + rdata);
        response.write(rdata);
	  }
    }
	if (response) response.end();	
  });

}; 

exports.send = send;



