var expect = require('expect');
var{generateMessage} = require('./message');

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