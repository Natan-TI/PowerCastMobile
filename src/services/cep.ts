export async function getBairroFromCep(cep: string): Promise<string | null> {
  // Remove tudo que não for dígito (por ex. “12345-678” → “12345678”)
  const onlyDigits = cep.replace(/\D/g, '');
  if (!/^\d{8}$/.test(onlyDigits)) {
    return null; // não é CEP válido
  }

  try {
    const resp = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
    if (!resp.ok) return null;
    const data = await resp.json();
    // ViaCEP retorna {   bairro: "...", ...   }
    return data.bairro || null;
  } catch {
    return null;
  }
}
