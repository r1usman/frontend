import html2canvas from "html2canvas";
import moment from "moment";

export const formatYearMonth = (yearMonth) =>
    yearMonth ? moment(yearMonth).format("Do MMM YYYY") : "";

(function patchGetComputedStyle() {
    const original = window.getComputedStyle;
    window.getComputedStyle = function patchedGetComputedStyle(element, pseudoElt) {
        const style = original(element, pseudoElt);
        const proxy = new Proxy(style, {
            get(target, prop) {
                const value = target[prop];

                if (typeof value === "string" && value.includes("oklch")) {

                    return "#e5e7eb";
                }

                return typeof value === "function" ? value.bind(target) : value;
            },
        });
        return proxy;
    };
})();


// --- Capture Element as Image ---
export async function captureElementAsImage(element) {
    if (!element) throw new Error("No element provided");

    try {
        const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
            logging: false,
            backgroundColor: "#ffffff",
        });

        return canvas.toDataURL("image/png");
    } catch (err) {
        console.error("Error capturing image with html2canvas:", err);
        throw err;
    }
}

// --- Convert Data URL to File ---
export const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], fileName, { type: mime });
};
