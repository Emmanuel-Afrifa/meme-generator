import React from "react";

export default function ImageCanvas(props){
    const canvasRef = React.useRef(null);

    React.useEffect(() =>
        {
            //  creating the image
            const img = new Image();
            img.src = props.meme.randomImage;
            

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
             
            
            // function wrapText(ctx, text, x, y, lineheight, maxwidth){
            //     const words = text.split(" ");
            //     let line = '';
            //     let lineArray = [];
                
            //     for (let i = 0; i<words.length; i++){
            //         const lineText = line + words[i] + ' ';
            //         let lineTextWidth = ctx.measureText(lineText).width;



            //         if (lineTextWidth > maxwidth && i > 0){
            //             lineArray.push(line);
            //             line = words[i] + ' ';
            //         }
            //         else {
            //             line = lineText;
            //         }
            //         ctx.fillText(line, x, y);
            //     }
            //     lineArray.push(line)

            //     for (let k = 0; k < lineArray.length; k++) {
            //         ctx.fillText(lineArray[k], x, y + (k * lineheight));
            //     }
            // }
    
            img.onload = () => {
                canvas.height = Math.ceil((img.naturalHeight * canvas.clientWidth) / img.naturalWidth) + 10;
                ctx.drawImage(img, 0,0, canvas.width, canvas.height);
                ctx.font = "1em impact"
                ctx.shadowOffsetY = 5;
                ctx.shadowOffsetX = 5;
                ctx.textAlign = 'center';
                ctx.shadowBlur = 5;
                ctx.fillStyle = "white";
                const x = canvas.width / 2;
                const y_up = 40;
                const y_down = canvas.height - 20;
                // wrapText(ctx, props.meme.topText.toUpperCase(), x, y_up, 10, 430)
                // wrapText(ctx, props.meme.bottomText.toUpperCase(), x, y_down, 10, 430)
                ctx.fillText(props.meme.topText.toUpperCase(), x, y_up)
                ctx.fillText(props.meme.bottomText.toUpperCase(), x, y_down)

            }
        },
        [props.meme]
    )

    return (
        <canvas className="mc" ref={canvasRef}></canvas>
    )
    
}