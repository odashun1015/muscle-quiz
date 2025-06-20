<template>
  <div class="title-screen">
    <div class="container">
      <header class="header">
        <h1 class="title">💪 筋肉クイズ</h1>
        <p class="subtitle">人体の筋肉を学ぼう！</p>
      </header>

      <div class="settings-panel">
        <h2>ゲーム設定</h2>
        
        <div class="setting-group">
          <label class="setting-label">問題数</label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                v-model="settings.questionCount"
                type="radio"
                :value="5"
              />
              <span>5問</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.questionCount"
                type="radio"
                :value="10"
              />
              <span>10問</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.questionCount"
                type="radio"
                :value="15"
              />
              <span>15問</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.questionCount"
                type="radio"
                :value="-1"
              />
              <span>全問題</span>
            </label>
          </div>
        </div>

        <div class="setting-group">
          <label class="setting-label">出題範囲</label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                v-model="settings.category"
                type="radio"
                value="all"
              />
              <span>全身</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.category"
                type="radio"
                value="upper"
              />
              <span>上半身</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.category"
                type="radio"
                value="lower"
              />
              <span>下半身</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.category"
                type="radio"
                value="core"
              />
              <span>体幹</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.category"
                type="radio"
                value="arm"
              />
              <span>腕</span>
            </label>
            <label class="radio-option">
              <input
                v-model="settings.category"
                type="radio"
                value="leg"
              />
              <span>脚</span>
            </label>
          </div>
        </div>

        <div class="setting-group">
          <label class="setting-label">選択肢数</label>
          <select v-model="settings.choiceCount" class="select-input">
            <option :value="3">3択</option>
            <option :value="4">4択</option>
            <option :value="5">5択</option>
            <option :value="6">6択</option>
          </select>
        </div>

        <div class="available-questions">
          <p class="question-count">
            利用可能な問題数: <strong>{{ availableQuestionCount }}問</strong>
          </p>
        </div>

        <button 
          class="start-button"
          :disabled="!canStart"
          @click="startGame"
        >
          ゲームスタート
        </button>
      </div>

      <div class="info-panel">
        <h3>ゲームについて</h3>
        <ul>
          <li>人体図に表示される矢印の筋肉名を当てるクイズです</li>
          <li>選択肢から正しい筋肉名を選んでください</li>
          <li>各問題には解説が付いています</li>
          <li>レスポンシブデザインでスマートフォンでも遊べます</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QuizSettings } from '@/types'
import musclesData from '@/data/muscles.json'

interface Emits {
  (e: 'start-game', settings: QuizSettings): void
}

const emit = defineEmits<Emits>()

const settings = ref<QuizSettings>({
  questionCount: 10,
  category: 'all',
  choiceCount: 4
})

const muscles = musclesData

const availableQuestionCount = computed(() => {
  if (settings.value.category === 'all') {
    return muscles.length
  }
  return muscles.filter(muscle => muscle.category === settings.value.category).length
})

const canStart = computed(() => {
  const maxQuestions = availableQuestionCount.value
  const requestedQuestions = settings.value.questionCount === -1 
    ? maxQuestions 
    : settings.value.questionCount
  
  return maxQuestions >= requestedQuestions && maxQuestions >= settings.value.choiceCount
})

const startGame = () => {
  if (canStart.value) {
    emit('start-game', { ...settings.value })
  }
}
</script>

<style scoped>
.title-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.settings-panel {
  padding: 2rem;
}

.settings-panel h2 {
  color: #333;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
}

.setting-group {
  margin-bottom: 1.5rem;
}

.setting-label {
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5rem;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.radio-option {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.radio-option:hover {
  border-color: #4a90e2;
  background: #f8f9fa;
}

.radio-option input[type="radio"] {
  margin-right: 0.5rem;
  accent-color: #4a90e2;
}

.radio-option:has(input:checked) {
  border-color: #4a90e2;
  background: #e3f2fd;
  color: #4a90e2;
  font-weight: bold;
}

.select-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.select-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.available-questions {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.question-count {
  margin: 0;
  color: #666;
}

.start-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.start-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.start-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.info-panel {
  padding: 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

.info-panel h3 {
  color: #333;
  margin: 0 0 1rem 0;
}

.info-panel ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #666;
  line-height: 1.6;
}

.info-panel li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .settings-panel,
  .info-panel {
    padding: 1.5rem;
  }
  
  .radio-group {
    gap: 0.5rem;
  }
  
  .radio-option {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>