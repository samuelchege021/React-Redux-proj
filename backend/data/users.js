const users = [
  {
    name: "Admin User",
    email: "admin1@example.com",
    password: "123456",  // Plain text — Sequelize hook will hash this
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "123456",
    isAdmin: false,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
    isAdmin: false,
  }
];

export default users;
