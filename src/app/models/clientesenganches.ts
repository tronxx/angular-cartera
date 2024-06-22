import { Cliente } from "./clientes"; 
export interface Clienteenganche extends Cliente {
    timbrado: string;
    factimbre: number;
    uuidfactimbre: string;
}
