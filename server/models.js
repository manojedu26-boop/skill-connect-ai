const { Sequelize, DataTypes } = require('sequelize');

// Initialize SQLite Database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM('client', 'freelancer'),
    allowNull: false,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  title: { type: DataTypes.STRING },
  photoUrl: { type: DataTypes.TEXT },
  skills: { type: DataTypes.STRING }, // Stored as comma separated string
  hourlyRate: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  timezone: { type: DataTypes.STRING },
  tier: { type: DataTypes.ENUM('free', 'premium'), defaultValue: 'free' },
  reputationScore: { type: DataTypes.INTEGER, defaultValue: 100 },
});

const Gig = sequelize.define('Gig', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  budget: { type: DataTypes.STRING },
  timeline: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('open', 'in_progress', 'completed'), defaultValue: 'open' },
});

// Relationships
User.hasMany(Gig, { foreignKey: 'clientId' });
Gig.belongsTo(User, { foreignKey: 'clientId' });

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
});

module.exports = { sequelize, User, Gig };
