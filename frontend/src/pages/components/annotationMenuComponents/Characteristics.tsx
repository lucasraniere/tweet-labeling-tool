interface CharacteristicsProps{
    children: string;
    name: string;
    checked: number;
    textValue: string;
    polarized: number;

    checkHandler: () => void;
    textHandler: (tweet: string) => void;
}

export default function Characteristics(props: CharacteristicsProps) {
    return (
        <div className="columns-3">
            <input checked={props.checked==1 ? true : false} type="checkbox"
            name={props.name} id={props.name} value="yes" className="h-4 w-4"
            onChange={props.checkHandler} disabled={props.polarized==0 ? true : false} />

            <label htmlFor={props.name}> {props.children} </label>
            <textarea onChange={(e) => props.textHandler(e.target.value)}
            value={props.textValue} name="highlight-comment" rows={1} cols={40}
            disabled={props.checked==0 ? true : false}
            style={{opacity: `${props.checked==1 ? 1 : 0.4}`}} />
        </div>
    )
}