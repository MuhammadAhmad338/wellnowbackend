const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const palmController = async (req, res) => {
  const { prompt } = req.body;
  try {
    let messages = [{ content: prompt }];

    const result = await client.generateMessage({
      model: MODEL_NAME,
      prompt: { messages },
    });

    res.status(200).json({message: result[0].candidates[0].content});
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `Some error Occured ${error}` });
  }
};

module.exports = { palmController };
