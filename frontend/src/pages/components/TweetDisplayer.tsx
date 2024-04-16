import ExportFile from "./tweetDisplayerComponents/ExportFile";
import TextDisplay from "./tweetDisplayerComponents/TextDisplay";
import TweetNavigation from "./tweetDisplayerComponents/TweetNavigation";

// interface TweetDisplayerProps {
//     tweet: string;
// }

export default function TweetDisplayer(props: any) {
    return (
        <div className="h-full w-full p-4 m-3 float-left align-middle space-y-20">
            <TextDisplay tweet={props.tweet} />
            <TweetNavigation />
            <ExportFile />
        </div>
    )
}