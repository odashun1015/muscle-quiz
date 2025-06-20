<template>
  <div class="game-screen">
    <div class="game-header">
      <div class="progress-info">
        <div class="question-counter">
          {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
      <button class="quit-button" @click="quitGame">
        ゲーム終了
      </button>
    </div>

    <div class="game-content">
      <div class="left-panel">
        <QuizOptions
          v-if="currentQuestion"
          :choices="currentQuestion.choices"
          :correct-answer="currentQuestion.correctAnswer"
          :selected-answer="selectedAnswer"
          :show-answer="showAnswer"
          :is-last-question="isLastQuestion"
          :description="currentQuestion.muscle.description"
          @select-answer="selectAnswer"
          @next-question="nextQuestion"
        />
      </div>

      <div class="right-panel">
        <div class="canvas-container">
          <MuscleCanvas
            :current-muscle="currentQuestion?.muscle || null"
            :selected-answer="selectedAnswer"
            :show-answer="showAnswer"
          />
        </div>
      </div>
    </div>

    <div class="game-info">
      <div class="score-info">
        <span class="correct-count">正解: {{ correctAnswers }}</span>
        <span class="incorrect-count">不正解: {{ incorrectAnswers }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QuizQuestion } from '@/types'
import QuizOptions from './QuizOptions.vue'
import MuscleCanvas from './MuscleCanvas.vue'

interface Props {
  currentQuestion: QuizQuestion | null
  currentQuestionIndex: number
  totalQuestions: number
  selectedAnswer: string | null
  showAnswer: boolean
  isLastQuestion: boolean
  correctAnswers: number
}

interface Emits {
  (e: 'select-answer', answer: string): void
  (e: 'next-question'): void
  (e: 'quit-game'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const progressPercentage = computed(() => {
  return ((props.currentQuestionIndex + 1) / props.totalQuestions) * 100
})

const incorrectAnswers = computed(() => {
  return props.currentQuestionIndex + 1 - props.correctAnswers - (props.showAnswer ? 0 : 1)
})

const selectAnswer = (answer: string) => {
  emit('select-answer', answer)
}

const nextQuestion = () => {
  emit('next-question')
}

const quitGame = () => {
  if (confirm('ゲームを終了してタイトル画面に戻りますか？')) {
    emit('quit-game')
  }
}
</script>

<style scoped>
.game-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
}

.game-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-info {
  flex: 1;
  max-width: 300px;
}

.question-counter {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
  transition: width 0.5s ease;
}

.quit-button {
  padding: 0.5rem 1rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.quit-button:hover {
  background: #da190b;
}

.game-content {
  flex: 1;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-container {
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-info {
  background: white;
  padding: 1rem 2rem;
  border-top: 1px solid #e0e0e0;
}

.score-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-weight: bold;
}

.correct-count {
  color: #4caf50;
}

.incorrect-count {
  color: #f44336;
}

@media (max-width: 1024px) {
  .game-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .canvas-container {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .game-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .progress-info {
    max-width: none;
  }
  
  .game-content {
    padding: 0.5rem;
  }
  
  .score-info {
    gap: 1rem;
    font-size: 0.9rem;
  }
}
</style>