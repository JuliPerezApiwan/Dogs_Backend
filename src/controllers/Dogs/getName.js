const { getApiData, getDbData } = require('./saveApiData.js');

const getName = async (name) => {
  if (!name) throw new Error('No tengo raza para buscar');


     if(name.charAt(0) === name.charAt(0).toUpperCase()){ // si el primer caracter es mayus
      if(name.charAt(1) === name.charAt(1).toUpperCase()){ // si el segundo tambien es mayus
          name = name.toLowerCase() // lo paso todo a minus
           name = (name.charAt(0)).toUpperCase() + name.slice(1) // y paso a mayus la primera letra que es como aparecen
       }
     }   
  
     if(name.charAt(0) === name.charAt(0).toLowerCase()){ // si la primera es minuscula (gralmente lo que sigue es minus)
      name = (name.charAt(0)).toUpperCase() + name.slice(1) // paso a mayus la primera letra
     }
    //console.log(name)

   const resultApi = await getApiData();
   const resultDb = await getDbData();
   const data = resultApi.concat(resultDb)
   //console.log(data)
   const dog = data.filter((e) =>
   e.name.toLowerCase().includes(name.toLowerCase())
 );
   //console.log(dogApi)
   if(dog.length) return dog;
   else {
    alert('')
    return data
    
   }
};

module.exports = {
  getName,
};

//no me valida con espacios, funcion para que te los elimine