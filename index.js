const prompt = require('prompt-sync')({autocomplete: false})

class PencilApp {

  colouredPencilType;

  constructor() {
    this.maxChar = 50;
    this.currentChar = 20;
    this.currTextIndex = -1;
    this.currLength = 0;
    this.pencilType = 'graphite';
    this.textEntries = [];

    this.mainMenu();
  }

  mainMenu() {
    console.log('1 - Change pencil type: (' + this.pencilType + ')')
    console.log('2 - New text entry')
    console.log('3 - View text entries')
    console.log('4 - Edit text entries')
    console.log('5 - Delete text entries')
    console.log('6 - Exit')
    console.log('------------------------------')
    this.choice = prompt('Pick a choice: ')

    switch (this.choice) {
      case '1':
        this.changePencilType()
        break;
      case '2':
        this.newTextEntry()
        break;
      case '3':
        this.selectTextEntry()
        break;
      case '4':
        this.updateTextEntry()
        break;
      case '5':
        this.deleteTextEntry()
        break;
      case '6':
        exit()
        break;

    }
  }

  newTextEntry() {
    if (this.textEntries.length >= 5) {
      console.log('ERROR: Too many text entries. Please delete / edit another text entry')
      return
    }
    this.currTextIndex++;
    this.currentChar = 0;

    this.textEntry()
  }

  textEntry() {
    const currInput = prompt('Enter input: ').
    this.textEntries.push(currInput)
  }

  selectTextEntry() {
    console.log('Select a  text entry: ')
    for (let i = 1; i <= this.textEntries.length; i++) {
        console.log(i + ', ')
    }

    this.currTextIndex = prompt('')
    if (this.currTextIndex <= this.textEntries.length && this.currTextIndex >= 0) {


      console.log(this.textEntries[this.currTextIndex])

      const anyKey = prompt('Press any key to exit...')
      if (anyKey)
        this.mainMenu()
    }
    else {
      this.selectTextEntryInvalid()
    }
  }

  selectTextEntryInvalid() {
      this.currTextIndex= prompt('')
      if (this.currTextIndex === 6) {
        process.exit()
      }

      if (this.currTextIndex <= this.textEntries.length && this.currTextIndex >= 0) {
        console.log(this.textEntries[this.currTextIndex])
        const anyKey = prompt('Press any key to exit...')
        if (anyKey)
          this.mainMenu()
        }
        else {
          this.selectTextEntryInvalid()
        }
  }

  updateTextEntry() {
    console.log('Select a  text entry: ')
    for (let i = 1; i <= this.textEntries.length; i++) {
        console.log(i + ', ')
    }

    this.currTextIndex = prompt('')
  }

  deleteTextEntry(idx) {
    this.textEntries.slice(idx, 1);
  }


  changePencilType() {
    this.pencilType = prompt('Please select a pencil type (Graphite, Coloured): ').toLowerCase();


    if (this.pencilType === "graphite") {
      this.maxChar = 50;
    }
    else if (this.pencilType === "coloured"){
      this.maxChar = 30;
      this.colouredPencilType = prompt('Choose a color: (Red, Blue, or Green): ');
      switch (this.colouredPencilType.toLowerCase()) {
        case 'red':
        case 'blue':
        case 'green':
          break;
        default:
          this.changePencilType('coloured')
          break;
      }
    }
    else {
      this.pencilType = prompt('Invalid Pencil type.\n Please select a valid pencil type (Graphite, Coloured): ')
      this.changePencilType(this.pencilType)
    }

    this.mainMenu()
  }
}

const App = new PencilApp()
