const { Dog } = require ('../../db.js')
const { getApiData, getDbData } = require('../../controllers/Dogs/saveApiData')

const getAllDogs = async () => {
    try {
        const allDogsDb = await getDbData();
        const allDogsApi = await getApiData()
        //console.log(allDogs)
        //console.log(allDogsApi)
        return allDogsApi.concat(allDogsDb);
        
    } catch (error) {
        return {error: error.message};
    }
}

module.exports = {
    getAllDogs
}