export default function MetaData() {
    return (
        <div>
            <label htmlFor="highlight" className="mx-3">Destaque: </label>
            <input id="highlight" type="checkbox" name="highlight" value="yes" className="h-4 w-4 mx-3" />
            <label htmlFor="quality" className="mx-3">Não muito bom: </label>
            <input id="quality" type="checkbox" name="quality" value="yes" className="h-4 w-4 mx-3" />
        </div>
    )
}