const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")({ origin: true, credentials: true }));
app.use(require("cookie-parser")());

app.use("/user", require("./routers/user"));
app.use("/patient", require("./routers/patient"));

const cfg = require("./config");
app.listen(cfg.port, () => console.log(`app listening on port ${cfg.port}`));
