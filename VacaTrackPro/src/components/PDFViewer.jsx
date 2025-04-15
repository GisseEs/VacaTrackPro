import React, { useEffect, useRef } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PDFViewer = ({ contenido, visible }) => {
    const iframeRef = useRef();
    const FONT_SIZE = 12;  
    const LEFT_MARGIN = 50;
    const BOTTOM_MARGIN = 50;
    const LINE_HEIGHT = FONT_SIZE * 1.2;  

    useEffect(() => {
        if (!visible || !contenido) return;

        const generatePdf = async () => {  
            try {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();
                const font = await pdfDoc.embedFont(StandardFonts.Helvetica); 
                const RIGHT_MARGIN = width - LEFT_MARGIN;
                const TEXT_WIDTH = RIGHT_MARGIN - LEFT_MARGIN;

                const drawTextOptions = { 
                    x: LEFT_MARGIN,
                    size: FONT_SIZE,
                    font,
                    color: rgb(0, 0, 0),
                };

                let currentY = height - BOTTOM_MARGIN;
                const lines = contenido.split('\n');

                for (const line of lines) {
                    let currentLine = '';
                    const words = line.split(' ');

                    for (let i = 0; i < words.length; i++) {
                        const word = words[i] + ' ';
                        const testLine = currentLine + word;
                        const lineWidth = font.widthOfTextAtSize(testLine, FONT_SIZE);

                        if (lineWidth > TEXT_WIDTH && currentLine !== '') {
                            page.drawText(currentLine, { ...drawTextOptions, y: currentY });
                            currentY -= LINE_HEIGHT;
                            currentLine = word;
                        } else {
                            currentLine = testLine;
                        }
                    }
                    page.drawText(currentLine, { ...drawTextOptions, y: currentY });
                    currentY -= LINE_HEIGHT;
                }


                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                if (iframeRef.current) iframeRef.current.src = url;

            } catch (error) {
                console.error("Error generating PDF:", error);  
            }
        };

        generatePdf();

    }, [contenido, visible]);

    if (!visible) return null;

    return (
        <div className="w-full h-[600px] border mt-4">
            <iframe ref={iframeRef} title="Vista previa PDF" className="w-full h-full" />
        </div>
    );
};

export default PDFViewer;