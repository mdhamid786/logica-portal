module.exports = function (sequelize, DataTypes) {
    const Settings = sequelize.define(
      "Settings",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        companyname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pagetitle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        shortaddress: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },        
      },
      {
        timestamps: true,
        tableName: "settings",
      }
    );
  
    return Settings;
  };
  