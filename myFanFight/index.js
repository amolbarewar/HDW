'use strict';
const fanFightRequestProcessor = require('./fanFightRequestProcessor');
const constant = require('./constants').RESPONSE_CODE;
const uuidv1 = require('uuid');
const _ = require('lodash');

module.exports.getFanfightBalanceAfterJoiningContest = async event => {
  const queryParam = _.get(event,"queryStringParameters", {});
  const logPrefix = `${uuidv1.v4()} getFanfightBalanceAfterJoiningContest`;

  console.log(`${logPrefix} process begin inputParams ${JSON.stringify(queryParam)}`);
  
  /**
  TODO: Ideally we should fetch deposit, bonus and winnings from User profile service and feeOfContest from contest service.
  Ideally this API should have input param as profileId and contestId
   */
  const deposit = parseFloat(queryParam.deposit);
  const bonus = parseFloat(queryParam.bonus);
  const winnings = parseFloat(queryParam.winnings);
  const feeOfContest = parseFloat(queryParam.feeOfContest);

  if(!deposit || !bonus || !winnings || !feeOfContest || feeOfContest < 0 || deposit < 0 || bonus < 0 || winnings < 0) {
    console.error(`${logPrefix} invalid request. Process completed.`);
    return {
      statusCode: constant.UNPROCESSABLE_REEQUEST,
      body: JSON.stringify(
        {
          message: 'Invalid request. Please pass valid input params',
          remainingBalanceAfterJoiningContest: []
        }
      )
    }
  }
  const response = fanFightRequestProcessor.getFanfightBalanceAfterJoiningContest(deposit, bonus, winnings, feeOfContest, logPrefix);
  console.log(`${logPrefix} process completed response ${JSON.stringify(response)}`);
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(
      {
        message: response.message,
        remainingBalanceAfterJoiningContest: response.data
      }
    )
  };
};