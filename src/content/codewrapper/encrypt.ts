export async function encrypt(data: string, key: string): Promise<string> {
    key = key.padEnd(16, "0");
  
    const dataBuffer = Buffer.from(data);
    const keyBuffer = Buffer.from(key);
  
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC", length: 256 },
      false,
      ["encrypt"]
    );
  
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      dataBuffer
    );
    const combinedData = new Uint8Array(iv.length + encryptedData.byteLength);
    combinedData.set(iv);
    combinedData.set(new Uint8Array(encryptedData), iv.length);
    return Buffer.from(combinedData).toString("base64");
}