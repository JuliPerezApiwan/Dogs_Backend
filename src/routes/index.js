const { Router } = require('express');
const { getAllDogs } = require('../controllers/Dogs/getAllDogs');
const { getIdDogs } = require('../controllers/Dogs/getIdDogs');
const { getName } = require('../controllers/Dogs/getName.js');
const { getTemperaments } = require('../controllers/Temperaments/getTemperaments');
const { postDog } = require('../controllers/Dogs/postDog');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async (req, res) => {
    try {
        const allDogs = await getAllDogs();
        res.status(200).json(allDogs);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/dogs/name', async (req, res) => {
    // para buscar name?name=Albania
  
    const { name } = req.query;
  
    try {
      const response = await getName(name);
      return res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getIdDogs(id)
        if(!result) throw new Error('No existe el ID');

      else 
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})


router.get('/temperaments', async (req, res) => {
    try {
      const allTemperaments = await getTemperaments();
      res.status(200).json(allTemperaments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/dog', async (req, res) => {
    const { image, name, min_height, max_height, min_weight, max_weight, life_span, temperamentID } = req.body;
    try {
      
      const result = await postDog(image, name, min_height, max_height, min_weight, max_height, life_span, temperamentID);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });
module.exports = router;
