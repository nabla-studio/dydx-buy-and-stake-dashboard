import { base64, utf8 } from "@scure/base";

export function extractData(base64Input: string) {
  const input = utf8.encode(base64.decode(base64Input));
  const cleanedInput = input
    .replace(
      // biome-ignore lint/suspicious/noControlCharactersInRegex: needed
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\uFFFD]/g,
      "",
    )
    .replace("#", "")
    .trim();

  const regex = /\/([^\n]+)\n\?([^\+]+)\+([^\n]+)\n([a-zA-Z]+)(\d+)/m;

  const match = cleanedInput.match(regex);

  if (!match) {
    return null;
  }

  return {
    messageType: match[1],
    fromAddress: match[2],
    toAddress: match[3],
    denom: match[4],
    amount: match[5],
  };
}
