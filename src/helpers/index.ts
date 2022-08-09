export const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const url = reader.result;
            if (typeof url === "string") {
                resolve(url);
            } else {
                reject(`${typeof url} is not expected for data URL`);
            }
        };
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file);
    });
}

export const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (event) => reject(event);
        image.src = url;
    });
}

export const createCanvasFromImage = (image: HTMLImageElement): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    if (context == null)
        throw new Error("Unable to get 2d context from canvas");
    context.drawImage(image, 0, 0);

    return canvas;
};