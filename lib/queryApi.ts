import openai from "./chatGpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })
    .then((res) => res.data.choices[0].message)
    .catch(
      (err) =>
        `ChatGPT could not found answer for your prompt. (Err: ${err.message}`
    );
  return res;
};

export default query;
