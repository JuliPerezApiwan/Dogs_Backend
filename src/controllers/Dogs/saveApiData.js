const axios = require('axios');
const { Dog, Temperament } = require('../../db');
const { MY_API_KEY } = process.env

const getApiData = async () => {
    try {
    let dogs = []

    let apiData = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    dogs.push(apiData);
    

    dogs = (await Promise.all(dogs)).map((c) => c.data.map((res) => {
        //if(res.image.includes('http') ? c.image.url :('no tiene img'))
//        


        return {
            id: res.id,
            image: res.image.url,
            name: res.name,
            height: res.height.metric,
            weight: res.weight.metric,
            life_span: res.life_span,
            temperament:res.temperament
            
        }
    }))
   
    let allDogs = [];
    dogs.map((c) => {
        allDogs = allDogs.concat(c)
    });


     //console.log(allDogs)
    return allDogs;
    } catch (error) {
    return { error: error.message };
    }
   
};

const getDbData = async () => {
    const res = Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
        }
    })
    return res
}



module.exports = {
    getApiData,
    getDbData,
}


// -  ID.\*
// -  Imagen.\*
// -  Nombre.\*
// -  Altura.\*
// -  Peso.\*
// -  Años de vida.\*