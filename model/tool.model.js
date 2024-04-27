import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

const Tool = sequelize.define(
  "Tool",
  {
    toolName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: {
        msg: "Tool Name is required"
      }
    }
  },
  {
    tableName: "tool"
  }
);

export { Tool };
