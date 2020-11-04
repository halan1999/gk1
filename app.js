const express = require("express")
const bodyParser = require("body-parser")
const aws = require("aws-sdk")
const ejs = require("ejs")



const app = express();


aws.config.update({
    region: "1",
    accessKeyId: "",
    secretAccessKey: "",
  });
  

const docClient = new aws.DynamoDB.DocumentClient();


app.listen(8001,()=>{
    console.log("API ");
})

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    try {
        var params = {
            TableName: "Human",
        };
        docClient.scan(params, onScanSinhVien);
        function onScanSinhVien(err, data) {
            if (err) res.status(400).send({ messsage: err });
            else
             res.render("index", { Humans: data.Items });
        }
    } catch (error) {
        res.status(400).json(error);
    }
})