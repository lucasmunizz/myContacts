const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
    async index(req, res) {
        const { orderBy } = req.query;
        const contacts = await ContactRepository.findAll(orderBy);
        res.json(contacts);
}

    async show(req, res) {
        const { id } = req.params;

        const contact = await ContactRepository.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(contact);
    }

    async store(req, res) {
        const {
            name, email, phone, category_id,
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const contactExists = await ContactRepository.findByEmail(email);

        if (contactExists) {
            return res.status(400).json({ error: 'This email is already been taken' });
        }

        const contact = await ContactRepository.create({
             name, email, phone, category_id,
        });

        res.json(contact);
    }

    async update(req, res) {
        const { id } = req.params;
        const {
            name, email, phone, category_id,
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const contactExists = await ContactRepository.findByEmail(email);

        if (contactExists && id !== contactExists.id) {
            return res.status(400).json({ error: 'This email is already been taken' });
        }

        const contactByID = await ContactRepository.findById(id);

        if (!contactByID) {
            return res.status(404).json({ message: 'User not found' });
        }

        const contact = await ContactRepository.update({
            name, email, phone, category_id,
       });

       res.json(contact);
    }

    async delete(req, res) {
        const { id } = req.params;

        await ContactRepository.delete(id);

        res.sendStatus(204);
    }
}

module.exports = new ContactController();
