module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "Tokodori_Frtiz",//remodified by cliff
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `
Yo, endy prefix is [ 𓆩 / 𓆪 ]\n
Check here please:
➥ %help [number of page] -> see commands
🎶This bot created by Miles Morales..
Acceptance admin is Miles 🕷️
➥ %callad [message] -> report any problem encountered
`,
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/gFryKwf/image.jpg")
 });
 }
 }
}
