const user = {
  name: 'Alice',
  age: 30,
  city: 'Taipei',
};

for (const key in user) {
  console.log(`${key}: ${user[key as keyof typeof user]}`);
}
