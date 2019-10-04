let errors = [];

function pushError(mesage) {
  errors.push({ msg: mesage });
}

function emptyErrors() {
  errors = [];
}

function getErrors() {
  return errors;
}

module.exports = {
  pushError: pushError,
  emptyErrors: emptyErrors,
  getErrors: getErrors
};
