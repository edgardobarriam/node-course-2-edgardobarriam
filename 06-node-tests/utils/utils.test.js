const utils = require('./utils');
const expect = require('expect');


describe('Utils', () => {
  
  describe('#add', () => {
    it('should add two numbers', () => {
      var res = utils.add(33, 11);
      
      expect(res).toBe(44).toBeA('number');
    });

    it('should async add two numbers', (done) => {
      utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
      });
    });
  });

  it('should square a number', () => {
    var res = utils.square(3);

    expect(res).toBe(9).toBeA('number');
  });

  it('should async square', (done) => {
    utils.asyncSquare(3, (res) => {
      expect(res).toBe(9).toBeA('number');
      done();
    });
  });

  it('should expect some values', () => {
    // expect(12).toNotBe(12);
    // expect({name: 'Edgardo'}).toEqual({name: 'Edgardo'});
    // expect([2,3,4]).toExclude(5);
    expect( {
      name: 'Edgardo',
      age:25,
      location: 'Puerto Montt'
    }).toInclude({
      age: 25
    })
  });

  // should verify first and last names are set
  // asert it includes first and lastname with proper values
  it('should verify first and last names are set', () => {
    var user = {
      age: 21,
      location: 'Puerto Montt',
    }
    
    var res = utils.setName(user,'Edgardo Barria');

    expect(res).toInclude({
      firstName: 'Edgardo',
      lastName: 'Barria'
    });
  });
});