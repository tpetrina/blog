import captureWebsite from "capture-website";

console.log("starting...");
await captureWebsite.file(
  "http://localhost:3000/banner",
  "public/static/images/banner.png",
  {
    overwrite: true,
    width: 1200,
    height: 630,
  }
);
console.log("done!");
