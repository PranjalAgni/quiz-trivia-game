<template>
  <div id="app">
    <button @click="nextQuestion()">Next Question</button>
    <div v-if="this.currentQuestion" class="current-question">
      <img :src="currentQuestion.questionImage" />
      <p>{{ currentQuestion.question }}</p>
      <div>
        <button v-for="option in currentQuestion.options" :key="option" @click="guess(option)">
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data: () => ({
    currentQuestion: null
  }),
  apollo: {
    questions: gql`
      query {
        questions {
          question
          answer
          answerDescription
          options
          questionImage
        }
      }
    `
  },
  methods: {
    nextQuestion() {
      this.currentQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
    },
    guess(option) {
      if (option === this.currentQuestion.answer) {
        alert("Correct");
      } else {
        alert(`Wrong answer!!!, the correct answer was ${this.currentQuestion.answer}`);
        this.nextQuestion();
      }
    }
  }
};
</script>

<style>
.current-question {
  width: 85%;
  font-family: sans-serif;
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
  margin-left: 2em;
}

.current-question img {
  width: 100%;
}

button {
  display: block;
  width: 100%;
  font-size: 2rem;
  text-align: center;
}
</style>
