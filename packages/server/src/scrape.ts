import cheerio from "cheerio";
import fetch from "node-fetch";

const baseUrl = "https://www.rd.com/list/trivia-questions/";

async function getTriviaPage(pageNum: number): Promise<Object> {
  const url = `${baseUrl}/${pageNum}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const questionParentContainers = $(".listicle-page");
  const answerParentContainers = $(".listicle-card");
  const store = [];
  for (let i = 0; i < questionParentContainers.length; i += 2) {
    const questionContainer = $(questionParentContainers[i]);
    const answerContainer = $(answerParentContainers[i + 1]);
    const options: Object[] = [];

    const questionImage = $(questionContainer.find("img")).attr("data-original-src");
    let question = "";
    const possibleQuestion = $(questionContainer.find("p")[1]).text();

    // If question exists in text form then splice it out.
    if (!possibleQuestion.match(/^A\./g)) {
      question = possibleQuestion;
    }

    // Possible options for the answer
    questionContainer.find("p").each((_, element) => {
      const text = $(element).text().trim();
      const matching = /^[A-D]\.\s(.*)/g.exec(text);
      if (matching) {
        options.push(matching[1]);
      }
    });

    const answerText = $(answerContainer.find("h2")[0]).text();

    const answer = /^Answer:\s(.*)/g.exec(answerText)[1].trim();

    const answerDescription = $(answerContainer).find("p").text();

    store.push({
      questionImage,
      question,
      options,
      answer,
      answerDescription
    });
  }
  return store;
}

async function getAllTriviaQuestions(): Promise<Array<Object>> {
  let questions: Array<Object> = [];
  for (let i = 1; i < 11; i += 1) {
    questions.push(getTriviaPage(i));
  }

  questions = await Promise.all(questions);
  console.log("Questions = ", questions);
  return questions;
}

export default getAllTriviaQuestions;
