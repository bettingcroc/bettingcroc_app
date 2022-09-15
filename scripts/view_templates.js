function render(res, page, data) {
  res.render(page, data);
}

module.exports = {
  render: render,
};
