export default function MetaData() {
    return (
        <div>
            <span className="mx-3">Destaque: </span>
            <input type="checkbox" name="highlight" value="yes" className="h-4 w-4 mx-3" />
            <span className="mx-3">Não muito bom: </span>
            <input type="checkbox" name="quality" value="yes" className="h-4 w-4 mx-3" />
        </div>
    )
}