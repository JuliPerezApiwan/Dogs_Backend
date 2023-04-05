const { Temperament } = require('../../db.js');

const getTemperaments = async () => {
    try {
        const allTemperaments = await Temperament.findAll();
        //console.log(allTemperaments)
        return allTemperaments;
    } catch (error) {
        return {error: error.message};
    }

}

module.exports = {
    getTemperaments
}