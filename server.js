const Discord = require("discord.js");
const client = new Discord.Client();
import pokeNames from "./pokeNames";
import _ from "lodash";
let pokemons = pokeNames;
require("dotenv").config();

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
  client.user.setActivity("Users for hint", { type: "LISTENING" });
});

const pokemonNameWithHint = async (comingHint) => {
  let hint = _.trimEnd(comingHint.slice(15), ".");
  hint = String(_.toLower(hint));
  hint = hint.replace(/\\/g, "");
  const hintLength = hint.length;
  let hintPresent = 0;
  for (let i = 0; i < hint.length; i++) {
    // prettier-ignore
    if (hint[i] !== "_") hintPresent++;
  }
  let result = [];

  for (let i = 0; i < pokemons.length; i++) {
    if (pokemons[i].length === hintLength) {
      let resultConfirm = 0;
      for (let j = 0; j < hintLength; j++) {
        if (pokemons[i][j] === hint[j]) {
          resultConfirm++;
          if (resultConfirm === hintPresent) {
            result.push(pokemons[i]);
          }
        }
      }
    }
  }
  return result;
};

// Create an event listener for messages
client.on("message", async (message) => {
  if (
    message.author.id === "716390085896962058" &&
    _.startsWith(message?.content, "The pokémon is ")
  ) {
    let msgToSen = await pokemonNameWithHint(message?.content);
    message.channel.send(`pokemon is ${msgToSen}`);
  }
});

const bot_secret_token = process.env.SECRET_KEY;

client.login(bot_secret_token);
