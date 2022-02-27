const fanFightRequestProcessor = require('./../fanFightRequestProcessor');
const expect = require('chai').expect;

describe('test the utility functions of fanFightRequestProcessor', () => {
  describe('test utility for getuser balance account after joining contest', () => {
    it('getFanfightBalanceAfterJoiningContest should return invalid request status code', () => {
        const response = fanFightRequestProcessor.getFanfightBalanceAfterJoiningContest(100, 60, 340, 10000, "");
        expect(response.statusCode).to.equal(422);  
    })

    it('getFanfightBalanceAfterJoiningContest should return invalid request status code', () => {
        const response = fanFightRequestProcessor.getFanfightBalanceAfterJoiningContest(100, 60, 340, 10, "");
        expect(response.statusCode).to.equal(200);  
    })

    it('getFanfightBalanceAfterJoiningContest should return invalid request status code', () => {
        const response = fanFightRequestProcessor.getFanfightBalanceAfterJoiningContest(100, 60, 340, 100, "");
        expect(response.data.deposite).to.equal(28); 
        expect(response.data.bonus).to.equal(52);
        expect(response.data.winnings).to.equal(340); 
    })
  })
});
