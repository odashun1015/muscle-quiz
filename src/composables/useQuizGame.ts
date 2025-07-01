import { ref, computed, reactive } from 'vue'
import type { Muscle, QuizSettings, QuizQuestion, QuizResult, GameState } from '@/types'
import musclesData from '@/data/muscles.json'

/**
 *
 */
export function useQuizGame() {
  const muscles = ref<Muscle[]>(musclesData as Muscle[])
  
  const gameState = reactive<GameState>({
    currentScreen: 'title',
    settings: {
      questionCount: 10,
      category: 'all',
      choiceCount: 4
    },
    questions: [],
    currentQuestionIndex: 0,
    results: {
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectQuestions: [],
      score: 0
    },
    selectedAnswer: null,
    showAnswer: false
  })

  const currentQuestion = computed(() => 
    gameState.questions[gameState.currentQuestionIndex] || null
  )

  const isLastQuestion = computed(() => 
    gameState.currentQuestionIndex >= gameState.questions.length - 1
  )

  const filteredMuscles = computed(() => {
    if (gameState.settings.category === 'all') {
      return muscles.value
    }
    return muscles.value.filter(muscle => muscle.category === gameState.settings.category)
  })

  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const generateChoices = (correctMuscle: Muscle, allMuscles: Muscle[], choiceCount: number): string[] => {
    const choices = [correctMuscle.name]
    const otherMuscles = allMuscles.filter(m => m.id !== correctMuscle.id)
    const shuffledOthers = shuffleArray(otherMuscles)
    
    for (let i = 0; i < choiceCount - 1 && i < shuffledOthers.length; i++) {
      choices.push(shuffledOthers[i].name)
    }
    
    return shuffleArray(choices)
  }

  const generateQuestions = (): QuizQuestion[] => {
    const availableMuscles = filteredMuscles.value
    const questionCount = gameState.settings.questionCount === -1 
      ? availableMuscles.length 
      : Math.min(gameState.settings.questionCount, availableMuscles.length)
    
    const selectedMuscles = shuffleArray(availableMuscles).slice(0, questionCount)
    
    return selectedMuscles.map(muscle => ({
      muscle,
      choices: generateChoices(muscle, availableMuscles, gameState.settings.choiceCount),
      correctAnswer: muscle.name
    }))
  }

  const startGame = (settings: QuizSettings) => {
    gameState.settings = { ...settings }
    gameState.questions = generateQuestions()
    gameState.currentQuestionIndex = 0
    gameState.results = {
      totalQuestions: gameState.questions.length,
      correctAnswers: 0,
      incorrectQuestions: [],
      score: 0
    }
    gameState.selectedAnswer = null
    gameState.showAnswer = false
    gameState.currentScreen = 'game'
  }

  const selectAnswer = (answer: string) => {
    if (gameState.showAnswer) return
    
    gameState.selectedAnswer = answer
    gameState.showAnswer = true
    
    const isCorrect = answer === currentQuestion.value?.correctAnswer
    
    if (isCorrect) {
      gameState.results.correctAnswers++
    } else if (currentQuestion.value) {
      gameState.results.incorrectQuestions.push(currentQuestion.value)
    }
  }

  const nextQuestion = () => {
    if (isLastQuestion.value) {
      finishGame()
    } else {
      gameState.currentQuestionIndex++
      gameState.selectedAnswer = null
      gameState.showAnswer = false
    }
  }

  const finishGame = () => {
    const { totalQuestions, correctAnswers } = gameState.results
    gameState.results.score = Math.round((correctAnswers / totalQuestions) * 100)
    gameState.currentScreen = 'result'
  }

  const resetGame = () => {
    gameState.currentScreen = 'title'
    gameState.currentQuestionIndex = 0
    gameState.selectedAnswer = null
    gameState.showAnswer = false
    gameState.questions = []
  }

  const retryGame = () => {
    startGame(gameState.settings)
  }

  const isAnswerCorrect = computed(() => {
    if (!gameState.showAnswer || !currentQuestion.value) return null
    return gameState.selectedAnswer === currentQuestion.value.correctAnswer
  })

  const getChoiceClass = (choice: string) => {
    if (!gameState.showAnswer) {
      return gameState.selectedAnswer === choice ? 'selected' : ''
    }
    
    if (choice === currentQuestion.value?.correctAnswer) {
      return 'correct'
    }
    
    if (choice === gameState.selectedAnswer && choice !== currentQuestion.value?.correctAnswer) {
      return 'incorrect'
    }
    
    return 'faded'
  }

  return {
    gameState,
    currentQuestion,
    isLastQuestion,
    filteredMuscles,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
    retryGame,
    isAnswerCorrect,
    getChoiceClass
  }
}