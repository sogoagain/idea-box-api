module.exports = {
  setupFilesAfterEnv: [
    'given2/setup',
    'jest-plugin-context/setup',
    'dotenv/config',
  ],
  preset: "jest-dynalite",
};
