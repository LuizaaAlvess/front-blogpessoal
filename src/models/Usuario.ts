import type Postagem from "./Postagem";

export default interface Uusario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    postagem?: Postagem[] | null;
}