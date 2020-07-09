export default class Names {
  firstLetters = []; // array of Letters;

  init (arr) {
    arr.forEach(person => {
      // uppercase whole name so it is easier to compare
      let n = person.name.toUpperCase();
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
    this.value = value;
  }

  populateName (str) {
    // Remove first letter which has already been added to the trie
    const remaining = str.substr(1);

    // If length is 0, there are no more letters to add.  We push `null` to the array to signal that that is the end of a name.
    if (remaining.length === 0) {
      this.extensions.push(null);
      console.log('end');
    } else {
      let letterPresent = this.extensions.find(l => l.value === remaining[0]);
      if (letterPresent) {
        console.log('next:', true, letterPresent);
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