import moment from "moment";
import React from "react";

const Break = ({
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreakLengthByOneMinute,
}) => {
    const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();
    return (
        <div className={"flex flex-col items-center"}>
            <p className={"text-black-400"} id={"break-label"}>{`Break`}</p>
            <p className={"text-purple-700 text-5xl"} id={"break-length"}>
                {breakLengthInMinutes}
            </p>
            <div className={"flex"}>
                <button
                    className={
                        "mt-2 text-lg text-gray-800 px-4 py-1 bg-blue-500 rounded mr-2"
                    }
                    type={"button"}
                    id={"break-decrement"}
                    onClick={decrementBreakLengthByOneMinute}>
                    {`-`}
                </button>
                <button
                    className={
                        "mt-2 text-lg text-gray-800 px-4 py-1 bg-blue-500 rounded"
                    }
                    type={"button"}
                    id={"break-increment"}
                    onClick={incrementBreakLengthByOneMinute}>
                    {`+`}
                </button>
            </div>
        </div>
    );
};

export default Break;