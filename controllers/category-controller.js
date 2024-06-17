import { dbQuery } from "../db.js";

export class CategoryController {
  async listAll(req, res) {
    try {
      console.log("categoryController should list them all");
      const [results, fields] = await dbQuery("SELECT * FROM categories");
      res.status(200).send(results);
    } catch (error) {
      console.error("Error fetching categories: ", error);
      res.status(500).send({ error: "Error fetching categories" });
    }
  }

  async create(req, res) {
    try {
      const newCategory = {
        text: req.body.text,
      };
      console.log("categoryController create with name : ", newCategory.text);
      const [results, fields] = await dbQuery(
        "INSERT INTO categories (text) VALUES (?)",
        [newCategory.text]
      );
      res.status(201).json({ message: "Category added", results: results });
    } catch (error) {
      console.error("Error creating category: ", error);
      res.status(500).json({ error: "Error creating category" });
    }
  }

  async update(req, res) {
    try {
      const [results] = await dbQuery(
        "UPDATE categories SET text = ? WHERE id = ?",
        [req.body.text, req.params.id]
      );
      res.status(200).json({ message: "Category updated", results: results });
    } catch (error) {
      console.error("Error updating category: ", error);
      res.status(500).json({ error: "Error updating category" });
    }
  }

  async destroy(req, res) {
    try {
      const [results, fields] = await dbQuery(
        "DELETE FROM categories WHERE id = ?",
        [req.params.id]
      );
      res.status(200).json({ message: "Category deleted", results: results });
    } catch (error) {
      console.error("Error deleting category: ", error);
      res.status(500).json({ error: "Error deleting category" });
    }
  }
}
