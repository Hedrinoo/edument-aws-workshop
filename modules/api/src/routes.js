const express = require('express');
const axios   = require('axios').default;
const env = require('./env')
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const routes = express.Router();

const client = new SNSClient({ region: "eu-north-1" });

// ...
// TMS API.
routes.post('/content', async (req, res) => {

    const response = await axios.post('http://content/resources', {});

    const out = await client.send(new PublishCommand({
        Message: response.data.id,
        TopicArn: env.requestsTopic,
    }));

    res.send(response.data);
});

routes.post('/injectfault', async (_, res) => {
    const response = await axios({
        method: 'POST',
        url: 'http://content/503'
    });

    res.send(response.data);
});


module.exports = routes;