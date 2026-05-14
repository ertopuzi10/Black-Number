package com.blacknumber.service;

import com.blacknumber.dto.GameHistoryResponse;
import com.blacknumber.dto.GuessResponse;
import com.blacknumber.dto.StartGameResponse;
import com.blacknumber.exception.BadRequestException;
import com.blacknumber.model.AttemptRecord;
import com.blacknumber.model.GameSession;
import com.blacknumber.model.GameStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final Map<String, GameSession> sessions = new ConcurrentHashMap<>();

    public StartGameResponse startGame(int mode) {
        if (mode != 4 && mode != 5) {
            throw new BadRequestException("Mode must be 4 or 5.");
        }
        int maxAttempts = mode == 4 ? 10 : 7;
        String secret = generateSecretNumber(mode);
        GameSession session = new GameSession(secret, mode, maxAttempts);
        sessions.put(session.getSessionId(), session);
        return new StartGameResponse(session.getSessionId(), mode, maxAttempts);
    }

    /**
     * Spec: shuffle digits 0–9, take first N; leading zeros are allowed (no special-case).
     */
    public String generateSecretNumber(int length) {
        List<Character> pool = new ArrayList<>();
        for (char d = '0'; d <= '9'; d++) {
            pool.add(d);
        }
        Collections.shuffle(pool, ThreadLocalRandom.current());
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(pool.get(i));
        }
        return sb.toString();
    }

    public GuessResponse submitGuess(String sessionId, String rawGuess) {
        GameSession session = sessions.get(sessionId);
        if (session == null) {
            throw new BadRequestException("Session not found. Start a new game.");
        }
        if (session.getStatus() != GameStatus.ACTIVE) {
            throw new BadRequestException("This game is already over.");
        }

        String guess = rawGuess == null ? "" : rawGuess.trim();
        validateGuess(session, guess);

        int digitsCorrect = countDigitsCorrect(session.getSecretNumber(), guess);
        int positionsCorrect = countPositionsCorrect(session.getSecretNumber(), guess);

        int nextAttempt = session.getAttemptCount() + 1;
        session.setAttemptCount(nextAttempt);
        session.getHistory().add(new AttemptRecord(nextAttempt, guess, digitsCorrect, positionsCorrect));

        boolean won = guess.equals(session.getSecretNumber());
        if (won) {
            session.setStatus(GameStatus.WON);
        } else if (session.getAttemptCount() >= session.getMaxAttempts()) {
            session.setStatus(GameStatus.LOST);
        }

        int attemptsRemaining = session.getMaxAttempts() - session.getAttemptCount();

        GuessResponse response = new GuessResponse();
        response.setAttemptIndex(nextAttempt);
        response.setGuess(guess);
        response.setDigitsCorrect(digitsCorrect);
        response.setPositionsCorrect(positionsCorrect);
        response.setAttemptsRemaining(Math.max(attemptsRemaining, 0));
        response.setStatus(session.getStatus().name());

        if (session.getStatus() == GameStatus.WON || session.getStatus() == GameStatus.LOST) {
            response.setSecretNumber(session.getSecretNumber());
        } else {
            response.setSecretNumber(null);
        }

        return response;
    }

    public GameHistoryResponse getHistory(String sessionId) {
        GameSession session = sessions.get(sessionId);
        if (session == null) {
            throw new BadRequestException("Session not found.");
        }
        GameHistoryResponse dto = new GameHistoryResponse();
        dto.setSessionId(session.getSessionId());
        dto.setMode(session.getMode());
        dto.setStatus(session.getStatus().name());
        List<GameHistoryResponse.HistoryAttemptDto> attempts = session.getHistory().stream()
                .map(a -> new GameHistoryResponse.HistoryAttemptDto(
                        a.getAttemptIndex(),
                        a.getGuess(),
                        a.getDigitsCorrect(),
                        a.getPositionsCorrect()))
                .collect(Collectors.toList());
        dto.setAttempts(attempts);
        return dto;
    }

    private void validateGuess(GameSession session, String guess) {
        int n = session.getMode();
        if (guess.isEmpty()) {
            throw new BadRequestException("Guess cannot be empty.");
        }
        if (guess.length() != n) {
            throw new BadRequestException("Guess must be exactly " + n + " digits.");
        }
        if (!guess.chars().allMatch(Character::isDigit)) {
            throw new BadRequestException("Guess must contain only numeric digits.");
        }
        long distinct = guess.chars().distinct().count();
        if (distinct != guess.length()) {
            throw new BadRequestException("Guess contains duplicate digits.");
        }
    }

    private int countDigitsCorrect(String secret, String guess) {
        boolean[] seenInSecret = new boolean[10];
        for (int i = 0; i < secret.length(); i++) {
            seenInSecret[secret.charAt(i) - '0'] = true;
        }
        int count = 0;
        for (int i = 0; i < guess.length(); i++) {
            int d = guess.charAt(i) - '0';
            if (seenInSecret[d]) {
                count++;
            }
        }
        return count;
    }

    private int countPositionsCorrect(String secret, String guess) {
        int n = Math.min(secret.length(), guess.length());
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (secret.charAt(i) == guess.charAt(i)) {
                count++;
            }
        }
        return count;
    }
}
