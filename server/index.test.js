import assert from "node:assert/strict";
import { Store } from "./store.js";

const store = new Store();

const room = store.createRoom("Test Room");
assert.equal(room.name, "Test Room");
assert.ok(room.id.startsWith("room-"));

const rooms = store.listRooms();
assert.equal(rooms.length, 1);
assert.equal(rooms[0].name, "Test Room");

const msg = store.addMessage(room.id, "Alice", "Hello!");
assert.equal(msg.sender, "Alice");
assert.equal(msg.text, "Hello!");
assert.ok(msg.id.startsWith("msg-"));

const messages = store.getMessages(room.id);
assert.equal(messages.length, 1);
assert.equal(messages[0].text, "Hello!");

assert.equal(store.getRoom("nonexistent"), null);
assert.equal(store.getMessages("nonexistent"), null);
assert.equal(store.addMessage("nonexistent", "Bob", "Hi"), null);

console.log("All store tests passed.");
