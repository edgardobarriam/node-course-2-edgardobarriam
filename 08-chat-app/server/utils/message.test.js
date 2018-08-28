var expect = require('expect');
var{generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Edgardo';
    var text = 'Hello text'
    var testMessage = generateMessage(from, text);
    
    expect(typeof testMessage.createdAt).toBe('number');
    expect(testMessage).toHaveProperty('from', from);
    expect(testMessage).toHaveProperty('text', text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Deb';
    const latitude = 15;
    const longitude = 19;
    const url = 'https://www.google.com/maps?q=15,19';

    const message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', url);
  });
});