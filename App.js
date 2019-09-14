import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './components/header';
import StartGameScreen from './screens/startGameScreen';
import GameScreen from './screens/gameScreen';
import GameOver from './screens/gameOver';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numOf => {
    setGuessRounds(numOf);
  }

  let content = <StartGameScreen onSelectedNumber={startGameHandler} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOver roundsNumber={guessRounds}
      userNumber={userNumber}
      onNewGame={configureNewGame}
    />
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
        <Header title="Guess a Number" />
        {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },

});
