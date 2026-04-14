const { EmbedBuilder } = require('discord.js');

const VERIFIED_ROLE_ID = '1348811843988357160';
const MERIT_DEPARTMENT_ROLE_ID = '1348816577876987995';
const MD_EMOJI = '<:MD:1355999248117661717>';
const MD_EMOJI_ID = '1355999248117661717';

module.exports = {
  name: '!meritaccoladesvoting',
  type: 'prefix',

  async execute(message) {
    try {
      if (message.content.toLowerCase() !== '!meritaccoladesvoting') return;

      const embed = new EmbedBuilder()
        .setColor(0xF1C40F)
        .setDescription(
`# ${MD_EMOJI} | Merit Department Accolades Voting

This channel is used for all active award votings. Each nomination will be posted here with basic information about the nominee, along with supporting evidence.

Merit Officers and Department Representatives are expected to review the information provided and cast their votes accordingly.

Attended votes will be logged by the Merit Department High Command once it ended.

Again, please be fair and impartial.`
        );

      const sentMessage = await message.channel.send({
        content: `<@&${VERIFIED_ROLE_ID}> <@&${MERIT_DEPARTMENT_ROLE_ID}>`,
        embeds: [embed],
        allowedMentions: {
          roles: [VERIFIED_ROLE_ID, MERIT_DEPARTMENT_ROLE_ID]
        }
      });

      try {
        await sentMessage.react(MD_EMOJI_ID);
      } catch (err) {
        console.log('Reaction Fehler:', err);
      }
    } catch (err) {
      console.error('Fehler bei !meritaccoladesvoting:', err);
    }
  }
};