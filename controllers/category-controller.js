import { dbQuery } from "../db.js";

export class CategoryController {
  async listAll(req, res) {
    console.log("categoryController should list them all");
    const [results, fields] = await dbQuery(
      "SELECT * FROM categories");
    res.send(results);
  }

  async create(req, res) {
    const newCategory = {
      text: req.body.text,
    };
    console.log("categoryController create with name : ", newCategory.text);
    const [results, fields] = await dbQuery(
      "INSERT INTO categories (text) VALUES (?)",
      [newCategory.text]
    );
    res.json({ message: "category added", results: results });
  }

  async update(req, res) {
    const [results] = await dbQuery(
      "UPDATE categories SET text = ? WHERE id = ?",
      [req.body.text, req.params.id]
    );
    res.json({ message: "category updated", results: results });
  }

  async destroy(req, res) {
    const [results, fields] = await dbQuery(
      "DELETE FROM categories WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "category deleted", results: results });
  }
}
