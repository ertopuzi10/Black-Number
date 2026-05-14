package com.blacknumber.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GuessRequest {

    @NotBlank(message = "Session id is required.")
    private String sessionId;

    @NotBlank(message = "Guess is required.")
    private String guess;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getGuess() {
        return guess;
    }

    public void setGuess(String guess) {
        this.guess = guess;
    }
}
