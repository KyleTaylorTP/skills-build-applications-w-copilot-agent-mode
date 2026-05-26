/**
 * Seed the octofit_db database with test data
 * 
 * This script populates the MongoDB database with realistic sample data
 * for testing and development purposes.
 * 
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Sample user data
const sampleUsers = [
  {
    username: 'alex_runner',
    email: 'alex@octofit.com',
    password: 'hashed_password_1',
    firstName: 'Alex',
    lastName: 'Runner',
    bio: 'Marathon enthusiast and fitness lover',
  },
  {
    username: 'bella_cyclist',
    email: 'bella@octofit.com',
    password: 'hashed_password_2',
    firstName: 'Bella',
    lastName: 'Cyclist',
    bio: 'Road cycling is my passion',
  },
  {
    username: 'carlos_swimmer',
    email: 'carlos@octofit.com',
    password: 'hashed_password_3',
    firstName: 'Carlos',
    lastName: 'Swimmer',
    bio: 'Swimming and aquatics trainer',
  },
  {
    username: 'diana_yogi',
    email: 'diana@octofit.com',
    password: 'hashed_password_4',
    firstName: 'Diana',
    lastName: 'Yogi',
    bio: 'Yoga instructor and mindfulness coach',
  },
  {
    username: 'evan_lifter',
    email: 'evan@octofit.com',
    password: 'hashed_password_5',
    firstName: 'Evan',
    lastName: 'Lifter',
    bio: 'Strength training specialist',
  },
];

// Sample team data (will be updated with actual user IDs)
const sampleTeams = [
  {
    name: 'Morning Warriors',
    description: 'Early bird fitness enthusiasts who work out at dawn',
  },
  {
    name: 'Marathon Mavericks',
    description: 'Long-distance running team',
  },
  {
    name: 'Wellness Warriors',
    description: 'Holistic health and fitness team',
  },
];

// Sample activity data (will be updated with actual user IDs)
const sampleActivities = [
  {
    type: 'running',
    duration: 45,
    distance: 7.5,
    calories: 650,
    intensity: 'high',
    description: 'Morning 7.5km run at a fast pace',
  },
  {
    type: 'cycling',
    duration: 60,
    distance: 25,
    calories: 550,
    intensity: 'moderate',
    description: 'Scenic bike ride through the park',
  },
  {
    type: 'swimming',
    duration: 30,
    distance: 1.5,
    calories: 350,
    intensity: 'moderate',
    description: 'Pool workout with 30 laps',
  },
  {
    type: 'gym',
    duration: 75,
    calories: 450,
    intensity: 'high',
    description: 'Full body strength training session',
  },
  {
    type: 'yoga',
    duration: 60,
    calories: 200,
    intensity: 'low',
    description: 'Relaxing vinyasa flow class',
  },
  {
    type: 'hiking',
    duration: 90,
    distance: 8,
    calories: 600,
    intensity: 'moderate',
    description: 'Mountain trail hiking adventure',
  },
];

// Sample workout data (will be updated with actual user IDs)
const sampleWorkouts = [
  {
    name: '5K Training Plan',
    description: 'Beginner-friendly 5K race preparation program',
    type: 'cardio',
    duration: 30,
    difficulty: 'beginner',
    exercises: ['warm-up jog', 'interval training', 'cool down stretch'],
    notes: 'Focus on building endurance gradually',
  },
  {
    name: 'Full Body Strength',
    description: 'Complete body workout targeting all major muscle groups',
    type: 'strength',
    duration: 60,
    difficulty: 'intermediate',
    exercises: ['squats', 'bench press', 'deadlifts', 'rows', 'pull-ups'],
    notes: 'Rest 2 minutes between sets',
  },
  {
    name: 'Morning Yoga Flow',
    description: 'Energizing yoga sequence to start your day',
    type: 'flexibility',
    duration: 45,
    difficulty: 'beginner',
    exercises: ['sun salutation', 'warrior poses', 'downward dog', 'breathing exercises'],
    notes: 'Great for flexibility and balance',
  },
  {
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    type: 'cardio',
    duration: 30,
    difficulty: 'advanced',
    exercises: ['burpees', 'mountain climbers', 'jumping jacks', 'high knees'],
    notes: '30 seconds work, 15 seconds rest',
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✓ Created ${createdUsers.length} users`);

    // Seed teams with actual user IDs
    const teamsToInsert = sampleTeams.map((team, index) => ({
      ...team,
      leader: createdUsers[index]._id,
      members: createdUsers.slice(0, index + 2).map((u) => u._id),
    }));

    const createdTeams = await Team.insertMany(teamsToInsert);
    console.log(`✓ Created ${createdTeams.length} teams`);

    // Seed activities with actual user IDs
    const activitiesToInsert: any[] = [];
    createdUsers.forEach((user, userIndex) => {
      sampleActivities.slice(0, userIndex + 2).forEach((activity) => {
        activitiesToInsert.push({
          ...activity,
          userId: user._id,
          teamId: createdTeams[userIndex % createdTeams.length]._id,
        });
      });
    });

    const createdActivities = await Activity.insertMany(activitiesToInsert);
    console.log(`✓ Created ${createdActivities.length} activities`);

    // Seed workouts with actual user IDs
    const workoutsToInsert = createdUsers.flatMap((user, userIndex) =>
      sampleWorkouts.slice(0, userIndex + 1).map((workout) => ({
        ...workout,
        userId: user._id,
      }))
    );

    const createdWorkouts = await Workout.insertMany(workoutsToInsert);
    console.log(`✓ Created ${createdWorkouts.length} workouts`);

    // Seed leaderboard with calculated stats
    const leaderboardData = createdUsers.map((user, index) => ({
      userId: user._id,
      teamId: createdTeams[index % createdTeams.length]._id,
      rank: index + 1,
      totalCalories: (index + 1) * 1500,
      totalDistance: (index + 1) * 25,
      totalDuration: (index + 1) * 300,
      activitiesCount: (index + 1) * 5,
      period: 'all-time',
    }));

    const createdLeaderboard = await Leaderboard.insertMany(leaderboardData);
    console.log(`✓ Created ${createdLeaderboard.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`
    Summary:
    - Users: ${createdUsers.length}
    - Teams: ${createdTeams.length}
    - Activities: ${createdActivities.length}
    - Workouts: ${createdWorkouts.length}
    - Leaderboard entries: ${createdLeaderboard.length}
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
