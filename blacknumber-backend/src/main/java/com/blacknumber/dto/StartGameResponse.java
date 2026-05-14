package com.blacknumber.dto;

public class StartGameResponse {

    private String sessionId;
    private int mode;
    private int maxAttempts;

    public StartGameResponse() {
    }

    public StartGameResponse(String sessionId, int mode, int maxAttempts) {
        this.sessionId = sessionId;
        this.mode = mode;
        this.maxAttempts = maxAttempts;
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

    public int getMaxAttempts() {
        return maxAttempts;
    }

    public void setMaxAttempts(int maxAttempts) {
        this.maxAttempts = maxAttempts;
    }
}
