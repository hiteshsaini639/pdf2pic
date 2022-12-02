import { fromPath } from "pdf2pic";
import * as fs from "fs";
import * as sharp from "sharp";
import * as express from "express";
import * as path from "path";

const app = express();

const SOURCE_FOLDER: string = "./pdf.input";
const TARGET_FOLDER: string = "./pdf.output";

interface option {
  density: number;
  saveFilename: string;
  savePath: string;
  format: string;
  width: number;
  height: number;
}

const options: option = {
  saveFilename: "",
  savePath: TARGET_FOLDER,
  format: "png",
  width: 700, //2550
  height: 910, //3300
  density: 100, //330
};

const files: string[] = fs.readdirSync(SOURCE_FOLDER);

try {
  convertToPNG(files);
} catch (err) {
  console.log(err);
}

let start: number;

async function convertToPNG(files: string[]) {
  for (const file of files) {
    start = Date.now();
    const fileName = file.replace(".pdf", "");
    options.saveFilename = fileName;
    const storeAsImage: any = fromPath(`pdf.input/${file}`, options);

    await storeAsImage(1).then((resolve: any) => {
      console.log(
        "Page 1 is now converted as image of pdf " + fileName + ".pdf"
      );
      convertToThumbnail(resolve.path, fileName);
      return resolve;
    });
  }
}

async function convertToThumbnail(path: string, fileName: string) {
  console.log("thumbnail ------", fileName + ".thumbnail.png");
  await sharp(path)
    // .resize({ width: 600 })
    .extract({ left: 0, top: 0, width: 700, height: 280 })
    .toFile(`${TARGET_FOLDER}/${fileName}.thumbnail.png`);

  console.log("time taken in ms -----", Date.now() - start);
}

app.use((req: any, res: any, next: any) => {
  res.sendFile(path.join(__dirname, `pdf.output/${req.url}`));
});

app.listen(3000);

// try {
//   convertToBuffer(files);
// } catch (err) {
//   console.log(err);
// }

// async function convertToBuffer(files) {
//   for (const file of files) {
//     const fileName = file.replace(".pdf", "");
//     options.saveFilename = fileName;
//     const storeAsImage: any = fromPath(`pdf.input/${file}`, options);

//     await storeAsImage(1, true).then((output: any) => {
//       console.log(
//         "Page 1 is now converted as image of pdf " + fileName + ".pdf"
//       );
//       const PNGpath = TARGET_FOLDER + "/" + fileName + ".png";
//       fs.writeFileSync(PNGpath, output.base64, "base64");
//       return convertToThumbnail(output.base64, fileName);
//     });
//   }
// }

// async function convertToThumbnail(base64: string, fileName: string) {
//   console.log("thumbnail ------", fileName + ".thumbnail.png");
//   const buffer = new Buffer(base64, "base64");
//   await sharp(buffer)
//     .resize({ width: 404 })
//     .extract({ left: 0, top: 0, width: 404, height: 161 })
//     .toFile(`${TARGET_FOLDER}/${fileName}.thumbnail.png`);
// }
