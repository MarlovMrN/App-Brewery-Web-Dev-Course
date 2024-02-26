import generateName from "sillyname";
import { random as generateSuperHeroName } from "superheroes";

const sillyName = generateName();
const superHeroName = generateSuperHeroName();
console.log(`My name is ${sillyName}`);
console.log(`I am ${superHeroName}`);
