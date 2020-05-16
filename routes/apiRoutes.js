// ===============================================================================
// LOAD DATA
// We are linking our routes to our db.json file
// ===============================================================================

const db = require("../db/db.json");

module.exports = function (app) {
  //* GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function (req, res) {
    fs.readFile(db, function (err, data) {
      if (err) {
        console.log("ERROR: API Route GET Read");
      }
      res.json(JSON.parse(data));
    });
  });
  //* POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    fs.readFile(db, function (err, data) {
      if (err) {
        console.log("ERROR: API Route POST Read");
      }
      JSON.parse(data).push(newNote);
      fs.writeFile(db, JSON.stringify(JSON.parse(data)), function (err) {
        console.log("ERROR: API Route POST Write");
      });
    });
  });
  //* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
  // This means you'll need to find a way to give each note a unique `id` when it's saved. 
  // In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, 
  // and then rewrite the notes to the `db.json` file.
  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function (req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
};
