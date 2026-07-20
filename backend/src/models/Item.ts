import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database";
import type User from "./User";
import type ItemType from "./ItemType";
import type Tag from "./Tag";
import type Collection from "./Collection";

type ItemContentType = "text" | "file";

interface ItemAttributes {
  id: string;
  title: string;
  contentType: ItemContentType;
  content: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  url: string | null;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  language: string | null;
  userId: string;
  itemTypeId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ItemCreationAttributes
  extends Optional<
    ItemAttributes,
    | "id"
    | "content"
    | "fileUrl"
    | "fileName"
    | "fileSize"
    | "url"
    | "description"
    | "isFavorite"
    | "isPinned"
    | "language"
  > {}

class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes
{
  declare id: string;
  declare title: string;
  declare contentType: ItemContentType;
  declare content: string | null;
  declare fileUrl: string | null;
  declare fileName: string | null;
  declare fileSize: number | null;
  declare url: string | null;
  declare description: string | null;
  declare isFavorite: boolean;
  declare isPinned: boolean;
  declare language: string | null;
  declare userId: string;
  declare itemTypeId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare user?: User;
  declare itemType?: ItemType;
  declare tags?: Tag[];
  declare collections?: Collection[];
}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contentType: {
      type: DataTypes.ENUM("text", "file"),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    itemTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "item_types", key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: true,
    indexes: [
      { fields: ["userId"] },
      { fields: ["itemTypeId"] },
      { fields: ["isFavorite"] },
      { fields: ["isPinned"] },
    ],
  },
);

export default Item;
