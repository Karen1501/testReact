import { useState } from "react";
import '../styles/upload.css'

export default function Upload () {
    const [files, setFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [uploadStatus, setUploadStatus] = useState<string>('')

    const handleDrop = (event:React.DragEvent) => {
        event.preventDefault()
        const newFiles = Array.from(event.dataTransfer.files).filter(
            (file) => file.type.startsWith("image/"),event
        )
        setFiles([...files, ...newFiles])
        setPreviewUrls([...previewUrls, ...newFiles.map((file) => URL.createObjectURL(file))])
    }

    const handleUpload = async () => {
        if(files.length === 0){
            setUploadStatus('No hay imágenes para subir')
            return
        }

        try {
            setUploadStatus('Subiendo imágenes...')

            //Simulación de carga
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setUploadStatus('Imágenes cargadas con éxito')
            setFiles([])
            setPreviewUrls([])
        } catch (error) {
            console.error('Error al cargar imágenes', error)
            setUploadStatus('Error al cargar imágenes')
        }
    }

    return (
        <div className="upload-container">
            <h2>Subir Imágenes</h2>
            <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                Arrastra y suelta aquí tus imágenes
            </div>
            <div className="preview-container">
                {previewUrls.map((url, index) => (
                    <img key={index} src={url} alt={`preview-&{index}`} className="preview-image"></img>
                ))}
            </div>
            {files.length > 0 && <button onClick={handleUpload}>Subir Imágenes</button>}
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    )
}