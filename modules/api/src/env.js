const env = require('env-var');

// ...

const port = env.get('PORT').default('80').asPortNumber();
        
const {
    requestsTopic
} = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);

// ...

module.exports = {
    port,
    requestsTopic // <---
};