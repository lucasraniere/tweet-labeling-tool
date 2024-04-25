interface PolarizedProps {
    polarized: number;
    polarizedHandler: () => void;
}

export default function Polarized(props: PolarizedProps) {
    return (
        <div>
            <label htmlFor="polarized" className="mx-3">Polarizado: </label>
            <input checked={props.polarized==1 ? true : false}
            onChange={props.polarizedHandler}
            id="polarized" type="checkbox" className="w-4 h-4 mx-3" />
        </div>
    )
}