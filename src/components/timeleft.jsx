import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft = ({
    handleStartStopClick,
    startStopButtonLabel,
    timeLeft,
    timeLabel,
}) => {
    //session or break

    const formattedTimeLeft = moment
        .duration(timeLeft, "s")
        .format("mm:ss", {trim: false});
    return (
        <div>
            <p id={"timer-label"}>{timeLabel}</p>
            <p
                className={
                    "text-yellow-300 text-7xl font-black relative bottom-20"
                }
                id={"time-left"}>
                {formattedTimeLeft}
            </p>
            <button
                className={
                    "mt-2 text-lg text-gray-800 px-10 py-4 bg-red-400 rounded shadow-xl flex w-full justify-evenly mb-5"
                }
                type={"button"}
                onClick={handleStartStopClick}>
                {startStopButtonLabel}
            </button>
        </div>
    );
};
export default TimeLeft;