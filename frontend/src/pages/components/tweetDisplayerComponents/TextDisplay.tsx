interface TextDisplayProps {
    tweet: string;
    id: number;
}

export default function TextDisplay(props: TextDisplayProps) {
    return (
        <div>
            <p>Tweet {props.id}:</p>
            <textarea id='current-tweet' name='tweet-displayer'
            rows={11} cols={70} readOnly value={props.tweet} />
        </div>
    )
}