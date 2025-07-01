<template>
  <div class="result-screen">
    <div class="container">
      <div class="result-header">
        <h1 class="title">
          🎯 クイズ結果
        </h1>
        <div class="score-display">
          <div class="score-circle">
            <div class="score-text">
              <span class="score-number">{{ results.score }}</span>
              <span class="score-unit">点</span>
            </div>
          </div>
          <div class="score-details">
            <div class="detail-item">
              <span class="label">正解数</span>
              <span class="value correct">{{ results.correctAnswers }} / {{ results.totalQuestions }}</span>
            </div>
            <div class="detail-item">
              <span class="label">正答率</span>
              <span class="value">{{ results.score }}%</span>
            </div>
          </div>
        </div>
        
        <div class="score-message">
          <h2>{{ scoreMessage.title }}</h2>
          <p>{{ scoreMessage.message }}</p>
        </div>
      </div>

      <div
        v-if="results.incorrectQuestions.length > 0"
        class="review-section"
      >
        <h3>間違えた問題の復習</h3>
        <div class="incorrect-questions">
          <div
            v-for="(question, index) in results.incorrectQuestions"
            :key="index"
            class="question-card"
          >
            <div class="question-header">
              <h4>{{ question.muscle.name }}</h4>
              <span class="category-badge">{{ getCategoryName(question.muscle.category) }}</span>
            </div>
            <p class="muscle-description">
              {{ question.muscle.description }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-else
        class="perfect-score"
      >
        <div class="celebration">
          🎉
        </div>
        <h3>完璧です！</h3>
        <p>全問正解おめでとうございます！</p>
      </div>

      <div class="actions">
        <button
          class="retry-button"
          @click="retryGame"
        >
          同じ設定でもう一度
        </button>
        <button
          class="title-button"
          @click="backToTitle"
        >
          タイトルに戻る
        </button>
      </div>

      <div class="stats-summary">
        <h3>統計情報</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">出題範囲</span>
            <span class="stat-value">{{ getCategoryName(settings.category) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">問題数</span>
            <span class="stat-value">{{ results.totalQuestions }}問</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">選択肢数</span>
            <span class="stat-value">{{ settings.choiceCount }}択</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QuizResult, QuizSettings } from '@/types'

interface Props {
  results: QuizResult
  settings: QuizSettings
}

interface Emits {
  (e: 'retry-game'): void
  (e: 'back-to-title'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const scoreMessage = computed(() => {
  const score = props.results.score
  
  if (score === 100) {
    return {
      title: '🌟 パーフェクト！',
      message: '全問正解です！素晴らしい知識をお持ちですね！'
    }
  } else if (score >= 90) {
    return {
      title: '🎉 優秀！',
      message: 'ほぼ完璧です！筋肉についてよく理解していますね！'
    }
  } else if (score >= 80) {
    return {
      title: '👍 良好！',
      message: 'とても良い結果です！さらに上を目指しましょう！'
    }
  } else if (score >= 70) {
    return {
      title: '📚 まずまず',
      message: '基本的な知識は身についています。復習して知識を深めましょう！'
    }
  } else if (score >= 60) {
    return {
      title: '💪 頑張ろう',
      message: 'もう少しです！復習して再挑戦してみましょう！'
    }
  } else {
    return {
      title: '📖 学習継続',
      message: '筋肉について学ぶ良い機会です。復習して再チャレンジ！'
    }
  }
})

const getCategoryName = (category: string) => {
  const categoryNames: Record<string, string> = {
    all: '全身',
    upper: '上半身',
    lower: '下半身',
    core: '体幹',
    arm: '腕',
    leg: '脚'
  }
  return categoryNames[category] || category
}

const retryGame = () => {
  emit('retry-game')
}

const backToTitle = () => {
  emit('back-to-title')
}
</script>

<style scoped>
.result-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.result-header {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  font-weight: bold;
}

.score-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.score-text {
  text-align: center;
}

.score-number {
  font-size: 2.5rem;
  font-weight: bold;
  display: block;
}

.score-unit {
  font-size: 1rem;
  opacity: 0.8;
}

.score-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1.2rem;
  font-weight: bold;
}

.value.correct {
  color: #4caf50;
}

.score-message {
  margin-top: 1rem;
}

.score-message h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.score-message p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.review-section,
.perfect-score {
  padding: 2rem;
}

.review-section h3,
.perfect-score h3 {
  color: #333;
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
}

.incorrect-questions {
  display: grid;
  gap: 1rem;
}

.question-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.question-header h4 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.category-badge {
  background: #4a90e2;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.muscle-description {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.perfect-score {
  text-align: center;
  background: #f8f5ff;
}

.celebration {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.perfect-score h3 {
  color: #4caf50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.perfect-score p {
  color: #666;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: #f8f9fa;
}

.retry-button,
.title-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button {
  background: #4caf50;
  color: white;
}

.retry-button:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.title-button {
  background: #6c757d;
  color: white;
}

.title-button:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.stats-summary {
  padding: 2rem;
  border-top: 1px solid #e0e0e0;
}

.stats-summary h3 {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

@media (max-width: 768px) {
  .result-screen {
    padding: 1rem 0.5rem;
  }
  
  .result-header {
    padding: 2rem 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .score-display {
    flex-direction: column;
    gap: 1rem;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
  }
  
  .score-number {
    font-size: 2rem;
  }
  
  .score-details {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
  
  .actions {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>