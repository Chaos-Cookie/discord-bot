require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  REST,
  Routes,
  SlashCommandBuilder
} = require('discord.js');

// ===== ENV VARS =====
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// IDs
const VERIFIED_ROLE_ID = '1348811843988357160';
const MERIT_DEPARTMENT_ROLE_ID = '1348816577876987995';
const MERIT_NOMINATIONS_CHANNEL_ID = '1477999218764550256';
const MD_EMOJI = '<:MD:1355999248117661717>';
const MD_EMOJI_ID = '1355999248117661717';

// ===== SLASH COMMAND =====
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test Command')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function registerCommands() {
  try {
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('/ping registriert');
  } catch (error) {
    console.error('Fehler beim Registrieren:', error);
  }
}

// ===== BOT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', async () => {
  console.log(`Bot ist online als ${client.user.tag}`);
  await registerCommands();
});

// ===== PREFIX COMMANDS =====
client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;

    const content = message.content.toLowerCase().trim();

    // ===== !MERITINFORMATION =====
    if (content === '!meritinformation') {
      const embed1 = new EmbedBuilder()
        .setColor(0xF1C40F)
        .setDescription(
`# ${MD_EMOJI} | Merit Department Information Board

**Department Information:**
The Merit Department is tasked with recognizing individuals who go above and beyond within Reign of Royales. Only exceptional individuals who perform well above others, remain active, and show true loyalty will be awarded with merits.

[**Merit Department | Merit/ Award List**](https://docs.google.com/document/d/18GKxfbswEnl9cNqQbDSsuS6RnnXMCsvxmiWAXq3cZIA/edit?tab=t.0)

[**Merit Department | Merit Tracker**](https://trello.com/b/C4MjsOdM/merit-tracker-of-the-ror-merit-department)

**Role Information:**

**Merit Council Role**
The *Merit Council* role is restricted to Department Directors and Divisional Commanders.

**Merit Officer Role**
The *Merit Officer* role is restricted to Department Assistant Directors and Divisional Executive Officers.`
        );

      const embed2 = new EmbedBuilder()
        .setColor(0xF1C40F)
        .setDescription(
`**Department Representative Role**
Each of the three primary departments will have one designated Representative.
They must hold the rank Senior Officer (Vestige) and be the appointed representative of the department.

**Ticket Information:**
Create a ticket in the <#${MERIT_NOMINATIONS_CHANNEL_ID}> channel.

Misuse of the ticket system will lead to a nomination blacklist.`
        );

      const sentMessage = await message.channel.send({
        content: `<@&${VERIFIED_ROLE_ID}> <@&${MERIT_DEPARTMENT_ROLE_ID}>`,
        embeds: [embed1, embed2],
        allowedMentions: {
          roles: [VERIFIED_ROLE_ID, MERIT_DEPARTMENT_ROLE_ID]
        }
      });

      try {
        await sentMessage.react(MD_EMOJI_ID);
      } catch (err) {
        console.log('Reaction Fehler:', err);
      }
    }

    // ===== !ACCOLADESVOTING =====
    if (content === '!accoladesvoting') {
      const embed = new EmbedBuilder()
        .setColor(0xF1C40F)
        .setDescription(
`# ${MD_EMOJI} **| Accolades Voting**

This channel is used for all active award votings. Each nomination will be posted here with basic information about the nominee, along with supporting evidence.

Merit Officers and Department Representatives are expected to review the information provided and cast their votes accordingly.

Attended votes will be logged by the Merit Department High Command once it ended.

Again, please be fair and impartial.

---`
        );

      const sentMessage = await message.channel.send({
        embeds: [embed]
      });

      try {
        await sentMessage.react(MD_EMOJI_ID);
      } catch (err) {
        console.log('Reaction Fehler:', err);
      }
    }

  } catch (err) {
    console.error('Fehler bei Prefix-Command:', err);
  }
});

// ===== /PING =====
client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong! 🏓');
    }
  } catch (err) {
    console.error('Fehler bei /ping:', err);
  }
});

client.login(TOKEN);