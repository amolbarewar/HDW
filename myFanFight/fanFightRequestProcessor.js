const constant = require('./constants');
const responseCodeConstant = constant.RESPONSE_CODE;

/**
 *
 * @returns
 * TODO: We should fetch this from user profile service
 */
const _getUserDiscountInPercentage = () => {
    return constant.USER_DISCOUNT_IN_PER;
}

/**
 *
 * TODO: We should fetch this from user bonus service
 * @returns
 */
const _getBonusMaxPercentageUse = () => {
    return constant.BONUS_MAX_PER_USE;
}

/**
 *
 * @returns
 */
const _doesUserHasSufficientBalance = (deposite, bonus, winnings, feeOfContest, entryFess, bonusMaxPercentageUse) => {
    if( entryFess > ((bonus * (bonusMaxPercentageUse/100)) + deposite + winnings)) {
        return false;
    }
    return true;
}

/**
 *
 * @param {*} remainingBalanceAfterJoiningContest 
 * @param {*} deposite 
 * @param {*} bonus 
 * @param {*} winnings 
 * @param {*} feeOfContest 
 * @param {*} entryFess 
 * @param {*} bonusMaxPercentageUse 
 * @returns 
 */
const _updateRemainingBalanceAfterJoiningContest = (remainingBalanceAfterJoiningContest, deposite, bonus, winnings, feeOfContest, bonusMaxPercentageUse) => {
    let remainingFeetoPay = feeOfContest;
    
    if(bonus >= (remainingFeetoPay * (bonusMaxPercentageUse/100))) {
        remainingBalanceAfterJoiningContest.bonus = bonus - (remainingFeetoPay * (bonusMaxPercentageUse/100));
        remainingFeetoPay = remainingFeetoPay - (remainingFeetoPay * (bonusMaxPercentageUse/100));
    }else {
        remainingBalanceAfterJoiningContest.bonus = 0;
        remainingFeetoPay = remainingFeetoPay - bonus;
    }

    if(remainingFeetoPay >= deposite) {
        remainingBalanceAfterJoiningContest.deposite = 0;
        remainingFeetoPay = remainingFeetoPay - deposite;
    }else {
        remainingBalanceAfterJoiningContest.deposite = deposite - remainingFeetoPay;
        return remainingBalanceAfterJoiningContest;
    }

    if(remainingFeetoPay >= winnings) {
        remainingBalanceAfterJoiningContest.winnings = 0;
        remainingFeetoPay = remainingFeetoPay - winnings;
    }else {
        remainingBalanceAfterJoiningContest.winnings = winnings - remainingFeetoPay;
    }
}

/**
 * 
 * @param {*} deposite 
 * @param {*} bonus 
 * @param {*} winnings 
 * @param {*} feeOfContest 
 * @param {*} logPrefix 
 * @returns 
 */
const getFanfightBalanceAfterJoiningContest = (deposite, bonus, winnings, feeOfContest, logPrefix) => {
    const response = {
        message: "Invalid request. Please pass valid input params",
        statusCode: responseCodeConstant.UNPROCESSABLE_REEQUEST,
        data: []
    }

    const userDiscountInPercentage = _getUserDiscountInPercentage();
    const bonusMaxPercentageUse = _getBonusMaxPercentageUse();
    const entryFess = feeOfContest - (userDiscountInPercentage/100 * feeOfContest);

    console.log(`${logPrefix} getFanfightBalanceAfterJoiningContest entryFess ${entryFess}`);

    if(!_doesUserHasSufficientBalance(deposite, bonus, winnings, feeOfContest, entryFess, bonusMaxPercentageUse)) {
        console.error(`${logPrefix} getFanfightBalanceAfterJoiningContest user has insufficient balance`);
        return response;
    }

    const remainingBalanceAfterJoiningContest = {deposite, bonus, winnings};

    _updateRemainingBalanceAfterJoiningContest(remainingBalanceAfterJoiningContest, deposite, bonus, winnings, entryFess, bonusMaxPercentageUse);

    response.message = "process completed successfully";
    response.statusCode = responseCodeConstant.SUCESS;
    response.data = remainingBalanceAfterJoiningContest;

    return response;
}

module.exports = {
    getFanfightBalanceAfterJoiningContest
}