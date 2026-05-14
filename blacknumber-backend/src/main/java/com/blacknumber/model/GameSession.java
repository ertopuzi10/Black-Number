package com.blacknumber.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class GameSession {

    private final String sessionId;
    private final String secretNumber;
    private final int mode;
    private final int maxAttempts;
    private int attemptCount;
    private final List<AttemptRecord> history;
    private GameStatus status;

    public GameSession(String secretNumber, int mode, int maxAttempts) {
        this.sessionId = UUID.randomUUID().toString();
        this.secretNumber = secretNumber;
        this.mode = mode;
        this.maxAttempts = maxAttempts;
        this.attemptCount = 0;
        this.history = new ArrayList<>();
        this.status = GameStatus.ACTIVE;
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getSecretNumber() {
        return secretNumber;
    }

    public int getMode() {
        return mode;
    }

    public int getMaxAttempts() {
        return maxAttempts;
    }

    public int getAttemptCount() {
        return attemptCount;
    }

    public void setAttemptCount(int attemptCount) {
        this.attemptCount = attemptCount;
    }

    public List<AttemptRecord> getHistory() {
        return history;
    }

    public GameStatus getStatus() {
        return status;
    }

    public void setStatus(GameStatus status) {
        this.status = status;
    }
}
