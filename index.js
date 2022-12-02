"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pdf2pic_1 = require("pdf2pic");
var fs = require("fs");
var sharp = require("sharp");
var express = require("express");
var path = require("path");
var app = express();
var SOURCE_FOLDER = "./pdf.input";
var TARGET_FOLDER = "./pdf.output";
var options = {
    saveFilename: "",
    savePath: TARGET_FOLDER,
    format: "png",
    width: 700,
    height: 910,
    density: 130
};
var files = fs.readdirSync(SOURCE_FOLDER);
try {
    convertToPNG(files);
}
catch (err) {
    console.log(err);
}
var start;
function convertToPNG(files) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, files_1, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (file) {
                        var fileName, storeAsImage;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    start = Date.now();
                                    fileName = file.replace(".pdf", "");
                                    options.saveFilename = fileName;
                                    storeAsImage = (0, pdf2pic_1.fromPath)("pdf.input/".concat(file), options);
                                    return [4 /*yield*/, storeAsImage(1).then(function (resolve) {
                                            console.log("Page 1 is now converted as image of pdf " + fileName + ".pdf");
                                            convertToThumbnail(resolve.path, fileName);
                                            return resolve;
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, files_1 = files;
                    _a.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 4];
                    file = files_1[_i];
                    return [5 /*yield**/, _loop_1(file)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function convertToThumbnail(path, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("thumbnail ------", fileName + ".thumbnail.png");
                    return [4 /*yield*/, sharp(path)
                            // .resize({ width: 600 })
                            .extract({ left: 0, top: 0, width: 700, height: 280 })
                            .toFile("".concat(TARGET_FOLDER, "/").concat(fileName, ".thumbnail.png"))];
                case 1:
                    _a.sent();
                    console.log("time taken in ms -----", Date.now() - start);
                    return [2 /*return*/];
            }
        });
    });
}
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, "pdf.output/".concat(req.url)));
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
