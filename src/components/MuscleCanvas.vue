<template>
  <div class="muscle-canvas">
    <div class="canvas-grid">
      <FrontMuscleCanvas
        :current-muscle="currentMuscle"
        :selected-answer="selectedAnswer"
        :show-answer="showAnswer"
        @muscle-click="onMuscleClick"
      />
      <BackMuscleCanvas
        :current-muscle="currentMuscle"
        :selected-answer="selectedAnswer"
        :show-answer="showAnswer"
        @muscle-click="onMuscleClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Muscle } from '@/types'
import FrontMuscleCanvas from './FrontMuscleCanvas.vue'
import BackMuscleCanvas from './BackMuscleCanvas.vue'

interface Props {
  currentMuscle?: Muscle | null
  selectedAnswer?: string | null
  showAnswer?: boolean
}

interface Emits {
  (e: 'muscle-click', muscleId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  currentMuscle: null,
  selectedAnswer: null,
  showAnswer: false
})

const emit = defineEmits<Emits>()

const onMuscleClick = (muscleId: string) => {
  emit('muscle-click', muscleId)
}
</script>

<style scoped>
.muscle-canvas {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.canvas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .canvas-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .muscle-canvas {
    max-width: 100%;
    padding: 0 0.5rem;
  }
  
  .canvas-grid {
    gap: 1rem;
  }
}
</style>