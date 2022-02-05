import captureWebsite from "capture-website";

async function foo() {
  console.log("starting...");
  await captureWebsite.file("https://tpetrina.com", "screenshot.png");
  console.log("done!");
}

foo();
