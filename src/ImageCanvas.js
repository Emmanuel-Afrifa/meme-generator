import React from "react";

export default function ImageCanvas(props){
    const canvasRef = React.useRef(null);

    React.useEffect(() =>
        {
            //  creating the image
            const img = new Image();
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = props.meme.randomImage;
            

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            function wrapText(context, text, x, y, maxWidth, lineHeight) {
                const words = text.split(' ');
                let line = '';
                let testLine = '';
                let testWidth = 0;
    
                for (let n = 0; n < words.length; n++) {
                    testLine = line + words[n] + ' ';
                    testWidth = context.measureText(testLine).width;
                    if (testWidth > maxWidth && n > 0) {
                        context.fillText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, y);
            }
                 
    
            img.onload = () => {
                canvas.height = Math.ceil((img.naturalHeight * canvas.clientWidth) / img.naturalWidth) + 10;
                ctx.drawImage(img, 0,0, canvas.width, canvas.height);
                ctx.font = "bold 1em impact"
                // ctx.lineWidth = "0";
                ctx.shadowOffsetY = 2;
                ctx.shadowOffsetX = 2;
                ctx.shadowBlur = 1;
                ctx.shadowColor = "black"
                ctx.textAlign = 'center';
                ctx.fillStyle = "white";
                const x = canvas.width / 2;
                const y_up = 20;
                const y_down = canvas.height - 60;
                wrapText(ctx, props.meme.topText.toUpperCase(), x, y_up, 280, 25);
                wrapText(ctx, props.meme.bottomText.toUpperCase(), x, y_down, 280, 25);
            
                // ctx.fillText(props.meme.topText.toUpperCase(), x, y_up)
                // ctx.fillText(props.meme.bottomText.toUpperCase(), x, y_down)

            }

            
        },
        [props.meme]
    )

    function downloadImage(){
        const link = document.createElement("a");
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = "meme-image.png";
        link.click();
    }
    

    return (
        <div>
            <canvas className="mc" ref={canvasRef}></canvas>
            <button className="download-button" onClick={downloadImage}>Download</button>
        </div>
    )
    
}