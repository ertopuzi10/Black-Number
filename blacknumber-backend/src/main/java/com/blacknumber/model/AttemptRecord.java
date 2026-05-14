package com.blacknumber.model;

public class AttemptRecord {

    private final int attemptIndex;
    private final String guess;
    private final int digitsCorrect;
    private final int positionsCorrect;

    public AttemptRecord(int attemptIndex, String guess, int digitsCorrect, int positionsCorrect) {
        this.attemptIndex = attemptIndex;
        this.guess = guess;
        this.digitsCorrect = digitsCorrect;
        this.positionsCorrect = positionsCorrect;
    }

    public int getAttemptIndex() {
        return attemptIndex;
    }

    public String getGuess() {
        return guess;
    }

    public int getDigitsCorrect() {
        return digitsCorrect;
    }

    public int getPositionsCorrect() {
        return positionsCorrect;
    }
}
