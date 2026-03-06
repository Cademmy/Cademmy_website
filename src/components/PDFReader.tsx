import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import './PDFReader.css';

// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Establecer el worker de forma robusta globalmente
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PDFReaderProps {
    url: string;
    onComplete?: () => void;
}

const PDFReader: React.FC<PDFReaderProps> = ({ url, onComplete }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isFlipping, setIsFlipping] = useState(false);
    const [highlights, setHighlights] = useState<{ x: number, y: number, w: number, h: number, page: number }[]>([]);
    const [isHighlighting, setIsHighlighting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const loadPdf = async () => {
            if (!url) return;
            try {
                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;
                setNumPages(pdf.numPages);
                renderPageWithHighlights(pdf, pageNumber);
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };
        loadPdf();
    }, [url, highlights, pageNumber]);

    const renderPageWithHighlights = async (pdf: any, pgNum: number) => {
        const page = await pdf.getPage(pgNum);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;

        // Draw highlights for this page
        highlights.filter(h => h.page === pgNum).forEach(h => {
            context.fillStyle = 'rgba(255, 255, 0, 0.4)';
            context.fillRect(h.x, h.y, h.w, h.h);
        });
    };

    const changePage = async (offset: number) => {
        const newPage = pageNumber + offset;
        if (newPage >= 1 && newPage <= numPages) {
            setIsFlipping(true);
            setPageNumber(newPage);
            setTimeout(() => setIsFlipping(false), 600);
        }
    };

    const addHighlight = () => {
        setIsHighlighting(!isHighlighting);
        if (!isHighlighting) {
            alert("Haz clic en el PDF para simular un subrayado.");
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isHighlighting) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Map viewport coords to canvas coords
        const scaleX = canvasRef.current!.width / rect.width;
        const scaleY = canvasRef.current!.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setHighlights([...highlights, { x: x - 50, y: y - 10, w: 100, h: 20, page: pageNumber }]);
        setIsHighlighting(false);
    };

    return (
        <div className="pdf-reader-container glass-morphism" ref={containerRef}>
            <div className="pdf-toolbar">
                <div className="page-nav">
                    <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>◀ Anterior</button>
                    <span>Página {pageNumber} de {numPages}</span>
                    <button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>Siguiente ▶</button>
                </div>
                <div className="reader-tools">
                    <button onClick={addHighlight} className={`btn-tool ${isHighlighting ? 'active' : ''}`}>
                        {isHighlighting ? '✏️ Marcando...' : '🖍️ Subrayar'}
                    </button>
                    <button onClick={() => alert("Anotación guardada")} className="btn-tool">📝 Anotar</button>
                    <button onClick={onComplete} className="complete-btn brand-gradient">Terminar Lectura</button>
                </div>
            </div>

            <div className={`pdf-viewport ${isFlipping ? 'flipping' : ''}`}>
                <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    style={{ cursor: isHighlighting ? 'crosshair' : 'default' }}
                ></canvas>
            </div>

            <div className="ocean-blue-tip reader-footer">
                💡 Tip de Aprendizaje: Subrayar los conceptos clave mejora la retención en un 30%.
            </div>
        </div>
    );
};

export default PDFReader;
