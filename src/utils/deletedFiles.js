/* const fs = require("fs").promises;
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

module.exports = deletedFiles; */
const fs = require("fs").promises;
const path = require("path");

const deletedFiles = async (folder, imageUrls) => {
  try {
    await Promise.all(
      imageUrls.map(async (imageUrl) => {
        if (imageUrl.includes("default-image.png")) {
          return;
        }
        const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        console.log(fileName);
        let pathFile = path.join(
          __dirname,
          "../../public/images/",
          folder,
          fileName
        );
        await fs.unlink(pathFile);
        console.log(`Archivo ${fileName} eliminado exitosamente`);
      })
    );
    console.log("Todos los archivos eliminados exitosamente");
  } catch (err) {
    console.error("Ocurrió un error al tratar de remover los archivos:", err);
  }
};

module.exports = deletedFiles;
