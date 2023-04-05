const { Temperament } = require('../../db.js');
const { Dog } = require('../../db.js');
const { getApiData, getDbData } = require('./saveApiData.js');

 // cantidad de razas en la db, ultimo id
const postDog = async ( image, name, min_height, max_height, min_weight, max_weight, life_span, temperamentID = []) => {
  const allDogsApi = await getApiData();
  const allDogsDb = await getDbData()
  const allDogs = allDogsApi.concat(allDogsDb)
  //console.log(allDogs)


  //const id = 300 + 1 + 2
 if (!name || !min_height || !max_height|| !min_weight || !max_weight || !life_span || !temperamentID) throw new Error('Me falta informacion');
 

  const validate =  allDogs.filter((e) => e.name === (name.charAt(0)).toUpperCase() + name.slice(1)) 
  //console.log(validate)
  if (validate.length) throw new Error ('La raza ya existe');
  


  if(!validate.length) {
    const newRaza = await Dog.create({
        image: image ? image : "https://www.kindpng.com/picc/m/139-1396987_clip-art-cats-and-dogs-dibujos-de-perros.png",
        name: (name.charAt(0)).toUpperCase() + name.slice(1) ,
        height:min_height.concat(' - ' + max_height),
        weight: min_weight.concat(' - ' + max_weight),
        life_span: life_span + ' years',
    })
   
   console.log(temperamentID)
for (let i = 0; i < temperamentID.length; i++) {
  const element = temperamentID[i];
  //console.log(element)
   const temp = await Temperament.findOne({
        where: {
            name : element
        }
    })
    
    await newRaza.addTemperament(temp)
  
}
   
    
return ("Raza creada correctamente");
  }
};

module.exports = {
  postDog,
};
         