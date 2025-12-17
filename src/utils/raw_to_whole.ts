// copied from https://github.com/stjet/banani/blob/b1b3b1475c6fa695a66fdff9742d97bfa0647b0b/util.ts#L145

const BANANO_DECIMALS: number = 29;

/** Does NOT mean whole number, can be decimal like "4.2001". Use instead of regular number since those lose precision when decimal */
type Whole = `${number}`; //number can include non-base-10 formats... but whatever, we can assume users will pass in only base-10 because they are normal for the most part

/** Turn raw Bananos (bigint) into whole Bananos (string) */
export function raw_to_whole(raw: bigint, decimals = BANANO_DECIMALS): Whole {
  const raw_string: string = raw.toString();
  let whole_string: string;
  if (raw_string.length > decimals) {
    whole_string = raw_string.slice(0, -decimals) + "." + raw_string.slice(-decimals);
  } else {
    const r: number = decimals - raw_string.length;
    whole_string = "0." + "0".repeat(r > 0 ? r : 0) + raw_string;
  }
  //truncate any extra zeroes
  const cl: number = whole_string.length;
  for (let c = 0; c < cl; c++) {
    let dot = whole_string.slice(-1) === ".";
    if (whole_string.slice(-1) === "0" || dot) {
      whole_string = whole_string.slice(0, -1);
      if (dot) break;
    } else {
      break;
    }
  }
  return whole_string as Whole;
}
