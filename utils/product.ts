export const generateProductImageURL = (url: string, resolution: '50' | '100' | '200' | '500') => {
    if (!url) {
        return undefined;
    }
    if (url.includes('/PRODUCT/image/')) {
        const resolutions = {
            '50': {width: 50, height: 50},
            '100': {width: 100, height: 100},
            '200': {width: 200, height: 200},
            '500': {width: 500, height: 500},
        };

        const splitted = url.split('/image/');
        const imgRes = resolutions[resolution];

        return `${splitted[0]}/image/${imgRes.height}_${imgRes.width}/${splitted[1]}`;
    } else {
        return url;
    }
};