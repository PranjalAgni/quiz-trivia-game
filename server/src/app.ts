import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import getAllTriviaQuestions from "./scrape";

const typeDefs = gql`
  type TriviaQuestion {
    question: String
    questionImage: String
    answer: String
    answerDescription: String
    options: [String]
  }

  type Query {
    hello: String
    date: String
    name: String
    questions: [TriviaQuestion]
  }
`;

let question: Array<Object> = null;
const resolvers = {
  Query: {
    questions: async () => {
      if (question) {
        return question;
      } else {
        question = await getAllTriviaQuestions();
        return question;
      }
    },
    hello: () => "hello world...",
    date: () => new Date().toISOString(),
    name: () => {
      const alphabets: Array<string> = [];
      for (let i = 0; i < 26; i++) {
        alphabets.push(String.fromCharCode(97 + i));
      }

      let randomName: String = "";
      for (let i = 0; i < 5; i++) {
        const idx = Math.floor(Math.random() * Math.floor(alphabets.length));
        randomName += alphabets[idx];
      }
      return randomName;
    }
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });
app.set("PORT", process.env.PORT || 4040);
app.set("gqlpath", server.graphqlPath);

export default app;
