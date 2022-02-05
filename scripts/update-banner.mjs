import captureWebsite from "capture-website";

console.log("starting...");
await captureWebsite.file(
  "http://localhost:3000/banner",
  "public/static/images/banner.png",
  {
    overwrite: true,
  }
);
console.log("done!");
