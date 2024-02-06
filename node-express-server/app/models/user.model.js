module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
      isActive: Boolean,
      isBanned: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
