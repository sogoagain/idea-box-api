const { respond, error } = require('../utils/HttpInterfaces');

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

module.exports = { hello, getIdea };
