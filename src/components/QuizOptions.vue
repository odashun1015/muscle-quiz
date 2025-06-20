<template>
  <div class="quiz-options">
    <h3 class="question-title">この筋肉の名前は？</h3>
    <div class="options-grid">
      <button
        v-for="(choice, index) in choices"
        :key="index"
        :class="['option-button', getChoiceClass(choice)]"
        :disabled="showAnswer"
        @click="selectAnswer(choice)"
      >
        <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
        <span class="option-text">{{ choice }}</span>
        <div v-if="showAnswer" class="answer-indicator">
          <span v-if="choice === correctAnswer" class="correct-mark">✓</span>
          <span v-else-if="choice === selectedAnswer" class="incorrect-mark">✗</span>
        </div>
      </button>
    </div>
    
    <div v-if="showAnswer" class="answer-feedback">
      <div :class="['feedback-message', isCorrect ? 'correct' : 'incorrect']">
        <div class="feedback-icon">
          {{ isCorrect ? '🎉' : '❌' }}
        </div>
        <div class="feedback-text">
          <h4>{{ isCorrect ? '正解！' : '不正解' }}</h4>
          <p><strong>{{ correctAnswer }}</strong></p>
          <p class="muscle-description">{{ description }}</p>
        </div>
      </div>
      
      <button class="next-button" @click="nextQuestion">
        {{ isLastQuestion ? 'ゲーム終了' : '次の問題' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  choices: string[]
  correctAnswer: string
  selectedAnswer: string | null
  showAnswer: boolean
  isLastQuestion: boolean
  description: string
}

interface Emits {
  (e: 'select-answer', answer: string): void
  (e: 'next-question'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isCorrect = computed(() => {
  return props.selectedAnswer === props.correctAnswer
})

const selectAnswer = (answer: string) => {
  emit('select-answer', answer)
}

const nextQuestion = () => {
  emit('next-question')
}

const getChoiceClass = (choice: string) => {
  if (!props.showAnswer) {
    return props.selectedAnswer === choice ? 'selected' : ''
  }
  
  if (choice === props.correctAnswer) {
    return 'correct'
  }
  
  if (choice === props.selectedAnswer && choice !== props.correctAnswer) {
    return 'incorrect'
  }
  
  return 'faded'
}
</script>

<style scoped>
.quiz-options {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
}

.question-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.options-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-button {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-size: 1rem;
  text-align: left;
}

.option-button:hover:not(:disabled) {
  border-color: #4a90e2;
  background: #f8f9fa;
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #f0f0f0;
  border-radius: 50%;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  font-weight: 500;
}

.answer-indicator {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.correct-mark {
  color: #4caf50;
  font-size: 1.5rem;
  font-weight: bold;
}

.incorrect-mark {
  color: #f44336;
  font-size: 1.5rem;
  font-weight: bold;
}

.option-button.selected {
  border-color: #4a90e2;
  background: #e3f2fd;
}

.option-button.selected .option-letter {
  background: #4a90e2;
  color: white;
}

.option-button.correct {
  border-color: #4caf50;
  background: #e8f5e8;
}

.option-button.correct .option-letter {
  background: #4caf50;
  color: white;
}

.option-button.incorrect {
  border-color: #f44336;
  background: #ffebee;
}

.option-button.incorrect .option-letter {
  background: #f44336;
  color: white;
}

.option-button.faded {
  opacity: 0.5;
}

.answer-feedback {
  margin-top: 2rem;
}

.feedback-message {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.feedback-message.correct {
  background: #e8f5e8;
  border: 2px solid #4caf50;
}

.feedback-message.incorrect {
  background: #ffebee;
  border: 2px solid #f44336;
}

.feedback-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.feedback-text h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.feedback-text p {
  margin: 0.25rem 0;
}

.muscle-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.next-button {
  width: 100%;
  padding: 1rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.next-button:hover {
  background: #357abd;
}

@media (max-width: 768px) {
  .quiz-options {
    padding: 0.5rem;
  }
  
  .question-title {
    font-size: 1.2rem;
  }
  
  .option-button {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .option-letter {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
  }
}
</style>