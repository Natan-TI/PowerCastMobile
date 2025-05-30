export interface Event {
    id: string;
    local: string;
    tempo: number;
    prejuizos: string;
    data: string;
}

export interface ClimaData {
    temperatura: number;
    umidade: number;
    descricao: string;
    velocidadeVento: number;
}

export interface FalhaData {
    risco: number;
    falhasRecentes: number;
}