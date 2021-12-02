function randf(lo, hi) {
  return Math.random() * (hi + 1) + lo;
}

function randint(lo, hi) {
  return Math.floor(randf(lo, hi));
}

class DNA {
  constructor(len) {
    this.dnaLength = len;
    this.dna = [];
  }

  mutate(rate) {
    for (let d in this.dna) {
      if (randf(0, 1) < rate) {
        //this.dna[d] += randf(-21, 21);
      }
    }
    if (randf(0, 1) < rate){
      this.dna[randint(0, this.dna.length-1)] += randf(-20, 10)
    }
  }

  crossover(p){
    let newDna = new DNA(this.dnaLength)
    for (let i in p){
      if (randf(0, 1) < 0.5){
        newDna.dna.push(this.dna[i])
      }else{
        newDna.dna.push(p[i])
      }
    }
    this.dna = [...newDna.dna]
  }

  initialize() {
    for (let i = 0; i < this.dnaLength; i++) {
      this.dna.push(randint(0, 255));
    }
  }
}