interface TextDisplayProps {
    tweet: string;
}

export default function TextDisplay(props: TextDisplayProps) {
    return (
        <div>
            <p>Tweet:</p>
            <textarea id='current-tweet' name='tweet-displayer'
            rows={10} cols={60} readOnly value={props.tweet} />
        </div>
    )
}