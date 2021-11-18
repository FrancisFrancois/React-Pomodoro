import moment from "moment";
import React from "react";

const Session = ({
    sessionLength,
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
}) => {
    const sessionLengthInMinutes = moment
        .duration(sessionLength, "s")
        .minutes();
    return (
        <div className={"flex flex-col items-center"}>
            <p className={"text-black-400"} id={"session-label"}>{`Session`}</p>
            <p className={"text-purple-700 text-5xl"} id={"session-length"}>
                {sessionLengthInMinutes}
            </p>
            <div className={"flex"}>
                <button
                    className={
                        "mt-2 text-lg text-gray-800 px-4 py-1 bg-blue-500 rounded mr-2"
                    }
                    type={"button"}
                    id={"session-decrement"}
                    onClick={decrementSessionLengthByOneMinute}>
                    {`-`}
                </button>
                <button
                    className={
                        "mt-2 text-lg text-gray-800 px-4 py-1 bg-blue-500 rounded"
                    }
                    type={"button"}
                    id={"session-increment"}
                    onClick={incrementSessionLengthByOneMinute}>
                    {`+`}
                </button>
            </div>
        </div>
    );
};

export default Session;