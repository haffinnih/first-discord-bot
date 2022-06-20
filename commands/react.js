const { SlashCommandBuilder } = require('@discordjs/builders');
const emojiCharacters = require('../emojiCharacters.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('React to a message with emojis')
		.addStringOption(option =>
			option.setName('message-id')
				.setDescription('The message ID')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reaction')
				.setDescription('The word to react with')
				.setRequired(true)),

	async execute(interaction) {
		await interaction.channel.messages.fetch(interaction.options.getString('message-id'))
			.then(async message => {
				const reaction = interaction.options.getString('reaction');

				if (reaction.length !== new Set(reaction).size) {
					interaction.reply({
						content: `There are repeated characters in your reaction "${reaction}"!`,
						ephemeral: true,
					});
				}
				else {
					try {
						for (const character of [...reaction]) {
							await message.react(emojiCharacters[character]);
						}
					}
					catch (error) {
						console.error('One of the emojis failed to react:', error);
					}
				}
			});
	},
};