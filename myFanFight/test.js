const index = require('./index');

const event = {};
event.input = {};
event.input.queryStringParameters = {};
event.input.queryStringParameters.deposit = 100;
event.input.queryStringParameters.bonus = 60;
event.input.queryStringParameters.winnings = 340;
event.input.queryStringParameters.feeOfContest = 100;

index.getFanfightBalanceAfterJoiningContest(event).then(res => {
    console.log("res",res);
}).catch((err) => {
    console.log("err", err);
})