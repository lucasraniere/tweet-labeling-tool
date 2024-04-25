interface TweetBiasProps {
    tweetBias: number;
    biasHandler: (bias: number) => void;
}

export default function TweetBias(props: TweetBiasProps) {
    return (
        <div>
            <form className="mx-3">
                <span>Viés do Tweet:</span>
                <label htmlFor="Esquerda" className="mx-3">Esquerda</label>
                <input onChange={() => props.biasHandler(-1)} checked={props.tweetBias===-1 ? true : false} type="radio" id="Esquerda" name="ideology" className="w-4 h-4"/>
                <label htmlFor="Centro" className="mx-3">Centro</label>
                <input onChange={() => props.biasHandler(-0)} checked={props.tweetBias===0 ? true : false} type="radio" id="Centro" name="ideology" className="w-4 h-4" />
                <label htmlFor="Direita" className="mx-3">Direita</label>
                <input onChange={() => props.biasHandler(1)} checked={props.tweetBias===1 ? true : false} type="radio" id="Direita" name="ideology" className="w-4 h-4" />
            </form>
        </div>
    )
}