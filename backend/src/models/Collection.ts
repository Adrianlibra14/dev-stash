import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database";
import type Item from "./Item";
import type User from "./User";

interface CollectionAttributes {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultTypeId: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CollectionCreationAttributes
  extends Optional<
    CollectionAttributes,
    "id" | "description" | "isFavorite" | "defaultTypeId"
  > {}

class Collection
  extends Model<CollectionAttributes, CollectionCreationAttributes>
  implements CollectionAttributes
{
  declare id: string;
  declare name: string;
  declare description: string | null;
  declare isFavorite: boolean;
  declare defaultTypeId: string | null;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare items?: Item[];
  declare user?: User;
}

Collection.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    defaultTypeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "item_types", key: "id" },
      onDelete: "SET NULL",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Collection",
    tableName: "collections",
    timestamps: true,
    indexes: [{ fields: ["userId"] }],
  },
);

export default Collection;
