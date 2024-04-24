import ExportFile from "./tweetDisplayerComponents/ExportFile";
import TextDisplay from "./tweetDisplayerComponents/TextDisplay";
import TweetNavigation from "./tweetDisplayerComponents/TweetNavigation";

interface TweetDisplayerProps {
    tweet: string;
    currentId: number;
    prevButton: () => void;
    nextButton: () => void;
    goToNext: () => void;
    goToId: (id: number) => void;
}

export default function TweetDisplayer(props: TweetDisplayerProps) {
    return (
        <div className="h-full w-full p-4 m-3 float-left align-middle space-y-20">
            <TextDisplay tweet={props.tweet} id={props.currentId} />
            <TweetNavigation prevButton={props.prevButton}
                nextButton={props.nextButton}
                goToNext={props.goToNext}
                goToId={props.goToId}
                />
            <ExportFile />
        </div>
    )
}