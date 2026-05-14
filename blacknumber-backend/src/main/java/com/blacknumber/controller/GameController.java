package com.blacknumber.controller;

import com.blacknumber.dto.GameHistoryResponse;
import com.blacknumber.dto.GuessRequest;
import com.blacknumber.dto.GuessResponse;
import com.blacknumber.dto.StartGameRequest;
import com.blacknumber.dto.StartGameResponse;
import com.blacknumber.service.GameService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/start")
    public ResponseEntity<StartGameResponse> start(@Valid @RequestBody StartGameRequest body) {
        return ResponseEntity.ok(gameService.startGame(body.getMode()));
    }

    @PostMapping("/guess")
    public ResponseEntity<GuessResponse> guess(@Valid @RequestBody GuessRequest body) {
        return ResponseEntity.ok(gameService.submitGuess(body.getSessionId(), body.getGuess()));
    }

    @GetMapping("/history/{sessionId}")
    public ResponseEntity<GameHistoryResponse> history(@PathVariable String sessionId) {
        return ResponseEntity.ok(gameService.getHistory(sessionId));
    }
}
