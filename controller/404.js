exports.error = (req, res) => {
  res.render("error/404", {
    pageTitel: "Page Not Found",
  });
};
