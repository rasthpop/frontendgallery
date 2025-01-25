import { createCanvas, loadImage } from 'canvas';
import React, {useEffect} from 'react';

const MALE_LAYER_ORDER = ["Background", "Back", "Skin", "Clothing", "Eyes", "Accessories", "Hair", "Mouth"];
const FEMALE_LAYER_ORDER = ["Background", "Skin", "Eyes", "Hair", "Clothing", "Mouth"];

const EYES_ABOVE_HAIR = new Set(["Flame Eyes", "Electric Eyes", "Flame", "Female Flame", "Female Electric"]);
const MOUTH_BELOW_CLOTHING = new Set(["Mask", "Mask II"]);

function adjustLayerOrder(attributes, baseOrder) {
    const adjustedOrder = [...baseOrder];

    if (EYES_ABOVE_HAIR.has(attributes["Eyes"])) {
        const eyeIndex = adjustedOrder.indexOf("Eyes");
        const hairIndex = adjustedOrder.indexOf("Hair");

        if (eyeIndex !== -1) adjustedOrder.splice(eyeIndex, 1);
        adjustedOrder.splice(hairIndex + 1, 0, "Eyes");
    }

    if (MOUTH_BELOW_CLOTHING.has(attributes["Mouth"])) {
        const mouthIndex = adjustedOrder.indexOf("Mouth");
        const clothingIndex = adjustedOrder.indexOf("Clothing");

        if (mouthIndex !== -1) adjustedOrder.splice(mouthIndex, 1);
        adjustedOrder.splice(clothingIndex, 0, "Mouth");
    }

    return adjustedOrder;
}
 
async function generateSingleNft(attributes, gender = "male") {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    const layersDir = gender === "male" ? "Male" : "Female";
    const layerOrder = gender === "male" ? MALE_LAYER_ORDER : FEMALE_LAYER_ORDER;

    const adjustedOrder = adjustLayerOrder(attributes, layerOrder);

    for (const layer of adjustedOrder) {
        if (attributes[layer] && attributes[layer] !== "None") {
            const layerPath = `../public/${layersDir}/${layer}/${attributes[layer]}.png`;

            try {
                const layerImage = await loadImage(layerPath);
                ctx.drawImage(layerImage, 0, 0, 500, 500);
            } catch (error) {
                console.error(`Error loading image from path: ${layerPath}`, error);
            }
        }
    }
    

    return canvas.toDataURL('image/png');
}

export function NftGenerator({ attributes, gender }) {
    const [nftImage, setNftImage] = React.useState(null);

    function savePng(){

    }

    useEffect(() => {
        async function generate() {
            const image = await generateSingleNft(attributes, gender);
            setNftImage(image);
        }
        generate();
    }, [attributes, gender]);

    if (!nftImage) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <img src={nftImage} alt="Generated NFT" className='border-4'/>
            <a href={nftImage} download="Shibuyan">
                <button className='mt-10 w-full lg-button'>Save PNG</button>
            </a>
        </div>
    )
}
