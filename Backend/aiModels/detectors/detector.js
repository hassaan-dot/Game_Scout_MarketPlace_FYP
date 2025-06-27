// toxicChecker.js
import { exec } from "child_process";

function detectToxicComment(comment) {
  return new Promise((resolve, reject) => {
    const sanitized = comment.replace(/"/g, '\\"'); // prevent shell injection
    exec(
      `python3 model/toxic_detector.py "${sanitized}"`,
      (err, stdout, stderr) => {
        if (err) return reject(`Python error: ${stderr}`);
        try {
          const result = JSON.parse(stdout);
          resolve(result[0]); // result is an array
        } catch (e) {
          reject("Error parsing result");
        }
      }
    );
  });
}

module.exports = detectToxicComment;
