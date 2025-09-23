// src/app/utils/crypto-util.ts
export async function generateKey(timestamp: string): Promise<string> {
  const SECRET_KEY = 'g3z35#HSP#eeXU'; 

  const encoder = new TextEncoder();

  const keyData = encoder.encode(SECRET_KEY); // chave secreta
  const messageData = encoder.encode(timestamp); // timestamp como mensagem

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}
