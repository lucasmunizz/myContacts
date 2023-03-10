const db = require('../../database/index');

class ContactRepository {
    async findAll(orderBy = 'ASC') {
        // return new Promise((resolve) => {
        //     resolve(contacts);
        // });
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
        return rows;
    }

    async findById(id) {
        // return new Promise((resolve) => {
        //     resolve(contacts.find((contact) => contact.id === id));
        // });
        const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
        return row;
    }

    async delete(id) {
        // return new Promise((resolve) => {
        //     contacts = contacts.filter((contact) => contact.id !== id);
        //     resolve();
        // });
        const deleteOP = await db.query(`
        DELETE from contacts
        WHERE id = $1`, [id]);

        return deleteOP;
    }

    async findByEmail(email) {
        // return new Promise((resolve) => {
        //     resolve(contacts.find((contact) => contact.email === email));
        // });
        const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
        return row;
    }

    async create({
        name, email, phone, category_id,
    }) {
        // return new Promise((resolve) => {
        //     const newContact = {
        //         id: v4(),
        //         name,
        //         email,
        //         phone,
        //         category_id,
        //     };

        //     contacts.push(newContact);
        //     resolve(newContact);
        // });

        const [row] = await db.query('INSERT INTO contacts(name, email, phone, category_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, phone, category_id]);
        return row;
    }

    async update({
        id, name, email, phone, category_id,
    }) {
        // return new Promise((resolve) => {
        //     const updatedContact = {
        //         id,
        //         name,
        //         email,
        //         phone,
        //         category_id,
        //     };

        //     contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
        //     resolve(updatedContact);
        // });

        const [rows] = await db.query(`
        UPDATE contacts
        SET name = $1, email = $2, phone = $3, category_id = $4
        WHERE id = $5
        RETURNING *`, [name, email, phone, category_id, id]);

        return rows;
    }
}

module.exports = new ContactRepository();
