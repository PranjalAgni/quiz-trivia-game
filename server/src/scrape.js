const cheerio = require('cheerio');
const fetch = require('node-fetch');

const baseUrl = 'https://www.rd.com/culture/trivia-questions/page';

async function getTriviaPage(pageNum) {
  const url = `${baseUrl}/${pageNum}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const containers = $('.listicle-page');
  const questions = [];
  for (let i = 0; i < containers.length; i += 2) {
    const questionContainer = $(containers[i]);
    const answerContainer = $(containers[i + 1]);
    const options = [];

    questionContainer.find('p').each((i, element) => {
      const text = $(element)
        .text()
        .trim();
      const matching = /^[A-D]\.\s(.*)/g.exec(text);
      if (matching) {
        options.push(matching[1]);
      }
    });

    // const answer = /^Answer: [A-D]\. \s(.*)/g
    //   .exec($(answerContainer.find('h2')[0]).text())[1]
    //   .trim();

    const answerText = $(answerContainer.find('h2')[0]).text();

    // const answer = /^Answer: [A-D]\. \s(.*)/g.exec(answerText).trim();

    questions.push({
      options,
      question: questionContainer.text(),
      answer: answerText,
    });
  }

  console.log(questions);
}

getTriviaPage(1);
