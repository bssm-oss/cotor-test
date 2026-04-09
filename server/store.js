export class Store {
  #rooms = new Map();
  #messages = new Map();
  #nextRoomId = 1;
  #nextMsgId = 1;

  createRoom(name) {
    const id = `room-${this.#nextRoomId++}`;
    const room = { id, name, createdAt: new Date().toISOString() };
    this.#rooms.set(id, room);
    this.#messages.set(id, []);
    return structuredClone(room);
  }

  listRooms() {
    return Array.from(this.#rooms.values()).map((r) => structuredClone(r));
  }

  getRoom(id) {
    const room = this.#rooms.get(id);
    return room ? structuredClone(room) : null;
  }

  addMessage(roomId, sender, text) {
    if (!this.#messages.has(roomId)) return null;
    const msg = {
      id: `msg-${this.#nextMsgId++}`,
      sender,
      text,
      createdAt: new Date().toISOString(),
    };
    this.#messages.get(roomId).push(msg);
    return structuredClone(msg);
  }

  getMessages(roomId) {
    const msgs = this.#messages.get(roomId);
    return msgs ? msgs.map((m) => structuredClone(m)) : null;
  }
}
