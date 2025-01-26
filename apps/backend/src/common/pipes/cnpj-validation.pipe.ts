import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateCnpjPipe implements PipeTransform {
    transform(value: { institution: { cnpj: string } }) {
        if (!value?.institution?.cnpj) {
            throw new BadRequestException('CNPJ não informado');
        }

        const cnpj = value.institution.cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (!this.isValidCnpj(cnpj)) {
            throw new BadRequestException('CNPJ inválido');
        }

        return value; // Retorna os dados se forem válidos
    }

    private isValidCnpj(cnpj: string): boolean {
        if (cnpj.length !== 14) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) return false;

        // Cálculo dos dígitos verificadores
        const calcDigit = (cnpj: string, pos: number): number => {
            let size = pos - 7;
            let sum = 0;
            let digit;

            for (let i = pos; i >= 1; i--) {
                digit = parseInt(cnpj.charAt(pos - i), 10);
                sum += digit * size--;
                if (size < 2) size = 9;
            }

            const result = sum % 11;
            return result < 2 ? 0 : 11 - result;
        };

        const firstDigit = calcDigit(cnpj, 12);
        const secondDigit = calcDigit(cnpj, 13);

        return (
            firstDigit === parseInt(cnpj.charAt(12), 10) &&
            secondDigit === parseInt(cnpj.charAt(13), 10)
        );
    }
}
