interface MetaDataProps {
    highlight: number;
    notGood: number;
    highlightHandler: () => void;
    notGoodHandler: () => void;
}

export default function MetaData(props: MetaDataProps) {
    return (
        <div>
            <label htmlFor="highlight" className="mx-3">Destaque: </label>
            <input checked={props.highlight==1 ? true : false} id="highlight"
            onChange={props.highlightHandler} type="checkbox" name="highlight" value="yes" className="h-4 w-4 mx-3" />
            <label htmlFor="quality" className="mx-3">Não muito bom: </label>
            <input checked={props.notGood==1 ? true : false} id="quality"
            onChange={props.notGoodHandler} type="checkbox" name="quality" value="yes" className="h-4 w-4 mx-3" />
        </div>
    )
}