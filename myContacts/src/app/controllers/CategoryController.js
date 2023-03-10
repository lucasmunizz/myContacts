const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
    async index(req, res) {
        const categories = await CategoryRepository.findAll();

        res.json(categories);
    }

    async show(req, res) {
        const { id } = req.params;

        const category = await CategoryRepository.findById(id);

        if (!category) {
           return res.status(404).json({ message: 'user not found' });
        }

        res.json(category);
    }

    async store(req, res) {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: 'name is required' });
        }

        const category = await CategoryRepository.create({ name });

        res.json(category);
    }

    async delete(req, res) {
        const { id } = req.params;

        await CategoryRepository.delete(id);

        res.sendStatus(204);
    }

    async update(req, res) {
        const { id, name } = req.body;

        const categoryExists = await CategoryRepository.findById(id);

        if (categoryExists) res.send('teste');

        res.send('nao existo');
    }
}

module.exports = new CategoryController();
