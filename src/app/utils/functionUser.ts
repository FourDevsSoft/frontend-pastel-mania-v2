// src/app/utils/functionUser.ts
export async function functionUser(): Promise<string> {
  try {
    const funcao = localStorage.getItem('funcaoUsuario');
    if (!funcao) {
      throw new Error('Função não encontrada no localStorage.');
    }

    return funcao;
  } catch (error) {
    console.error('Erro ao obter função do usuário:', error);
    return 'Função desconhecida';
  }
}
