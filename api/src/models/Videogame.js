const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
  );
};
