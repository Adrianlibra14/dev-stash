import User from "./User";
import Item from "./Item";
import ItemType from "./ItemType";
import Collection from "./Collection";
import Tag from "./Tag";

// User -> Items, Collections, ItemTypes
User.hasMany(Item, { foreignKey: "userId", as: "items" });
User.hasMany(Collection, { foreignKey: "userId", as: "collections" });
User.hasMany(ItemType, { foreignKey: "userId", as: "itemTypes" });

Item.belongsTo(User, { foreignKey: "userId", as: "user" });
Collection.belongsTo(User, { foreignKey: "userId", as: "user" });
ItemType.belongsTo(User, { foreignKey: "userId", as: "user" });

// ItemType -> Items
ItemType.hasMany(Item, { foreignKey: "itemTypeId", as: "items" });
Item.belongsTo(ItemType, { foreignKey: "itemTypeId", as: "itemType" });

// Item <-> Collection (many-to-many)
Item.belongsToMany(Collection, {
  through: "item_collections",
  foreignKey: "itemId",
  otherKey: "collectionId",
  as: "collections",
});
Collection.belongsToMany(Item, {
  through: "item_collections",
  foreignKey: "collectionId",
  otherKey: "itemId",
  as: "items",
});

// Item <-> Tag (many-to-many)
Item.belongsToMany(Tag, {
  through: "item_tags",
  foreignKey: "itemId",
  otherKey: "tagId",
  as: "tags",
});
Tag.belongsToMany(Item, {
  through: "item_tags",
  foreignKey: "tagId",
  otherKey: "itemId",
  as: "items",
});

// Collection -> default ItemType
Collection.belongsTo(ItemType, {
  foreignKey: "defaultTypeId",
  as: "defaultType",
});

export { User, Item, ItemType, Collection, Tag };
