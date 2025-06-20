<script setup lang="ts">
import TitleScreen from './components/TitleScreen.vue'
import GameScreen from './components/GameScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import { useQuizGame } from './composables/useQuizGame'

const {
  gameState,
  currentQuestion,
  isLastQuestion,
  startGame,
  selectAnswer,
  nextQuestion,
  resetGame,
  retryGame
} = useQuizGame()
</script>

<template>
  <div class="app">
    <TitleScreen
      v-if="gameState.currentScreen === 'title'"
      @start-game="startGame"
    />
    
    <GameScreen
      v-else-if="gameState.currentScreen === 'game'"
      :current-question="currentQuestion"
      :current-question-index="gameState.currentQuestionIndex"
      :total-questions="gameState.questions.length"
      :selected-answer="gameState.selectedAnswer"
      :show-answer="gameState.showAnswer"
      :is-last-question="isLastQuestion"
      :correct-answers="gameState.results.correctAnswers"
      @select-answer="selectAnswer"
      @next-question="nextQuestion"
      @quit-game="resetGame"
    />
    
    <ResultScreen
      v-else-if="gameState.currentScreen === 'result'"
      :results="gameState.results"
      :settings="gameState.settings"
      @retry-game="retryGame"
      @back-to-title="resetGame"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f5f5;
}

.app {
  min-height: 100vh;
}

button {
  font-family: inherit;
}

input, select {
  font-family: inherit;
}
</style>
