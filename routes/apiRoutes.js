// ===============================================================================
// LOAD DATA
// We are linking our routes to our db.json file
// ===============================================================================
const fs = require("fs");

module.exports = function (app) {
  //* GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
        return res.send("ERROR: API Route GET Read");
      }
      res.json(JSON.parse(data));
    });
  });

  app.get("/api/notes/:id", function (req, res) {
    const noteId = req.params.id;

    if (!noteId) {
      return res.send("No note found");
    }
    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
        return res.send("ERROR: Retrieving note ID");
      }
      if (data) {
        res.json(JSON.parse(data).filter((note) => note.id === noteId));
      } else {
        return res.send("No note found");
      }
    });
  });
  //* POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    const note = req.body;
    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
        return res.send("ERROR: API Route POST Read");
      }
      const obj = JSON.parse(data);
      obj.push(note);

      fs.writeFile("./db/db.json", JSON.stringify(obj), function (err) {
        if (err) {
          console.log(err);
          return res.send("ERROR: API Route POST Write");
        }
        res.send("New note created");
      });
    });
  });
  //* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
  // This means you'll need to find a way to give each note a unique `id` when it's saved.
  // In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property,
  // and then rewrite the notes to the `db.json` file.
  app.delete("/api/notes/:id", function (req, res) {
    const noteId = req.params.id;
    if (!noteId) {
      return res.send("No note found");
    }
    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
        return res.send("ERROR: Reading note ID");
      }
      if (data) {
        const obj = JSON.parse(data);
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].id === noteId) {
            obj.splice(i, 1);
          }
        }
        fs.writeFile("./db/db.json", JSON.stringify(obj), function (err, data) {
          if (err) {
            console.log(err);
            return res.send("ERROR: Deleting the note");
          }
          res.send("Note successfully deleted");
        });
      } else {
        return res.send("No note found");
      }
    });
  });
};
