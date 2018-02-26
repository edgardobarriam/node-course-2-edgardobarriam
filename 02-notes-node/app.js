const 
    fileSystem = require('fs'),
    os = require('os'),
    _ = require('lodash');
    notes = require('./notes.js'),
    yargs = require('yargs');

/* var username = os.userInfo().username;
fileSystem.appendFile('greetings.txt', `Hello ${username}! You are ${notes.age}.`, function(err) {
    if (err) {
        console.log('Unable to write file');
    }
    a
    a
    a
    a

});*/
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove','Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        logNote(note);
    } else {
        console.log('note title taken');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('note found');
        logNote(note);
    } else {
        console.log('not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note wasn\'t found' ;
    console.log(message);
} else {
    console.log('Command not found :(');
}

function logNote(note) {
    
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body : ${note.body}`);
}
