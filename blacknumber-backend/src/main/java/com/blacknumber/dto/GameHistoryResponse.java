package com.blacknumber.dto;

import java.util.List;

public class GameHistoryResponse {

    private String sessionId;
    private int mode;
    private String status;
    private List<HistoryAttemptDto> attempts;

    public GameHistoryResponse() {
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public int getMode() {
        return mode;
    }

    public void setMode(int mode) {
        this.mode = mode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<HistoryAttemptDto> getAttempts() {
        return attempts;
    }

    public void setAttempts(List<HistoryAttemptDto> attempts) {
        this.attempts = attempts;
    }

    public static class HistoryAttemptDto {
        private int attemptIndex;
        private String guess;
        private int digitsCorrect;
        private int positionsCorrect;

        public HistoryAttemptDto() {
        }

        public HistoryAttemptDto(int attemptIndex, String guess, int digitsCorrect, int positionsCorrect) {
            this.attemptIndex = attemptIndex;
            this.guess = guess;
            this.digitsCorrect = digitsCorrect;
            this.positionsCorrect = positionsCorrect;
        }

        public int getAttemptIndex() {
            return attemptIndex;
        }

        public void setAttemptIndex(int attemptIndex) {
            this.attemptIndex = attemptIndex;
        }

        public String getGuess() {
            return guess;
        }

        public void setGuess(String guess) {
            this.guess = guess;
        }

        public int getDigitsCorrect() {
            return digitsCorrect;
        }

        public void setDigitsCorrect(int digitsCorrect) {
            this.digitsCorrect = digitsCorrect;
        }

        public int getPositionsCorrect() {
            return positionsCorrect;
        }

        public void setPositionsCorrect(int positionsCorrect) {
            this.positionsCorrect = positionsCorrect;
        }
    }
}
