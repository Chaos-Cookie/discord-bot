module.exports = {
  name: 'ping',
  type: 'slash',

  async execute(interaction) {
    await interaction.reply('Pong! 🏓');
  }
};