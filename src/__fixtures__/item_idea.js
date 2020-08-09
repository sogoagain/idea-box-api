const getIdea = (timestamp, { who, what }) => ({
  category: 'idea',
  identifier: timestamp.toString(),
  who,
  what,
});

module.exports = getIdea;