<template>
  <div class="back-muscle-canvas">
    <h3 class="canvas-title">背面</h3>
    <svg
      viewBox="0 0 500 600"
      class="human-body-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Human body outline (back view) -->
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

      <!-- Back view muscles -->
      <g class="muscles">
        <!-- Trapezius -->
        <path
          id="trapezius"
          d="M200 110 Q250 100 300 110 Q290 150 250 160 Q210 150 200 110"
          :class="getMuscleClass('trapezius')"
          @click="onMuscleClick('trapezius')"
        />
        
        <!-- Latissimus Dorsi -->
        <path
          id="latissimus-dorsi-left"
          d="M180 180 Q200 220 220 240 Q200 250 180 230 Q170 200 180 180"
          :class="getMuscleClass('latissimus-dorsi')"
          @click="onMuscleClick('latissimus-dorsi')"
        />
        <path
          id="latissimus-dorsi-right"
          d="M320 180 Q300 220 280 240 Q300 250 320 230 Q330 200 320 180"
          :class="getMuscleClass('latissimus-dorsi')"
          @click="onMuscleClick('latissimus-dorsi')"
        />
        
        <!-- Rhomboid -->
        <path
          id="rhomboid-left"
          d="M220 130 Q230 140 240 150 Q230 160 220 150 Q215 140 220 130"
          :class="getMuscleClass('rhomboid')"
          @click="onMuscleClick('rhomboid')"
        />
        <path
          id="rhomboid-right"
          d="M280 130 Q270 140 260 150 Q270 160 280 150 Q285 140 280 130"
          :class="getMuscleClass('rhomboid')"
          @click="onMuscleClick('rhomboid')"
        />
        
        <!-- Levator Scapulae -->
        <path
          id="levator-scapulae-left"
          d="M225 110 Q235 120 240 130 Q230 135 225 125 Q220 115 225 110"
          :class="getMuscleClass('levator-scapulae')"
          @click="onMuscleClick('levator-scapulae')"
        />
        <path
          id="levator-scapulae-right"
          d="M275 110 Q265 120 260 130 Q270 135 275 125 Q280 115 275 110"
          :class="getMuscleClass('levator-scapulae')"
          @click="onMuscleClick('levator-scapulae')"
        />
        
        <!-- Triceps -->
        <ellipse
          id="triceps-left"
          cx="140" cy="220" rx="12" ry="25"
          :class="getMuscleClass('triceps-brachii')"
          @click="onMuscleClick('triceps-brachii')"
        />
        <ellipse
          id="triceps-right"
          cx="360" cy="220" rx="12" ry="25"
          :class="getMuscleClass('triceps-brachii')"
          @click="onMuscleClick('triceps-brachii')"
        />
        
        <!-- Rotator Cuff muscles -->
        <!-- Infraspinatus -->
        <ellipse
          id="infraspinatus-left"
          cx="180" cy="140" rx="15" ry="20"
          :class="getMuscleClass('infraspinatus')"
          @click="onMuscleClick('infraspinatus')"
        />
        <ellipse
          id="infraspinatus-right"
          cx="320" cy="140" rx="15" ry="20"
          :class="getMuscleClass('infraspinatus')"
          @click="onMuscleClick('infraspinatus')"
        />
        
        <!-- Supraspinatus -->
        <ellipse
          id="supraspinatus-left"
          cx="170" cy="130" rx="12" ry="15"
          :class="getMuscleClass('supraspinatus')"
          @click="onMuscleClick('supraspinatus')"
        />
        <ellipse
          id="supraspinatus-right"
          cx="330" cy="130" rx="12" ry="15"
          :class="getMuscleClass('supraspinatus')"
          @click="onMuscleClick('supraspinatus')"
        />
        
        <!-- Teres Minor -->
        <ellipse
          id="teres-minor-left"
          cx="190" cy="150" rx="8" ry="12"
          :class="getMuscleClass('teres-minor')"
          @click="onMuscleClick('teres-minor')"
        />
        <ellipse
          id="teres-minor-right"
          cx="310" cy="150" rx="8" ry="12"
          :class="getMuscleClass('teres-minor')"
          @click="onMuscleClick('teres-minor')"
        />
        
        <!-- Subscapularis (shown as deeper muscle) -->
        <ellipse
          id="subscapularis-left"
          cx="200" cy="160" rx="10" ry="15"
          :class="getMuscleClass('subscapularis')"
          @click="onMuscleClick('subscapularis')"
          opacity="0.7"
        />
        <ellipse
          id="subscapularis-right"
          cx="300" cy="160" rx="10" ry="15"
          :class="getMuscleClass('subscapularis')"
          @click="onMuscleClick('subscapularis')"
          opacity="0.7"
        />
        
        <!-- Core muscles (back view) -->
        <!-- Erector Spinae -->
        <rect
          id="erector-spinae"
          x="240" y="180" width="20" height="80" rx="10"
          :class="getMuscleClass('erector-spinae')"
          @click="onMuscleClick('erector-spinae')"
        />
        
        <!-- Lower body muscles (back view) -->
        <!-- Gluteus Maximus -->
        <ellipse
          id="gluteus-maximus-left"
          cx="220" cy="320" rx="20" ry="25"
          :class="getMuscleClass('gluteus-maximus')"
          @click="onMuscleClick('gluteus-maximus')"
        />
        <ellipse
          id="gluteus-maximus-right"
          cx="280" cy="320" rx="20" ry="25"
          :class="getMuscleClass('gluteus-maximus')"
          @click="onMuscleClick('gluteus-maximus')"
        />
        
        <!-- Gluteus Medius -->
        <ellipse
          id="gluteus-medius-left"
          cx="210" cy="310" rx="15" ry="18"
          :class="getMuscleClass('gluteus-medius')"
          @click="onMuscleClick('gluteus-medius')"
        />
        <ellipse
          id="gluteus-medius-right"
          cx="290" cy="310" rx="15" ry="18"
          :class="getMuscleClass('gluteus-medius')"
          @click="onMuscleClick('gluteus-medius')"
        />
        
        <!-- Hamstrings -->
        <ellipse
          id="hamstrings-left"
          cx="210" cy="390" rx="15" ry="35"
          :class="getMuscleClass('hamstrings')"
          @click="onMuscleClick('hamstrings')"
        />
        <ellipse
          id="hamstrings-right"
          cx="290" cy="390" rx="15" ry="35"
          :class="getMuscleClass('hamstrings')"
          @click="onMuscleClick('hamstrings')"
        />
        
        <!-- Gastrocnemius (Calves) -->
        <ellipse
          id="gastrocnemius-left"
          cx="220" cy="480" rx="15" ry="30"
          :class="getMuscleClass('gastrocnemius')"
          @click="onMuscleClick('gastrocnemius')"
        />
        <ellipse
          id="gastrocnemius-right"
          cx="280" cy="480" rx="15" ry="30"
          :class="getMuscleClass('gastrocnemius')"
          @click="onMuscleClick('gastrocnemius')"
        />
        
        <!-- Soleus -->
        <ellipse
          id="soleus-left"
          cx="220" cy="510" rx="12" ry="20"
          :class="getMuscleClass('soleus')"
          @click="onMuscleClick('soleus')"
        />
        <ellipse
          id="soleus-right"
          cx="280" cy="510" rx="12" ry="20"
          :class="getMuscleClass('soleus')"
          @click="onMuscleClick('soleus')"
        />
      </g>

      <!-- Arrow pointing to current muscle -->
      <g v-if="currentMuscle && currentMuscle.view === 'back'" class="arrow">
        <defs>
          <marker
            id="arrowhead-back"
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
          marker-end="url(#arrowhead-back)"
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
.back-muscle-canvas {
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
  fill: #fde8e8;
  stroke: #e24a4a;
  stroke-width: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.muscle:hover {
  fill: #fdd1d1;
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
  .back-muscle-canvas {
    max-width: 100%;
    padding: 0 0.5rem;
  }
}
</style>