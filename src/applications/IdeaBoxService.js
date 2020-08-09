const ItemRepository = require('../models/ItemRepository');
const IdeaRepository = require('../models/IdeaRepository');

const getRandomIdea = async () => {
  const { text: who } = await ItemRepository.findRandomByCategory('who');
  const { text: what } = await ItemRepository.findRandomByCategory('what');
  return { who, what };
};

const getRecentIdeas = async () => {
  const ideas = await IdeaRepository.findTop5();
  return ideas.map(({ who, what }) => ({
    who, what,
  }));
};

const createIdea = async (idea) => {
  await IdeaRepository.saveIdea(idea, idea);
}

const createItems = async (idea) => {
  for (const [key, value] of Object.entries(idea)) {
    const category = key.trim();
    const text = value.trim();
    const item = await ItemRepository.findByCategoryAndText(category, text);
    if (!item) {
      await ItemRepository.saveItem(category, text);
    }
  }
}

module.exports = {
  getRandomIdea, getRecentIdeas, createIdea, createItems,
};
