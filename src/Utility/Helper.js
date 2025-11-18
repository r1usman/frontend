import html2canvas from "html2canvas";
import moment from "moment";

export const formatYearMonth = (yearMonth) =>
  yearMonth ? moment(yearMonth).format("Do MMM YYYY") : "";

(function patchGetComputedStyle() {
  const original = window.getComputedStyle;
  window.getComputedStyle = function patchedGetComputedStyle(
    element,
    pseudoElt
  ) {
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

export const getToastMessagesByType = (type) => {
  switch (type) {
    case "edit":
      return "Blog post updated successfully!";
    case "draft":
      return "Blog post saved as draft successfully!";
    case "published":
      return "Blog post published successfully!";
    default:
      return "Blog post published successfully!";
  }
};



export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    // Check if imageUrl is valid
    if (!imageUrl || typeof imageUrl !== 'string') {
      return reject(new Error('Invalid image URL'));
    }

    const img = new Image();

    // Set crossOrigin for non-base64 images to avoid CORS issues
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];

        const brightness = (red + green + blue) / 3;

        // Only consider bright pixels
        if (brightness > 180) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      if (count === 0) {
        resolve('#ffffff'); // fallback
      } else {
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgb(${r}, ${g}, ${b})`);
      }
    };

    img.onerror = (e) => {
      console.error('Failed to load image:', e);
      reject(new Error('Image could not be loaded or is blocked by CORS.'));
    };
  });
};

export const sanitizeMarkdown = (content) => {
  // console.log("content_ sanitizeMarkdown", content);

  const markdownBlockRegex = /^```(?:markdown)?\n([\s\S]*?)\n```$/m;
  const match = content.match(markdownBlockRegex);
  console.log("match", match);

  return match ? match[1] : content;
};
