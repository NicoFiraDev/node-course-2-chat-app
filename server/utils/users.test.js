const expect  = require('expect'),
      {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Duncan',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Ellie',
      room: 'React Course'
    },{
      id: '3',
      name: 'Blue',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Nico',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1',
        user   = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99',
        user   = users.removeUser(userId);

    expect(user).toBeFalsy;
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2',
        user   = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99',
        user = users.getUser(userId);

    expect(users).toBeFalsy;
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Duncan', 'Blue']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Ellie']);
  });
});
