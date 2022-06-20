const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret-ping')
		.setDescription('Replies to (you) with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: '*Pong!*', ephemeral: true });
	},
};