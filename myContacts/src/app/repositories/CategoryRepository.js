const db = require('../../database/index');

class CategoryRepository {
    async findAll() {
        const rows = await db.query('SELECT * FROM categories ORDER BY name');
        return rows;
    }

    async create({ name }) {
        const [rows] = await db.query(`
        INSERT INTO categories(name)
        VALUES ($1)
        RETURNING *`, [name]);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`
        SELECT * from categories
        WHERE id = $1`, [id]);

        return row;
    }

    async delete(id) {
        const row = await db.query(`
        DELETE FROM categories
        WHERE id = $1`, [id]);

        return row;
    }
}

module.exports = new CategoryRepository();
