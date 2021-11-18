import React, {useState, useEffect, useRef} from "react";
import Break from "./components/break";
import Session from "./components/session";
import TimeLeft from "./components/timeleft";
import './styles/output.css'

function App() {
    const audioElement = useRef(null);
    const [currentSessionType, setCurrentSessionType] = useState("session");
    const [intervalId, setIntervalId] = useState(null);
    const [sessionLength, setSessionLength] = useState(60 * 25);
    const [breakLength, setBreakLength] = useState(300);
    const [timeLeft, setTimeLeft] = useState(sessionLength);
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);
    useEffect(() => {
        if (timeLeft === 0) {
            audioElement.current.play();
            if (currentSessionType === "session") {
                setCurrentSessionType("break");
                setTimeLeft(breakLength);
            } else if (currentSessionType === "break") {
                setCurrentSessionType("session");
                setTimeLeft(sessionLength);
            }
        }
    }, [breakLength, currentSessionType, sessionLength, timeLeft]);
    const decrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength - 60;
        if (newBreakLength > 0) {
            setBreakLength(newBreakLength);
        }
    };
    const incrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength + 60;
        if (newBreakLength <= 60 * 60) {
            setBreakLength(newBreakLength);
        }
    };
    const decrementSessionLengthByOneMinute = () => {
        const newSessionLength = sessionLength - 60;
        if (newSessionLength > 0) {
            setSessionLength(newSessionLength);
        }
    };
    const incrementSessionLengthByOneMinute = () => {
        const newSessionLenght = sessionLength + 60;
        if (newSessionLenght <= 60 * 60) {
            setSessionLength(sessionLength + 60);
        }
    };
    const isStarted = intervalId != null;
    const handleStartStopClick = () => {
        if (isStarted) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            //stop mode decrement every second
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
            setIntervalId(newIntervalId);
        }
    };
    const handleResetButtonClick = () => {
        //reset audio object
        audioElement.current.load();
        //clear the timeout interval
        clearInterval(intervalId);
        //set the interval null
        setIntervalId(null);
        //set the sessiontype to "session"
        setCurrentSessionType("session");
        //reset the session length to 25 minutes
        setSessionLength(60 * 25);
        //reset the break lenght to 5 minutes
        setBreakLength(60 * 5);
        //reset the time to 25 minutes (initial session)
        setTimeLeft(60 * 25);
    };
    return (
        <div
            className={
                "flex flex-col h-screen items-center justify-center bg-blue-300"
            }>
            <div className={"flex w-full justify-evenly"}>
                <Break
                    breakLength={breakLength}
                    decrementBreakLengthByOneMinute={
                        decrementBreakLengthByOneMinute
                    }
                    incrementBreakLengthByOneMinute={
                        incrementBreakLengthByOneMinute
                    }
                />
                <TimeLeft
                    handleStartStopClick={handleStartStopClick}
                    timerLabel={currentSessionType}
                    startStopButtonLabel={isStarted ? "stop" : "start"}
                    timeLeft={timeLeft}
                />
                <Session
                    sessionLength={sessionLength}
                    decrementSessionLengthByOneMinute={
                        decrementSessionLengthByOneMinute
                    }
                    incrementSessionLengthByOneMinute={
                        incrementSessionLengthByOneMinute
                    }
                />
            </div>
            <button
                className={
                    "text-lg text-gray-800 px-5 py-1 bg-green-500 rounded shadow-xl"
                }
                type={"button"}
                id={"reset"}
                onClick={handleResetButtonClick}>
                {`reset`}
            </button>
            <audio id={"beep"} ref={audioElement}>
                <source
                    src={"https://onlineclock.net/audio/options/default.mp3"}
                    type={"audio/mpeg"}
                />
            </audio>
        </div>
    );
}

export default App;