/// <reference types="react-scripts" />

type Product = {
    id: number,
    imageUrl: string,
    name: name,
    count: number,
    size: {
        width: number,
        height: number,
    },
    weight: string,
    comments: string[],
}