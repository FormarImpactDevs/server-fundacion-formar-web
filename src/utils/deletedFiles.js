const fs = require("fs").promises;
const path = require("path");

const deletedFiles = (folder, files) => {
  Promise.all(
    files.map((file) => {
      if (file == "default-image.png") {
        return;
      }
      let pathFile = path.join(
        __dirname,
        "../../public/images/" + folder + "/" + file
      );
      fs.unlink(pathFile);
    })
  )

    .then(() => {
      console.log("Todos los archivos eliminados exitosamente");
    })
    .catch((err) => {
      console.error(
        "Ocurrió un error al tratar de remover los archivos :",
        err
      );
    });
};

module.exports = deletedFiles;
