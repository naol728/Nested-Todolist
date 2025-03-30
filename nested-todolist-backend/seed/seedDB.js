const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./../models/User");
const Collection = require("./../models/Collection");
const Task = require("./../models/Task.js");

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
};

// Helper function to hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Seed Data
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Deleting existing data...");
    await User.deleteMany();
    await Collection.deleteMany();
    await Task.deleteMany();

    console.log("Seeding users...");
    const user1 = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: await hashPassword("password123"),
    });

    const user2 = await User.create({
      name: "Jane Smith",
      email: "jane@example.com",
      password: await hashPassword("password456"),
    });

    console.log("Seeding collections...");
    const workCollection = await Collection.create({
      name: "Work",
      icon: "💼",
      favorite: false,
      userId: user1._id,
    });

    const personalCollection = await Collection.create({
      name: "Personal",
      icon: "🏠",
      favorite: true,
      userId: user2._id,
    });

    console.log("Seeding tasks...");
    const task1 = await Task.create({
      title: "Build API",
      description: "Develop authentication API",
      completed: false,
      priority: "high",
      collectionId: workCollection._id,
      subtasks: [],
    });

    const task2 = await Task.create({
      title: "Implement JWT authentication",
      description: "Secure API with JWT",
      completed: false,
      priority: "medium",
      collectionId: workCollection._id,
      subtasks: [],
    });

    const task3 = await Task.create({
      title: "Morning Workout",
      description: "Complete 30-minute exercise",
      completed: false,
      priority: "low",
      collectionId: personalCollection._id,
      subtasks: [],
    });

    console.log("Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

// Run Seeder
seedDatabase();
