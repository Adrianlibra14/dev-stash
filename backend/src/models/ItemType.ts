import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database";
import type Item from "./Item";
import type User from "./User";

interface ItemTypeAttributes {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isSystem: boolean;
  userId: string | null;
}

interface ItemTypeCreationAttributes
  extends Optional<ItemTypeAttributes, "id" | "userId"> {}

class ItemType
  extends Model<ItemTypeAttributes, ItemTypeCreationAttributes>
  implements ItemTypeAttributes
{
  declare id: string;
  declare name: string;
  declare slug: string;
  declare icon: string;
  declare color: string;
  declare isSystem: boolean;
  declare userId: string | null;

  declare items?: Item[];
  declare user?: User;
}

ItemType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    isSystem: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "ItemType",
    tableName: "item_types",
    timestamps: false,
    indexes: [{ unique: true, fields: ["slug", "userId"] }],
  },
);

export default ItemType;
