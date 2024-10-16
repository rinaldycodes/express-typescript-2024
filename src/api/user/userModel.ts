import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";
import { sequelize } from "@/common/utils/databaseConfig";
import { DataTypes } from "sequelize";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});


export const UserModel = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_is_verified: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  user_created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  user_updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
  }
}, {
  // BIAR GA CREATE , createdAt and updatedAt
  tableName: 'users',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['user_id']
    },
    {
      unique: true,
      fields: ['user_email']
    }
  ]
})

console.log("UserModel: ", UserModel == sequelize.models.User)