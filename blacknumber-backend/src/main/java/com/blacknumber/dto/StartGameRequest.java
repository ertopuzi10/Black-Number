package com.blacknumber.dto;

import jakarta.validation.constraints.NotNull;

public class StartGameRequest {

    @NotNull(message = "Mode is required.")
    private Integer mode;

    public Integer getMode() {
        return mode;
    }

    public void setMode(Integer mode) {
        this.mode = mode;
    }
}
