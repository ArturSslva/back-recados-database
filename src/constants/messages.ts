export const defaultErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
export const fillFields = 'Preencha todos os campos.';
export const fieldsLength = (field: string, amount: string, length: number) => {
    const message = { message: `${field} deve conter no ${amount} ${length} caracteres.` }

    return message
}