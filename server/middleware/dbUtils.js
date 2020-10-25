
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');


const { Puzzle } = require('../models/Puzzle');
const { GeneralArea } = require('../models/GeneralArea')




//Load the list of general Area from ./config/generalAreaSeed.csv
const populateArea = async() => {
    let addedAreas = 0;
    let totalAreas = 0;
    fs.createReadStream(path.resolve(__dirname, '../config', 'generalAreaSeed.csv'))
        .pipe(csv.parse({headers: true}))
        .on('error', err => console.error(err))
        .on('data', async row => {
            const generalAreaInstance = new GeneralArea(row)
            try{
                
                await generalAreaInstance.save()
                addedAreas++
                console.log(`${addedAreas}/${totalAreas} General Area: ${generalAreaInstance._id} has been added successfully`);
            }
            catch(err) {
                console.error(`General Area: Failed to add ${generalAreaInstance.displayName}`, err.message)
            }
            
        })
        .on('end', rowCount => {
            totalAreas = rowCount
    })
}

//load the list of puzzles from ./config/pussleSeed.csv
const populatePuzzle = async() => {
    addedPuzzles = 0;
    totalPuzzles = 0;
    //load the puzzle seeder.
    //Puzzle seeder also update the location depending on the general area
    await fs.createReadStream(path.resolve(__dirname, '../config', 'puzzleSeed.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', err => console.error(err))
        .on('data', async row => {
            const puzzleInstance = new Puzzle(row);
            try {
                
                await puzzleInstance.save();
                addedPuzzles++;
                console.log(`${addedPuzzles}/${totalPuzzles} Puzzle: ${puzzleInstance._id} has been added successfully`);
            } catch (err) {
                console.error(`Puzzle: Failed to add ${puzzleInstance.name}`, err.message);
            }
        })
        .on('end', rowCount => {
            totalPuzzles = rowCount;
        })
}

const printArea = () => {
    console.log("Printing all areas")
    GeneralArea.find({}, (err, areas) => {
        areas.forEach(area => {
            console.log(area.displayName)
        })
    })
}

const populateDB = async () => {
    await populateArea()
    await printArea()
}
module.exports = {populateArea, populatePuzzle, printArea, populateDB}