const axios = require('axios');
const { Temperament } = require('../../db');
const { MY_API_KEY } = process.env

const getApiDataTemperaments = async () => {
    try {
    let temperaments = []

    let apiDataTemperaments = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    temperaments.push(apiDataTemperaments);

    temperaments = (await Promise.all(temperaments)).map((c) => c.data.map((res) => {
        return {
            id: res.id,
            name: res.temperament
        }
    }))

   
    //console.log(allTemperaments)
    // temperaments.map((c) => {
    //     allTemperaments = allTemperaments.concat(c)
    // });
    //console.log(allTemperaments)

    return temperaments;
    } catch (error) {
    return { error: error.message };
    }
   
};

const saveApiDataTemperaments = async () => {
    try {
        
    let allTemperaments = await getApiDataTemperaments();
  
    let unicos = []
    let allTemperaments2 = allTemperaments[0].map((e) => e.name ? e.name.split(", ") : '') 
    //console.log(allTemperaments2)
   
    const todos = allTemperaments2.map((e) => {
        for (let i = 0; i < e.length; i++) {
            const element = e[i];
            if(!unicos.includes(element)){
                unicos.push(element)
            } 
        }
    })
  
   let temp = []
   let id = temp.length
   unicos.map((e) => temp.push({id:id++, name:e}))

    
   //console.log(temp)
 




    await Temperament.bulkCreate(temp);
    return temp
    } catch (error) {
    return { error: error.message };
    }
}


   


module.exports = {
    getApiDataTemperaments,
    saveApiDataTemperaments,

}
