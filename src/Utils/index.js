class Letter {
  value; // 'e'
  path;
  extensions = []; // array of Letters: includes null if it is the end of a name

  constructor (value, path) {
    this.value = value;
    this.path = path;
  }

  // recursive function that keeps calling until a name has been populated
  populateName (str, path) {
    if (!path) { path = str; }
    // If length is 0, there are no more letters to add.
    // We push `null` to the array to signal that that is the end of a name.
    if (str.length === 0) {
      this.extensions.push({value: null});
      console.log('end');
    } else {
      const nextLetter = this.findExtension(str[0])
      // Remove first letter and pass back into populateName
      const remaining = str.substr(1);
      if (nextLetter) {
        console.log('next:', true, nextLetter);
        nextLetter.populateName(remaining, path);
      } else {
        const newPath = path.substr(0,path.length - str.length + 1)
        let newLetter = new Letter(str[0], newPath);
        this.extensions.push(newLetter);
        console.log('next:', false, newLetter);
        newLetter.populateName(remaining, path);
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
      return this;
    }

    let nextLetter = this.findExtension(str[0])
    console.log('next letter search', nextLetter);
    if (nextLetter) {
      return nextLetter.search(str.substr(1));
    } else {
      console.log(false);
      return null;
    }
  }

  // populateMatches () {
  //   if (this.findExtension(null)) {

  //   }
  // }

  isFullName () {
    return this.findExtension(null);
  }
}

export default class Names {
  firstLetters = new Letter(); // instance of Letter
  // search = ''; // search text
  current; // current Letter
  matches = [];

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

  async search (str) {
    // Again, capitalize so that we can compare
    const caps = str.toUpperCase();

    this.current = this.firstLetters.search(caps);
    this.populateMatches();
    // TODO: If we are still using the root string, continue down tree.  If not, start over
  }

  populateMatches () {
    console.log('populating matches');
    if (this.current.isFullName()) {
      this.matches.push(this.current.path)
    }
    console.log(this.matches)
  }
}