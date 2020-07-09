export default class Names {
  firstLetters = []; // array of Letters;

  init (arr) {
    arr.forEach(person => {
      let n = person.name;
      let letterPresent = this.firstLetters.find(l => l.value === n[0])
      if (letterPresent) {
        console.log('first:', true, letterPresent);
        letterPresent.populateName(n);
      } else {
        let firstLetter = new Letter(n[0]);
        this.firstLetters.push(firstLetter);
        console.log('first:', false, firstLetter);
        firstLetter.populateName(n);
      }
    })
    console.log(this.firstLetters)
  }
}

class Letter {
  value; // 'e' or null if it is the end of a name
  extensions = []; // array of Letters

  constructor (value) {
    this.value = typeof value === 'string' ? value.toUpperCase() : value;
  }

  populateName (str) {
    const remaining = str.slice(1);
    if (remaining.length === 0) {
      this.extensions.push(null);
      console.log('end');
    } else {
      let letterPresent = this.extensions.find(l => l.value === remaining[0]);
      if (letterPresent) {
        console.log('next:', true, letterPresent.value);
        letterPresent.populateName(remaining);
      } else {
        let nextLetter = new Letter(remaining[0]);
        this.extensions.push(nextLetter);
        console.log('next:', false, nextLetter);
        nextLetter.populateName(remaining);
      }
    }
  }
}