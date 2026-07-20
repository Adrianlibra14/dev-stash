import { connectDatabase, sequelize } from "../src/config/database";
import "../src/models/associations";
import User from "../src/models/User";
import ItemType from "../src/models/ItemType";
import Item from "../src/models/Item";
import Collection from "../src/models/Collection";
import Tag from "../src/models/Tag";

const test = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log("Connected to Neon PostgreSQL\n");
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }

  // 1. System item types (should exist if seeds ran)
  const itemTypes = await ItemType.findAll();
  console.log(`Item types: ${itemTypes.length}`);
  itemTypes.forEach((t) =>
    console.log(`  ${t.name.padEnd(8)}  ${t.slug.padEnd(8)}  ${t.color}  ${t.icon}`),
  );

  // 2. Create a test user
  const user = await User.create({
    email: `test-${Date.now()}@devstash.io`,
    password: "hashed-test-password",
    displayName: "Test Runner",
  });
  console.log(`\nCreated user: ${user.displayName} (${user.id})`);

  // 3. Create an item
  const item = await Item.create({
    title: "Test Item",
    contentType: "text",
    content: "This is a test item created by the DB test script.",
    language: "typescript",
    userId: user.id,
    itemTypeId: itemTypes.find((t) => t.slug === "snippet")!.id,
  });
  console.log(`Created item: ${item.title} (${item.id})`);

  // 4. Create a collection and add the item
  const collection = await Collection.create({
    name: "Test Collection",
    description: "Collection created by DB test script",
    userId: user.id,
  });
  await collection.$add("items", item.id);
  console.log(`Created collection: ${collection.name} (${collection.id})`);

  // 5. Create a tag and tag the item
  const tag = await Tag.create({ name: `test-tag-${Date.now()}` });
  await item.$add("tags", tag.id);
  console.log(`Created tag: ${tag.name} (${tag.id})`);

  // 6. Read back with associations
  const loadedItem = await Item.findByPk(item.id, {
    include: [
      { association: "user" },
      { association: "itemType" },
      { association: "collections" },
      { association: "tags" },
    ],
  });
  console.log("\nLoaded item with associations:");
  console.log(`  title:       ${loadedItem!.title}`);
  console.log(`  content:     ${loadedItem!.content?.slice(0, 50)}...`);
  console.log(`  language:    ${loadedItem!.language}`);
  console.log(`  user:        ${loadedItem!.user!.displayName}`);
  console.log(`  type:        ${loadedItem!.itemType!.name}`);
  console.log(`  collections: ${loadedItem!.collections!.map((c) => c.name).join(", ")}`);
  console.log(`  tags:        ${loadedItem!.tags!.map((t) => t.name).join(", ")}`);

  // 7. Cleanup
  await tag.destroy();
  await item.destroy();
  await collection.destroy();
  await user.destroy();
  console.log("\nCleanup done. All test records removed.");

  await sequelize.close();
  console.log("Connection closed.");
};

test().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
