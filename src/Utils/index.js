class Letter {
  value; // 'e'
  path; // 'abc' - The path leading up to this letter
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
      this.extensions.push(new Letter());
      console.log(`${path} added to trie`);
    } else {
      const nextLetter = this.findExtension(str[0])
      // Remove first letter and pass back into populateName
      const remaining = str.substr(1);
      if (nextLetter) {
        nextLetter.populateName(remaining, path);
      } else {
        const newPath = path.substr(0,path.length - str.length + 1)
        let newLetter = new Letter(str[0], newPath);
        this.extensions.push(newLetter);
        newLetter.populateName(remaining, path);
      }
    }
  }

  // Finds the next letter. If it does not exist, returns null value
  findExtension (letter) {
    return this.extensions.find(l => l.value === letter);
  }

  // searches if a name starts with the given string
  search (str) {
    if (str.length === 0) {
      console.log(`Path found: ${true}`);
      return this;
    }

    let nextLetter = this.findExtension(str[0])
    if (nextLetter) {
      return nextLetter.search(str.substr(1));
    } else {
      console.log(`Path found: ${false}`);
      return null;
    }
  }

  // recursive function that returns all the possible name matches
  populateMatches (nArr) {
    let names = nArr || [];
    if (this.isFullName()) {
      names.push(this.path.toLowerCase());
      if (this.extensions.length === 1) {
        return names;
      }
    }

    for (var i = 0; i < this.extensions.length; i++) {
      if (this.extensions[i] !== null) {
        const newMatches = this.extensions[i].populateMatches();
        names = names.concat(newMatches);
      }
    }
    return names;
  }

  // Checks if a path is a full name
  isFullName () {
    return this.extensions.find(l => !l.value);
  }
}

export default class Names {
  firstLetters = new Letter(); // instance of Letter
  searchStr = ''
  current; // current Letter
  matches = []; // list of names that are potential matches

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
    // If there is no text, clear the matches and return
    if (!str) {
      this.matches = [];
      this.searchStr = '';
      return;
    }

    // Again, capitalize so it will be easier to compare
    const caps = str.toUpperCase();

    // If we are building off of an old word, there is no need to recreate the path
    if (this.searchStr && this.current && caps.indexOf(this.searchStr) === 0) {
      this.current = this.current.findExtension(caps[caps.length - 1]);
    } else {
      this.current = this.firstLetters.search(caps);
    }

    // Retrieve the names that match the path
    if (this.current) {
      this.populateMatches();
    } else {
      this.matches = [];
    }

    // set searchStr for next iteration
    this.searchStr = caps;
  }

  populateMatches () {
    this.matches = this.current.populateMatches();
    console.log('name matches', this.matches);
  }
}