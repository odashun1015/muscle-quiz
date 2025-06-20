<template>
  <div class="front-muscle-canvas">
    <h3 class="canvas-title">前面</h3>
    <svg
      viewBox="0 0 500 600"
      class="human-body-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Human body outline (front view) -->
      <g class="body-outline">
        <!-- Head -->
        <ellipse cx="250" cy="50" rx="40" ry="50" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Neck -->
        <rect x="235" y="95" width="30" height="25" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Torso -->
        <ellipse cx="250" cy="200" rx="80" ry="100" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Arms -->
        <ellipse cx="150" cy="180" rx="20" ry="60" fill="none" stroke="#333" stroke-width="2"/>
        <ellipse cx="350" cy="180" rx="20" ry="60" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Forearms -->
        <ellipse cx="130" cy="270" rx="15" ry="50" fill="none" stroke="#333" stroke-width="2"/>
        <ellipse cx="370" cy="270" rx="15" ry="50" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Hips -->
        <ellipse cx="250" cy="320" rx="70" ry="30" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Thighs -->
        <ellipse cx="220" cy="400" rx="25" ry="70" fill="none" stroke="#333" stroke-width="2"/>
        <ellipse cx="280" cy="400" rx="25" ry="70" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Calves -->
        <ellipse cx="220" cy="520" rx="20" ry="60" fill="none" stroke="#333" stroke-width="2"/>
        <ellipse cx="280" cy="520" rx="20" ry="60" fill="none" stroke="#333" stroke-width="2"/>
      </g>

      <!-- Front view muscles -->
      <g class="muscles">
        <!-- Pectoralis Major -->
        <path
          id="pectoralis-major"
          d="M200 160 Q250 140 300 160 Q280 200 250 210 Q220 200 200 160"
          :class="getMuscleClass('pectoralis-major')"
          @click="onMuscleClick('pectoralis-major')"
        />
        
        <!-- Deltoids -->
        <ellipse
          id="deltoid-left"
          cx="150" cy="160" rx="25" ry="35"
          :class="getMuscleClass('deltoid')"
          @click="onMuscleClick('deltoid')"
        />
        <ellipse
          id="deltoid-right"
          cx="350" cy="160" rx="25" ry="35"
          :class="getMuscleClass('deltoid')"
          @click="onMuscleClick('deltoid')"
        />
        
        <!-- Biceps -->
        <ellipse
          id="biceps-left"
          cx="150" cy="200" rx="15" ry="30"
          :class="getMuscleClass('biceps-brachii')"
          @click="onMuscleClick('biceps-brachii')"
        />
        <ellipse
          id="biceps-right"
          cx="350" cy="200" rx="15" ry="30"
          :class="getMuscleClass('biceps-brachii')"
          @click="onMuscleClick('biceps-brachii')"
        />
        
        <!-- Serratus Anterior -->
        <path
          id="serratus-anterior-left"
          d="M170 180 Q180 200 190 220 Q180 230 170 210 Q165 195 170 180"
          :class="getMuscleClass('serratus-anterior')"
          @click="onMuscleClick('serratus-anterior')"
        />
        <path
          id="serratus-anterior-right"
          d="M330 180 Q320 200 310 220 Q320 230 330 210 Q335 195 330 180"
          :class="getMuscleClass('serratus-anterior')"
          @click="onMuscleClick('serratus-anterior')"
        />
        
        <!-- Core muscles -->
        <!-- Rectus Abdominis -->
        <rect
          id="rectus-abdominis"
          x="235" y="240" width="30" height="60" rx="5"
          :class="getMuscleClass('rectus-abdominis')"
          @click="onMuscleClick('rectus-abdominis')"
        />
        
        <!-- External Obliques -->
        <path
          id="external-oblique-left"
          d="M200 250 Q180 270 190 290 Q210 280 220 270 Q210 260 200 250"
          :class="getMuscleClass('external-oblique')"
          @click="onMuscleClick('external-oblique')"
        />
        <path
          id="external-oblique-right"
          d="M300 250 Q320 270 310 290 Q290 280 280 270 Q290 260 300 250"
          :class="getMuscleClass('external-oblique')"
          @click="onMuscleClick('external-oblique')"
        />
        
        <!-- Lower body muscles (front view) -->
        <!-- Quadriceps -->
        <ellipse
          id="quadriceps-left"
          cx="220" cy="380" rx="20" ry="40"
          :class="getMuscleClass('quadriceps-femoris')"
          @click="onMuscleClick('quadriceps-femoris')"
        />
        <ellipse
          id="quadriceps-right"
          cx="280" cy="380" rx="20" ry="40"
          :class="getMuscleClass('quadriceps-femoris')"
          @click="onMuscleClick('quadriceps-femoris')"
        />
        
        <!-- Tibialis Anterior (Shins) -->
        <ellipse
          id="tibialis-anterior-left"
          cx="210" cy="490" rx="8" ry="25"
          :class="getMuscleClass('tibialis-anterior')"
          @click="onMuscleClick('tibialis-anterior')"
        />
        <ellipse
          id="tibialis-anterior-right"
          cx="290" cy="490" rx="8" ry="25"
          :class="getMuscleClass('tibialis-anterior')"
          @click="onMuscleClick('tibialis-anterior')"
        />
        
        <!-- Arm muscles -->
        <!-- Brachialis -->
        <ellipse
          id="brachialis-left"
          cx="140" cy="210" rx="10" ry="20"
          :class="getMuscleClass('brachialis')"
          @click="onMuscleClick('brachialis')"
        />
        <ellipse
          id="brachialis-right"
          cx="360" cy="210" rx="10" ry="20"
          :class="getMuscleClass('brachialis')"
          @click="onMuscleClick('brachialis')"
        />
        
        <!-- Brachioradialis -->
        <ellipse
          id="brachioradialis-left"
          cx="130" cy="240" rx="8" ry="15"
          :class="getMuscleClass('brachioradialis')"
          @click="onMuscleClick('brachioradialis')"
        />
        <ellipse
          id="brachioradialis-right"
          cx="370" cy="240" rx="8" ry="15"
          :class="getMuscleClass('brachioradialis')"
          @click="onMuscleClick('brachioradialis')"
        />
        
        <!-- Leg muscles -->
        <!-- Adductor muscles -->
        <ellipse
          id="adductor-longus-left"
          cx="235" cy="340" rx="12" ry="25"
          :class="getMuscleClass('adductor-longus')"
          @click="onMuscleClick('adductor-longus')"
        />
        <ellipse
          id="adductor-longus-right"
          cx="265" cy="340" rx="12" ry="25"
          :class="getMuscleClass('adductor-longus')"
          @click="onMuscleClick('adductor-longus')"
        />
        
        <!-- Sartorius -->
        <path
          id="sartorius-left"
          d="M240 330 Q230 350 225 370 Q235 380 245 360 Q250 340 240 330"
          :class="getMuscleClass('sartorius')"
          @click="onMuscleClick('sartorius')"
        />
        <path
          id="sartorius-right"
          d="M260 330 Q270 350 275 370 Q265 380 255 360 Q250 340 260 330"
          :class="getMuscleClass('sartorius')"
          @click="onMuscleClick('sartorius')"
        />
      </g>

      <!-- Arrow pointing to current muscle -->
      <g v-if="currentMuscle && currentMuscle.view === 'front'" class="arrow">
        <defs>
          <marker
            id="arrowhead-front"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff4444" />
          </marker>
        </defs>
        <line
          :x1="currentMuscle.position.x - 40"
          :y1="currentMuscle.position.y - 40"
          :x2="currentMuscle.position.x - 10"
          :y2="currentMuscle.position.y - 10"
          stroke="#ff4444"
          stroke-width="3"
          marker-end="url(#arrowhead-front)"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Muscle } from '@/types'

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

const getMuscleClass = (muscleId: string) => {
  const classes = ['muscle']
  
  if (props.currentMuscle?.id === muscleId) {
    classes.push('current-muscle')
  }
  
  if (props.showAnswer && props.currentMuscle?.id === muscleId) {
    classes.push('correct-muscle')
  }
  
  return classes.join(' ')
}

const onMuscleClick = (muscleId: string) => {
  emit('muscle-click', muscleId)
}
</script>

<style scoped>
.front-muscle-canvas {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.canvas-title {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
}

.human-body-svg {
  width: 100%;
  height: auto;
}

.muscle {
  fill: #e8f4fd;
  stroke: #4a90e2;
  stroke-width: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.muscle:hover {
  fill: #d1e7fd;
  stroke-width: 2;
}

.current-muscle {
  fill: #ffeb3b;
  stroke: #ff9800;
  stroke-width: 2;
  animation: pulse 1.5s infinite;
}

.correct-muscle {
  fill: #4caf50;
  stroke: #2e7d32;
  stroke-width: 2;
}

.arrow {
  animation: arrow-bounce 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@keyframes arrow-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

.body-outline {
  fill: none;
  stroke: #333;
  stroke-width: 1;
  opacity: 0.3;
}

@media (max-width: 768px) {
  .front-muscle-canvas {
    max-width: 100%;
    padding: 0 0.5rem;
  }
}
</style>