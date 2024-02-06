module.exports = app => {
  const messages = require("../controllers/message.controller.js");

  let router = require("express").Router();

  // Create a new Message
  router.post("/", messages.create);

  // Retrieve all Messages
  router.get("/", messages.findAll);

  // Retrieve all published Messages
  router.get("/published", messages.findAllPublished);

  // Retrieve a single Message with id
  router.get("/:id", messages.findOne);

  // Update a Message with id
  router.put("/:id", messages.update);

  // Delete a Message with id
  router.delete("/:id", messages.delete);

  // Create a new Message
  router.delete("/", messages.deleteAll);

  app.use("/api/messages", router);
};
