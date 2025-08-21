
const {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
} = require("./index");

// Helper function to simulate callback
const done = (err, data) => {
  if (err) return console.error("❌ Error:", err);
  console.log("✅ Operation successful:", data);
};

// ---------------- DEMO TESTS ----------------

// 1. Create and Save One Person
// createAndSavePerson(done);

// 2. Create Many People
// createManyPeople([
//   { name: "John", age: 30, favoriteFoods: ["sushi", "burritos"] },
//   { name: "Mary", age: 25, favoriteFoods: ["salad", "pizza"] },
//   { name: "Bob", age: 40, favoriteFoods: ["steak", "burritos"] }
// ], done);

// 3. Find People by Name
// findPeopleByName("John", done);

// 4. Find One by Favorite Food
// findOneByFood("pizza", done);

// 5. Find by ID (replace with a real _id from your DB)
// findPersonById("PUT_REAL_ID_HERE", done);

// 6. Find, Edit, Then Save (add hamburger to favoriteFoods)
// findEditThenSave("PUT_REAL_ID_HERE", done);

// 7. Find and Update (set age = 20)
// findAndUpdate("John", done);

// 8. Remove by ID
// removeById("PUT_REAL_ID_HERE", done);

// 9. Remove Many People (all named Mary)
// removeManyPeople(done);

// 10. Chain Query (burritos lovers)
// queryChain(done);