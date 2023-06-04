const ProgressBar = ({value}: any) => (
    <div className="w-full bg-twitterBlue rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
            className="bg-twitterBlue h-1.5 rounded-full dark:bg-twitterBlue"
            style={{ width: `${value}%` }}
        ></div>
    </div>
)

export default ProgressBar
