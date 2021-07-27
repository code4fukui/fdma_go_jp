import { fetchBin } from "https://js.sabae.cc/fetchBin.js";

const url = "https://www.fdma.go.jp/disaster/coronavirus/items/coronavirus_data.xlsx";
const bin = await fetchBin(url);
await Deno.writeFile("emergencytransport_difficult.xlsx", bin);
