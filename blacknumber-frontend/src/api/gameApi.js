import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export async function startGame(mode) {
  const { data } = await client.post('/api/game/start', { mode });
  return data;
}

export async function submitGuess(sessionId, guess) {
  const { data } = await client.post('/api/game/guess', { sessionId, guess });
  return data;
}

export async function fetchHistory(sessionId) {
  const { data } = await client.get(`/api/game/history/${sessionId}`);
  return data;
}
