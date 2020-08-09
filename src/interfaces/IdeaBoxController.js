const { respond, error } = require('../utils/HttpInterfaces');
const { validCategory, validLength } = require('../utils/Validation');

const IdeaBoxService = require('../applications/IdeaBoxService');

const hello = async (event) => {
  return respond(200, {
    message: 'Hello World!',
    input: event,
  });
};

const getIdea = async () => {
  try {
    const idea = await IdeaBoxService.getRandomIdea();
    return respond(200, { ...idea });
  } catch (err) {
    return error(err);
  }
}

const postIdea = async (event) => {
  try {
    const idea = JSON.parse(event.body);
    for (const [key, value] of Object.entries(idea)) {
      validCategory(key);
      validLength(value, 10);
    }
    await IdeaBoxService.createIdea(idea);
    return respond(201, {});
  } catch (err) {
    return error(err);
  }
}

const postIdeaItems = async (event) => {
  try {
    const idea = JSON.parse(event.body);
    for (const [key, value] of Object.entries(idea)) {
      validCategory(key);
      validLength(value, 10);
    }
    await IdeaBoxService.createItems(idea);
    return respond(201, {});
  } catch (err) {
    return error(err);
  }
}

module.exports = { hello, getIdea, postIdea, postIdeaItems };
