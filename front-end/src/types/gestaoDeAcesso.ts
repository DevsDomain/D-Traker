export interface PesquisaProps{
    placeholder:string,
    handlePesquisa(typedValue:string) : void
}

export interface PesquisaPapelProps{
    handlePesquisaByPapel(selectedValue:string):void
}