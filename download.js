import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const url = "https://www.fdma.go.jp/disaster/coronavirus/items/coronavirus_data.xlsx";
const bin = await fetchBin(url);
const fn = "emergencytransport_difficult.xlsx";
await Deno.writeFile(fn, bin);
console.log("downloaded " + fn);
