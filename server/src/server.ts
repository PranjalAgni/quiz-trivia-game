import app from "./app";

const server = app.listen(app.get("PORT"), () => {
  console.log("App is running at http://localhost:%d%s in %s mode", app.get("PORT"), app.get("gqlpath"), app.get("env"));
});

export default server;
