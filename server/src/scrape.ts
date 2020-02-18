import cheerio from "cheerio";
import fetch from "node-fetch";

const baseUrl = "https://www.rd.com/culture/trivia-questions/page";

async function getTriviaPage(pageNum: number): Promise<Object> {
  const url = `${baseUrl}/${pageNum}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const containers = $(".listicle-page");
  const store = [];
  for (let i = 0; i < containers.length; i += 2) {
    const questionContainer = $(containers[i]);
    const answerContainer = $(containers[i + 1]);
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
      const text = $(element)
        .text()
        .trim();
      const matching = /^[A-D]\.\s(.*)/g.exec(text);
      if (matching) {
        options.push(matching[1]);
      }
    });

    const answerText = $(answerContainer.find("h2")[0]).text();
    let answer = "";

    if (options.length) {
      answer = /^Answer: [A-D]\.\s(.*)/g.exec(answerText)[1].trim();
    } else {
      answer = /^Answer:\s(.*)/g.exec(answerText)[0].trim();
    }

    const answerDescription = $(answerContainer)
      .find("p")
      .slice(1)
      .text();

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

async function getAllTriviaQuestions() {
  let questions = [];
  for (let i = 1; i < 11; i++) {
    console.log("Requesting Page: ", i);
    questions[i - 1] = await getTriviaPage(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(questions);
}

getAllTriviaQuestions();
