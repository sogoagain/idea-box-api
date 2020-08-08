const IdeaBoxRepository = require('../models/IdeaBoxRepository');

const getRandomIdea = async () => {
  const { text: who } = await IdeaBoxRepository.findRandomByCategory('who');
  const { text: what } = await IdeaBoxRepository.findRandomByCategory('what');
  return { who, what };
};

module.exports = {
  getRandomIdea,
};