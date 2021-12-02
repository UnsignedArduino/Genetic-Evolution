let target;

class Creature {
  constructor(x, y) {
    this.dna = new DNA(20);
    this.dna.initialize();
    this.survivalChance = 1;
    this.pos = createVector(x, y);
    this.size = 20;
    this.r = 0
    this.g = 0
    this.b = 0
    this.fitness = 0
    this.brain = new Dynet(2, 4, 4, SIGMOID)
    this.brain.mutate(1, 30)
    this.calcColors()
  }

  gimmeBaby() {
    let p = new Creature(this.pos.x, this.pos.y)
    let newD = new DNA();
    newD.dna = [...this.dna.dna];
    p.dna = newD
    p.dna.mutate(0.3)
    p.pos.x = randf(0, width)
    p.pos.y = randf(0, height)
    return p
  }

  evaluate() {
    // Evaluation condition
    const dnaLen = this.dna.dnaLength;
    // this.fitness = 0;
    // this.fitness += this.r / dnaLen;
    // this.fitness -= this.g / dnaLen/8;
    // this.fitness -= this.b / dnaLen/8;
    this.fitness = 1/dist(this.pos.x, this.pos.y, target.x, target.y)
    if (dist(this.pos.x, this.pos.y, target.x, target.y) < 10){
      this.fitness+=100
    }
    return this.fitness
  }

  calcColors(){
    this.r = 0;
    this.g = 0;
    this.b = 0;
    const sliceSize = floor((this.dna.dna.length - 1) / 3);
    const bottom = 0;
    for (let i = 0; i < sliceSize; i++) {
      this.r += this.dna.dna[i] / 6;
    }
    for (let i = bottom + sliceSize;i < sliceSize * 2; i++) {
      this.g += this.dna.dna[i] / 6;
    }
    for (let i = bottom + sliceSize* 2; i < sliceSize * 3; i++) {
      this.b += this.dna.dna[i] / 6;
    }
  }

  show() {
    this.calcColors()
    push();
    rectMode(CENTER)
    fill(this.r, this.g, this.b);
    rect(this.pos.x, this.pos.y, 20, 20);
    pop();
  }
  update(){
    let outs = this.brain.feedForward([target.x-this.pos.x, target.y-this.pos.y])
    if (outs[0] > 0.5){
      this.pos.x += this.size
    }
    else if (outs[1] > 0.5){
      this.pos.x -= this.size
    }
    if (outs[2] > 0.5){
      this.pos.y += this.size
    }
    if (outs[3] > 0.5){
      this.pos.y -= this.size
    }
    this.pos.x = constrain(this.pos.x, 0, width-this.size)
    this.pos.y = constrain(this.pos.y, 0, height-this.size)
    this.evaluate()
  }
}