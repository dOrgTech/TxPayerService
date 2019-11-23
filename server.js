import app from "./src/app";

const port = process.env.PORT || 8011;

const listen = () => console.log(`App listening on port # ${port}`);
app.listen(port, listen);
