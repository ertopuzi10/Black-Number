package com.blacknumber.dto;

public class GuessResponse {

    private Integer attemptIndex;
    private String guess;
    private Integer digitsCorrect;
    private Integer positionsCorrect;
    private Integer attemptsRemaining;
    private String status;
    private String secretNumber;

    public GuessResponse() {
    }

    public Integer getAttemptIndex() {
        return attemptIndex;
    }

    public void setAttemptIndex(Integer attemptIndex) {
        this.attemptIndex = attemptIndex;
    }

    public String getGuess() {
        return guess;
    }

    public void setGuess(String guess) {
        this.guess = guess;
    }

    public Integer getDigitsCorrect() {
        return digitsCorrect;
    }

    public void setDigitsCorrect(Integer digitsCorrect) {
        this.digitsCorrect = digitsCorrect;
    }

    public Integer getPositionsCorrect() {
        return positionsCorrect;
    }

    public void setPositionsCorrect(Integer positionsCorrect) {
        this.positionsCorrect = positionsCorrect;
    }

    public Integer getAttemptsRemaining() {
        return attemptsRemaining;
    }

    public void setAttemptsRemaining(Integer attemptsRemaining) {
        this.attemptsRemaining = attemptsRemaining;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSecretNumber() {
        return secretNumber;
    }

    public void setSecretNumber(String secretNumber) {
        this.secretNumber = secretNumber;
    }
}
