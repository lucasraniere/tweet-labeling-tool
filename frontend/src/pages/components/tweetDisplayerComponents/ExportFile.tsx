export default function ExportFile() {
    const exportDB = async () => {
        await fetch("http://localhost:5000/export_parquet").then(() =>
            console.log("Arquivo parquet criado com sucesso!")
        )
    }

    return (
        <div>
            <button onClick={exportDB}>Exportar DB</button>
        </div>
    )
}