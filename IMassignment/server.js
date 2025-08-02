const express = require("express");
const app = express();
const PORT = 5000;
const data = require("./data.json");

app.use(express.json());

app.get("/api/profile", function (req, res) {
  res.json(data);
});

app.post("/api/create-profile", function (req, res) {

 const { profile, name } = req.body;

  let errors = [];

  if (!profile)
    errors.push({
      message: "kailangan ug profile",
    });
  if (!name) {
    errors.push({
      message: "kailangan naay pangalan.",
    });
  }
  if (errors.length > 0) {
    return res.status(404).json(errors);
  }

  const newId =
    data.length > 0 ? Math.max(...data.map((p) => parseInt(p.id))) + 1 : "1";

  const newProfile = { id: newId, profile, name };

  data.push(newProfile);

  res.status(200).json({
    message: "Nahimuan na ug himo ang profile",
    newProfile,
  });
});

app.delete("/api/delete/:id", function (req, res) {
  const { id } = req.params;
  const findIndex = data.findIndex((index) => index.id === parseInt(id));

  if (findIndex === -1)
    return res.status(404).json({
      message: "Walay nakit-an nga profile",
    });

  const deleted = data.splice(findIndex, 1)[0];

  res.status(201).json({
    message: "Gitangal na ang profile",
    deleted,
  });
});

// update api
app.put("/api/update-profile/:id", function (req, res) {
  const { id } = req.params;
  // find function
  const foundProfile = data.find((profile) => profile.id === parseInt(id));

  const { profile, name } = req.body;

  let errors = [];

  if (!profile)
    errors.push({
      message: "Kailangan ug profile",
    });
  if (!name) {
    errors.push({
      message: "Kailangan ug ngalan.",
    });
  }
  if (errors.length > 0) {
    return res.status(404).json(errors);
  }

  if (profile) foundProfile.profile = profile;
  if (name) foundProfile.name = name;

  res.status(201).json({
    message: "Giusab na ang profile",
  });
});

app.listen(PORT, function () {
  console.log(http://localhost:${PORT});
});
