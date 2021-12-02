const width = 1280;
const height = 720;

const population = 300;

let creatures = [];

let frame = 0;

function setup() {
  createCanvas(width, height);
  target = createVector(randf(0, width), randf(0, height))
  // Create our initial population
  for (let i = 0; i < population; i++) {
    creatures.push(new Creature(randint(0, width), randint(0, height)));
  }
}

function draw() {
  background(56);
  // Draw them
  for (let c of creatures) {
    c.show();
    c.update();
  }
  circle(target.x, target.y, 20)
  // Figure out which one is the best
  // Natural Selection
  if (frame > 150) {
    frame = 0
    let theBest = 0;
    let els = 20;
    let elites = [];
    creatures = quickSort(creatures, 0, creatures.length - 1);
    for (let i = creatures.length - 1; i >= creatures.length-1-els; i--) {
      elites.push(creatures[i]);
    }
    // Replace everyone with children of the best
    let count = 0;
    for (let i = 0; i < population; i++) {
      // DNA
      creatures[i].dna.dna = [...elites[count].dna.dna];
      creatures[i].dna.mutate(0.2);
      // creatures[i].dna.crossover(elites[count].dna.dna);
      // Brain
      creatures[i].brain = elites[count].brain.copy()
      creatures[i].brain.mutate(0.3)
      creatures[i].pos = createVector(randf(0, width), randf(0, height))
      count ++;
      if (count >= elites.length) {
        count = 0;
      }
    }
  }
  frame ++;
}
