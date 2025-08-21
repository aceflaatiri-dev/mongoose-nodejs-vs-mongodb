// index.js

// Import dependencies
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------- SCHEMA & MODEL ----------------
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },   // Required field
  age: Number,
  favoriteFoods: [String]                   // Array of strings
});

// Create Model
const Person = mongoose.model("Person", personSchema);

// ---------------- FUNCTIONS ----------------

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Alice",
    age: 22,
    favoriteFoods: ["pizza", "pasta"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log("✔️ Person saved:", data);
    done(null, data);
  });
};

// Create Many Records with Model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log("✔️ Many people added:", people);
    done(null, people);
  });
};

// Use model.find() to Search by Name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return console.error(err);
    console.log("✔️ Found people by name:", people);
    done(null, people);
  });
};

// Use model.findOne() to Find Person by Favorite Food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    console.log("✔️ Found one by food:", person);
    done(null, person);
  });
};

// Use model.findById()
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log("✔️ Found by ID:", person);
    done(null, person);
  });
};

// Classic Update (Find, Edit, Save)
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log("✔️ Updated person:", updatedPerson);
      done(null, updatedPerson);
    });
  });
};

// New Update Using findOneAndUpdate
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.error(err);
      console.log("✔️ Age updated:", updatedDoc);
      done(null, updatedDoc);
    }
  );
};

// Delete One Person by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err);
    console.log("✔️ Person removed:", removedDoc);
    done(null, removedDoc);
  });
};

// Delete Many People by Name
const removeManyPeople = (done) => {
  Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    console.log("✔️ People removed:", result);
    done(null, result);
  });
};

// Chain Search Query Helpers
const queryChain = (done) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })   // Sort ascending
    .limit(2)            // Limit to 2 results
    .select("-age")      // Exclude age field
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("✔️ Query chain result:", data);
      done(null, data);
    });
};

module.exports = {
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
};