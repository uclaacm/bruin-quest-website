const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const { Puzzle } = require('../models/Puzzle');
const { GeneralArea } = require('../models/GeneralArea');

//  Load the list of general Area from ./config/generalAreaSeed.csv
const populateArea = async (cb) => {
    //  Used for testing purpose
    await GeneralArea.remove({}, (err) => {
        console.log("General Area Removed");
    });

    let promises = [];

    fs.createReadStream(path.resolve(__dirname, '../config', 'generalAreaSeed.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', err => console.error(err))
        .on('data', async row => {
            
            try{
                const generalAreaInstance = new GeneralArea(row);
                promises.push(generalAreaInstance.save());
                console.log(`General Area: Adding ${generalAreaInstance.displayName}`);
            }
            catch(err) {
                console.error(`General Area: Failed to add ${row.displayName}`, err.message);
            }
        })
        .on('end', async () => {
            await Promise.all(promises);
            console.log(`General Areas have been added successfully`);
            cb();
        })
}

//  load the list of puzzles from ./config/pussleSeed.csv
const populatePuzzle = async() => {
    await Puzzle.remove({}, (err) => {
        console.log("Puzzles Area Removed")
    })
    //  load the puzzle seeder.
    //  Puzzle seeder also update the location depending on the general area
    fs.createReadStream(path.resolve(__dirname, '../config', 'puzzleSeed.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', err => console.error(err))
        .on('data', async row => {
            
            try {
                //  check the generalAreaID
                let foundArea = await GeneralArea.findById(row.generalAreaId);
                if(!foundArea){
                    throw new Error(`${row.generalAreaId} is not a valid generalAreaId`);
                }

                //  update General Area location from puzzleInformation
                const puzzleLocation = {
                    name: row._id,
                    image: row.image,
                    puzzleId: row.location
                };
                await foundArea.locations.push(puzzleLocation);
                await foundArea.save();
                
                //  remove the image column
                delete row['image'];

                //  create new puzzle instance and add it
                const puzzleInstance = new Puzzle(row);
                await puzzleInstance.save();
                console.log(`Puzzle: Adding ${row.displayName}`);

            } catch (err) {
                console.error(`Puzzle: Failed to add ${row.displayName}`, err.message);
            }
        })
        .on('end', rowCount => {
            totalPuzzles = rowCount;
        })
}

const printArea = () => {
    console.log("Printing all areas");
    try{
        GeneralArea.find({}, (err, areas) => {
            areas.forEach(area => {
                console.log(area);
            });
        });

    }
    catch(err){
        console.error("Print Area Failed");
    }
    
}

const populateDB = async () => {
    await populateArea(populatePuzzle);
}
module.exports = { populateArea, populatePuzzle, printArea, populateDB }
