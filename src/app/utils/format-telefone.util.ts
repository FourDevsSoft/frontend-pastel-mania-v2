export function formatarNumeroTelefone(valor: string): string {
  let numeroLimpo = valor.replace(/\D/g, ''); // Remove tudo que não for dígito

  // Limita o tamanho máximo do número (11 dígitos = DDD + 9 dígitos)
  if (numeroLimpo.length > 11) {
    numeroLimpo = numeroLimpo.substring(0, 11);
  }

  if (numeroLimpo.length <= 10) {
    // Formato para números com 10 dígitos (ex: fixo)
    numeroLimpo = numeroLimpo.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else {
    // Formato para números com 11 dígitos (ex: celular com 9 dígitos)
    numeroLimpo = numeroLimpo.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})$/, '($1) $2 $3-$4');
  }

  return numeroLimpo.trim().replace(/-$/, ''); // Remove hífen no fim, se tiver
}
