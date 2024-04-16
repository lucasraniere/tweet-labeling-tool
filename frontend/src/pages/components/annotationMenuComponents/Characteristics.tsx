interface CharacteristicsProps{
    children: string;
    name?: string;
}

export default function Characteristics(props: CharacteristicsProps) {
    return (
        <div className="columns-3">
            <input type="checkbox" name={props.name} value="yes" className="h-4 w-4" />
            <label htmlFor={props.name}> {props.children} </label>
            <textarea name="highlight-comment" rows={1} cols={40}></textarea>
        </div>
    )
}