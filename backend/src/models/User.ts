import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database";
import type Item from "./Item";
import type Collection from "./Collection";
import type ItemType from "./ItemType";

interface UserAttributes {
  id: string;
  email: string;
  password: string | null;
  githubId: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  isPro: boolean;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "password"
    | "githubId"
    | "displayName"
    | "avatarUrl"
    | "isPro"
    | "stripeCustomerId"
    | "stripeSubscriptionId"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare email: string;
  declare password: string | null;
  declare githubId: string | null;
  declare displayName: string | null;
  declare avatarUrl: string | null;
  declare isPro: boolean;
  declare stripeCustomerId: string | null;
  declare stripeSubscriptionId: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare items?: Item[];
  declare collections?: Collection[];
  declare itemTypes?: ItemType[];
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPro: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  },
);

export default User;
