const { EmbedBuilder } = require('discord.js');

const VERIFIED_ROLE_ID = '1348811843988357160';
const MERIT_DEPARTMENT_ROLE_ID = '1348816577876987995';
const MERIT_NOMINATIONS_CHANNEL_ID = '1477999218764550256';
const MD_EMOJI = '<:MD:1355999248117661717>';
const MD_EMOJI_ID = '1355999248117661717';

module.exports = {
  name: '!meritinformation',
  type: 'prefix',

  async execute(message) {
    try {
      if (message.content.toLowerCase() !== '!meritinformation') return;

      const embed = new EmbedBuilder()
        .setColor(0xF1C40F)
        .setDescription(
`# ${MD_EMOJI} | Merit Department Information Board

**Department Information:**
The Merit Department is tasked with recognizing individuals who go above and beyond within Reign of Royales. Only exceptional individuals who perform well above others, remain active, and show true loyalty will be awarded with merits.

[**Merit Department | Merit/ Award List**](https://docs.google.com/document/d/18GKxfbswEnl9cNqQbDSsuS6RnnXMCsvxmiWAXq3cZIA/edit?tab=t.0)

[**Merit Department | Merit Tracker**](https://trello.com/b/C4MjsOdM/merit-tracker-of-the-ror-merit-department)

**Role Information:**

**Merit Council Role**
The *Merit Council* role is restricted to Department Directors and Divisional Commanders. They serves as the voting body for: High-Prestige Awards, Royal Distinction Tier, Award Revocations and Constitutional Amendments.

**Merit Officer Role**
The *Merit Officer* role is restricted to Department Assistant Directors and Divisional Executive Officers. They are responsible for: Reviewing nominations, collecting evidence, verifying performance claims and preparing cases for the Council review.
        
**Department Representative Role**
Each of the three primary departments will have one designated Representative.
They must hold the rank Senior Officer (Vestige) and they must be the appointed representative of the department. They are the official connection between their Primary Department and the Merit Department. They provide insight and recommendations regarding Merit and Award nominations from their department.

**Ticket Information:**
To nominate individuals who you believe have went above and beyond, create a ticket in the <#${MERIT_NOMINATIONS_CHANNEL_ID}> channel.

When making nominations, ensure there is precise detail and reasoning for merit nominations. Include appropriate and relevant evidence when making nominations. The Merit Department has the right to deny any nomination. They will be reviewed by the Merit Department.

Misuse of the ticket system will lead to a nomination blacklist.`
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
      console.error('Fehler bei !meritinformation:', err);
    }
  }
};