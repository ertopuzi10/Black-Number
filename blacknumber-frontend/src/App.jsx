import { GameProvider, useGame } from './context/GameContext.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import TerminalFooter from './components/TerminalFooter.jsx';

function Router() {
  const { state } = useGame();
  if (state.status === 'IDLE') {
    return <HomeScreen />;
  }
  return <GameScreen state={state} />;
}

export default function App() {
  return (
    <GameProvider>
      <div className="app-shell">
        <main className="app-shell-main">
          <Router />
        </main>
        <TerminalFooter />
      </div>
    </GameProvider>
  );
}
