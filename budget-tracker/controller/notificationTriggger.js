const nodemailer = require("nodemailer");

const notificationModel = require("../models/notificationModel");
require('dotenv').config();

const triggerNotificationYear = async (req,res) => {


    const email = req.params.email
    const percentage = await notificationModel.getThresholdPercentageYear(email)*100
    const listOfExpense = await notificationModel.getTagPieDataYear(email)

    await notificationModel.setTriggerYear(email,req.params.percentage)

    const template =`<!DOCTYPE html>
<html lang= "en-US">
<body>
<center><h1>Budget Alert ${req.params.percentage}% crossed Year</h1></center>
<div id= "piechart"></div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['tag', 'amount'],
  ${listOfExpense}
]);
  // Optional; add a title and set the width and height of the chart
  var options = {'title':'My expense', 'width':550, 'height':400};
  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
</script>

</body>
</html>
`;

console.log(template);


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USERNAME,
    to: email,
    subject: "Alert trigger on "+req.params.percentage+" for yearly budget",
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("I think server Not Started");
    } else {
      console.log("Email sent: " + info.response);
      res.send("I think server started");
    }
  });

}


const triggerNotificationMonth = async (req,res) => {

    const email = req.params.email
    const percentage = await notificationModel.getThresholdPercentageMonth(email)
    const listOfExpense = await notificationModel.getTagPieDataMonth(email)

    await notificationModel.setTriggerMonth(email,req.params.percentage)

    const template =`<!DOCTYPE html>
<html lang="en-US">
<body>

<center><h1>Budget Alert ${req.params.percentage}%  crossed on Month Trigger</h1></center>

<div id="piechart"></div>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script type="text/javascript">
// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable(
  
  ${listOfExpense}
  
  );

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'My expense', 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
</script>

</body>
</html>
`;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USERNAME,
    to: email,
    subject: "Alert trigger on "+req.params.percentage+" for monthly budget",
    html: template,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("I think server Not Started");
    } else {
      console.log("Email sent: " + info.response);
      res.send("I think server started");
    }
  });

}




module.exports = { triggerNotificationYear,triggerNotificationMonth };
