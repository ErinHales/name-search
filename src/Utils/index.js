// TODO: add spaces to names

class Letter {
  value; // 'e'
  extensions = []; // array of Letters: includes null if it is the end of a name

  constructor (value) {
    this.value = value;
  }

  // recursive function that keeps calling until a name has been populated
  populateName (str) {
    // If length is 0, there are no more letters to add.
    // We push `null` to the array to signal that that is the end of a name.
    if (str.length === 0) {
      this.extensions.push(null);
      console.log('end');
    } else {
      const nextLetter = this.findExtension(str[0])
      // Remove first letter and pass back into populateName
      const remaining = str.substr(1);
      if (nextLetter) {
        console.log('next:', true, nextLetter);
        nextLetter.populateName(remaining);
      } else {
        let newLetter = new Letter(str[0]);
        this.extensions.push(newLetter);
        console.log('next:', false, newLetter);
        newLetter.populateName(remaining);
      }
    }
  }

  findExtension (letter) {
    return this.extensions.find(l => l.value === letter);
  }

  // searches if a string begins with these letters
  // string must be capitalized!
  search (str) {
    if (str.length === 0) {
      console.log(true);
      return true;
    }

    let nextLetter = this.findExtension(str[0])
    console.log('next letter search', nextLetter);
    if (nextLetter) {
      nextLetter.search(str.substr(1));
    } else {
      console.log(false);
      return false;
    }
  }

  populateNames () {

  }
}

export default class Names {
  firstLetters = new Letter(null); // instance of Letter
  // search = ''; // search text
  // current; // current Letter
  // matches = [];

  init (arr) {
    return new Promise((resolve, reject) => {
      arr.forEach(person => {
        // Uppercase whole name so it is easier to compare letters
        let n = person.name.toUpperCase();
        // Populate name
        this.firstLetters.populateName(n);
      })
      resolve();
    })
  }

  search (str) {
    // Again, capitalize so that we can compare
    const caps = str.toUpperCase();

    this.firstLetters.search(caps);
    // TODO: If we are still using the root string, continue down tree.  If not, start over
  }
}