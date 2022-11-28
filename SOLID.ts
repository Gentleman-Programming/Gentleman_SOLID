// Single-Responsibility Principle

/* 
Testing – A class with one responsibility will have far fewer test cases.
Lower coupling – Less functionality in a single class will have fewer dependencies.
Organization – Smaller, well-organized classes are easier to search than monolithic ones. 
*/

class VideoGame {
  private name: string;
  private releaseDate: number;

  constructor(name: string, releaseDate: number) {
    this.name = name;
    this.releaseDate = releaseDate;
  }

  getName(): string {
    return this.name;
  }

  getReleaseDate(): number {
    return this.releaseDate;
  }
}

class VideoGameStore {
  private videoGames: VideoGame[] = [];

  constructor(videoGames: VideoGame[]) {
    this.videoGames = videoGames;
  }

  getAllGamesByAge(age: number) {
    return this.videoGames.filter((v) => v.getReleaseDate() === age);
  }

  getAllGamesByName(name: string) {
    return this.videoGames.filter((v) => v.getName() === name);
  }

  getAllGamesOlderThanAge(age: number) {
    return this.videoGames.filter((v) => v.getReleaseDate() < age);
  }

  getAllGamesNewerThanAge(age: number) {
    return this.videoGames.filter((v) => v.getReleaseDate() > age);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

class VideoGameStoreGetter {
  getAllGamesByAge(collection: VideoGame[], age: number) {
    return collection.filter((v) => v.getReleaseDate() === age);
  }

  getAllGamesByName(collection: VideoGame[], name: string) {
    return collection.filter((v) => v.getName() === name);
  }

  getAllGamesOlderThanAge(collection: VideoGame[], age: number) {
    return collection.filter((v) => v.getReleaseDate() < age);
  }

  getAllGamesNewerThanAge(collection: VideoGame[], age: number) {
    return collection.filter((v) => v.getReleaseDate() > age);
  }
}

class BetterVideoGameStore extends VideoGameStoreGetter {
  private videoGames: VideoGame[] = [];

  constructor(videoGames: VideoGame[]) {
    super();
    this.videoGames = videoGames;
  }
}

// Open-closed principle
// we stop ourselves from modifying existing code and causing potential new bugs

class Movie {
  private name: string;
  private category: string;

  constructor(name: string, category: string) {
    this.name = name;
    this.category = category;
  }

  getName(): string {
    return this.name;
  }

  getCategory(): string {
    return this.category;
  }
}

class VideoGameStoreWithMovies extends BetterVideoGameStore {
  private movies: Movie[];

  constructor(videoGames: VideoGame[], movies: Movie[]) {
    super(videoGames);
    this.movies = movies;
  }

  getMovies() {
    return this.movies;
  }
}

// Liskov Substitution Principle
// if class A is a subtype of class B, we should be able to replace B with A without disrupting the behavior of our program.

class LivingBeing {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  breathe() {
    console.log("I'm breathing");
  }
}

class Human extends LivingBeing {
  private job: string;

  constructor(name: string, age: number, job: string) {
    super(name, age);
    this.job = job;
  }

  getJob(): string {
    return this.job;
  }

  work() {
    console.log("I'm working");
  }
}

class Plant extends LivingBeing {
  private color: string;

  constructor(name: string, age: number, color: string) {
    super(name, age);
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  photosynthesize() {
    console.log("I'm photosynthesizing");
  }

  breathe(): void {  // HORRIBLE !!!
    throw new Error("I don't breathe");
  }
}

// Interface Segregation Principle
// larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them.

interface PCVideoGame {
  play(): void;
  save(): void;
  overrideSave(): void;
  load(): void;
}

class HardcoreVideoGame implements PCVideoGame {
  private difficulty: string;

  constructor(name: string, releaseDate: number, difficulty: string) {
    this.difficulty = difficulty;
  }

  getDifficulty(): string {
    return this.difficulty;
  }

  play() {
    console.log("I'm playing a hardcore video game");
  }

  save() {
    console.log("I'm saving a hardcore video game");
  }

  overrideSave() { // HORRIBLE !!!!
    throw new Error("I can't override a save of a hardcore video game");
  }

  load() {
    throw new Error("I can't load a hardcore video game");
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

interface VideogameSaving {
  save(): void;
  overrideSave(): void;
  load(): void;
}

interface SimplerPCVideoGame {
  play(): void;
}

class CorrectHardcoreVideoGame implements SimplerPCVideoGame {
  private difficulty: string;

  constructor(name: string, releaseDate: number, difficulty: string) {
    this.difficulty = difficulty;
  }

  getDifficulty(): string {
    return this.difficulty;
  }

  play() {
    console.log("I'm playing a hardcore video game");
  }
}

class ConsoleVideoGame implements SimplerPCVideoGame, VideogameSaving {
  private name: string;
  private releaseDate: number;

  constructor(name: string, releaseDate: number) {
    this.name = name;
    this.releaseDate = releaseDate;
  }

  getName(): string {
    return this.name;
  }

  getReleaseDate(): number {
    return this.releaseDate;
  }

  play() {
    console.log("I'm playing a console video game");
  }

  save() {
    console.log("I'm saving a console video game");
  }

  overrideSave() {
    console.log("I'm overriding a save of a console video game");
  }

  load() {
    console.log("I'm loading a console video game");
  }
}

// Dependency Inversion
// The principle of dependency inversion refers to the decoupling of software modules. This way, instead of high-level modules depending on low-level modules, both will depend on abstractions.

class JavascriptStudent {
  constructor() {}

  learnJavascript() {
    console.log("I'm learning Javascript");
  }
}

class Gentleman {
  private name: string;
  private student: JavascriptStudent;

  constructor(name: string) {
    this.name = name;
    this.student = new JavascriptStudent();
  }

  getName(): string {
    return this.name;
  }

  teachJavascript() {
    this.student.learnJavascript();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

class Student {
  learn() {
    console.log("I'm learning");
  }
}

class CorrectJavascriptStudent extends Student {
  learn() {
    console.log("I'm learning Javascript");
  }
}

class CorrectGentleman {
  private name: string;
  private student: Student;

  constructor(name: string, student: Student) {
    this.name = name;
    this.student = new Student();
  }

  getName(): string {
    return this.name;
  }

  teach() {
    this.student.learn();
  }
}

const student = new Student();
const studentJavascript = new CorrectJavascriptStudent();
const gentleman = new CorrectGentleman("Alan", studentJavascript);
gentleman.teach();
