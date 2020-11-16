import _ from "lodash";
import pokeNames from "./pokeNames";
let pokemons = pokeNames;
// The pokémon is S\\_he\\_\\_
// prettier-ignore
const comingHint = "The pokémon is T_n_a___el.";
// comingHint.slice(15)
let hint = _.trimEnd(comingHint.slice(15), ".");
hint = String(_.toLower(hint));
const hintLength = hint.length;
let hintPresent = 0;
for (let i = 0; i < hint.length; i++) {
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

console.log(result);
