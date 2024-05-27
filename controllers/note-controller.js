import { dbQuery } from "../db.js";

export class NoteController {
  async listAll(req, res) {
    try {
      const userId = req.userId;
      console.log("noteController should list them all", userId);
      const [results, fields] = await dbQuery(
        "SELECT * FROM notes WHERE user_id = ?",
        [userId]
      );

      res.send(results);
    } catch (error) {
      console.error("Error fetching notes: ", error);
      res.status(500).send({ error: "Error fetching notes" });
    }
  }

  async create(req, res) {
    try {
      const userId = req.userId;
      const newNote = {
        text: req.body.text,
        user_id: userId,
      };
      console.log(
        "noteController create with text : ",
        newNote.text,
        "for user: ",
        userId
      );
      const [results, fields] = await dbQuery(
        "INSERT INTO notes (text, user_id) VALUE (?, ?)",
        [newNote.text, newNote.user_id]
      );
      res.json({ message: "note added", results: results });
    } catch (error) {
      console.error("Error creating note: ", error);
      res.status(500).json({ error: "Error creating note" });
    }
  }

  async update(req, res) {
    try {
      const [results] = await dbQuery("UPDATE notes SET text = ? WHERE id= ?", [
        req.body.text,
        req.params.id,
      ]);
      res.json({ message: "note updated", results: results });
    } catch (error) {
      console.error("Error updating note: ", error);
      res.status(500).json({ error: "Error updating note" });
    }
  }

  async destroy(req, res) {
    try {
      const [results, fields] = await dbQuery(
        "DELETE FROM notes WHERE id = ?",
        [req.params.id]
      );
      res.json({ message: "note deleted", results: results });
    } catch (error) {
      console.error("Error deleting note: ", error);
      res.status(500).json({ error: "Error deleting note" });
    }
  }
}
