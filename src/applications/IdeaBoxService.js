const IdeaBoxRepository = require('../models/IdeaBoxRepository');

const getRandomIdea = async () => {
  const { text: who } = await IdeaBoxRepository.findRandomByCategory('who');
  const { text: what } = await IdeaBoxRepository.findRandomByCategory('what');
  return { who, what };
};

const createItems = async (idea) => {
  for (const [key, value] of Object.entries(idea)) {
    const category = key.trim();
    const text = value.trim();
    const item = await IdeaBoxRepository.findByCategoryAndText(category, text);
    if (!item) {
      await IdeaBoxRepository.saveItem(category, text);
    }
  }
}

module.exports = {
  getRandomIdea, createItems,
};
