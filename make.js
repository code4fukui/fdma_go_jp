import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import IMIMojiConverter from "https://code4sabae.github.io/imi-moji-converter-es/IMIMojiConverter.mjs";
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { Num } from "https://js.sabae.cc/Num.js";

const fn = "emergencytransport_difficult.xlsx"
const fn2 = fn.substring(0, fn.length - 4) + "csv";
const fn3 = fn.substring(0, fn.length - 5) + "_pref.csv";
const fn4 = fn.substring(0, fn.length - 5) + "_all.csv";

const ws = XLSX.decode(new Uint8Array(await Deno.readFile(fn)));
const csv = XLSX.toCSV(ws); // only first sheet

const assert = (a, b) => {
  if (a != b) {
    throw new Error(a + " != " + b);
  }
};
const assertNot = (a, b) => {
  if (a == b) {
    throw new Error(a + " == " + b);
  }
};

const name = csv[1][3];
assert(name, "救急搬送困難事案　今回");

let year = null;
for (let i = 3; i < csv[3].length; i++) {
  if (csv[2][i]) {
    year = IMIMojiConverter.toHalfWidth(csv[2][i]);
  }
  const day = csv[3][i];
  csv[3][i] = year + " " + day;
}

let pref = null;
for (let i = 4; i < csv.length; i++) {
  const p = csv[i][1];
  if (!p) {
    csv[i][1] = pref;
  } else {
    pref = p;
  }
}

csv.splice(0, 3);
csv.splice(csv.length - 1, 1);
for (let i = 0; i < csv.length; i++) {
  csv[i].splice(0, 1);
}

const csv2 = [["都道府県", "消防本部名", "開始日", "終了日", "救急搬送困難事案数"]];
for (let i = 2; i < csv[0].length; i++) {
  const day = IMIMojiConverter.toHalfWidth(csv[0][i]);
  // R2 3/30(月)～4/5(日)分
  //const n = day.match(/R(\d+) (\d+)\/(\d+)\(.\)～(\d+)\/(\d+)\(.\)分\s+【(.+)】/);
  const n = day.match(/R(\d+) (\d+)\/(\d+)\(.\)[～～]\s*(\d+)\/(\d+)\(.\)/);
  //console.log(day, n);
  const start = new Day("R" + n[1], n[2], n[3]);
  const end = new Day("R" + (parseInt(n[1]) + (parseInt(n[4]) < parseInt(n[2]) ? 1 : 0)), n[4], n[5]);
  //const week = n[6];
  //console.log(start, end);
  csv[0][i] = [start, end];
}
for (let j = 2; j < csv[0].length; j++) {
  for (let i = 1; i < csv.length; i++) {
    const c = csv[i];
    if (c[j]) {
      const num = Num.removeComma(c[j]);
      csv2.push([c[0], c[1], csv[0][j][0], csv[0][j][1], num]);
    }
  }
}

await Deno.writeTextFile(fn2, CSV.encode(csv2));
const sum1 = CSV.toJSON(csv2).reduce((prev, cur) => prev + cur.救急搬送困難事案数, 0);
console.log(sum1);

// 都道府県別、集計

const h = csv2[0];
const csv3 = [[h[0], h[2], h[3], h[4]]];
let bkpref = null;
for (let i = 1 ; i < csv2.length; i++) {
  const c = csv2[i];
  const pref = c[0];
  if (pref == bkpref) {
    csv3[csv3.length - 1][3] = csv3[csv3.length - 1][3] + c[4];
  } else {
    csv3.push([c[0], c[2], c[3], c[4]]);
  }
  bkpref = pref;
}

await Deno.writeTextFile(fn3, CSV.encode(csv3));
const sum2 = CSV.toJSON(csv3).reduce((prev, cur) => prev + cur.救急搬送困難事案数, 0);
console.log(sum2);
assert(sum1, sum2);

// 全国、集計
const csv4 = [[h[2], h[3], h[4]]];
let bkstart = null;
for (let i = 1 ; i < csv3.length; i++) {
  const c = csv3[i];
  const start = c[1];
  if (start == bkstart) {
    csv4[csv4.length - 1][2] = csv4[csv4.length - 1][2] + c[3];
  } else {
    csv4.push([c[1], c[2], c[3]]);
  }
  bkstart = start;
}

await Deno.writeTextFile(fn4, CSV.encode(csv4));
const sum4 = CSV.toJSON(csv4).reduce((prev, cur) => prev + cur.救急搬送困難事案数, 0);
console.log(sum4);
assert(sum2, sum4);
