export interface Separador {
    _id?: string;
    nombre: string;
    mapData: MapData;
    [key: string]: any;
}

interface MapData {
    center: {
        lat: number,
        lng: number
    };
    zoom: number;
}

export interface Equipo {
    equipo: Separador;
    __v: number;
}
