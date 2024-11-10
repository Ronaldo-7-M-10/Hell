const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params, timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error.message);
    return null;
  }
}

async function getAIResponse(input, userId) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = "Hey, my name is Snøw ☃️ ask me any questions darling ✏, I'll be happy to answer you ❄️";

  for (const service of services) {
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
  }

  return response;
}

module.exports = {
  config: {
    name: 'ai',
    author: 'Arn | Redwan',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(
        `Sui\n━━━━━━━━━━━━━━━━\nPlease provide a question or statement.\n━━━━━━━━━━━━━━━━`,
        event.threadID,
        event.messageID
      );
      return;
    }

    const response = await getAIResponse(input, event.senderID);
    api.sendMessage(`ØđɨȺmᵾs Łønøn\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
  },
  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      const response = await getAIResponse(input, event.senderID);
      message.reply(`Ash Redwan\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`);
    }
  }
};
