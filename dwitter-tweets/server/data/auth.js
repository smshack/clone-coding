let users = [
  {
    id: '1',
    username: 'bob',
    password:
      ':$2b$15$$2b$10$HZgNe6Nfg53Q33bOyEEjX.Ci9YNN1lzpD1BpkyiAx6m2iyyw5Sm6G',
    name: 'Bob',
    email: 'bob@gamil.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

let userRepository = {};

userRepository.findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};
userRepository.findById = async (id) => {
  return users.find((user) => user.id === id);
};

userRepository.createUser = async (user) => {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
};
module.exports.userRepository = userRepository;
