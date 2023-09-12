import {useRef, useState} from "react";
import {AiTwotoneSound} from "react-icons/ai";
import {motion} from "framer-motion";

const catalog = {
    whichOneIs: {start: 1, end: 1.43},
    goodJob: {start: 2.6, end: 3.8},
    thatIsNotRight: {start: 3.9, end: 6.3},
    pit: {start: 6.4, end: 7.1},
    tip: {start: 7.3, end: 7.9},
    sit: {start: 8.0, end: 8.6},
    sat: {start: 8.8, end: 9.4},
    be: {start: 9.5, end: 9.9},
    me: {start: 10.1, end: 10.5},
}
const quiz = ['be', 'me', 'sit', 'sat', 'tip', 'pit'];

function playMethod({start, end}: { start: number, end: number }, audio: HTMLAudioElement) {
    return new Promise(resolve => {
        if (start >= 0 && end <= audio.duration && start < end) {
            audio.currentTime = start;
            audio.play();
            // Pause the video when it reaches the end time
            audio.ontimeupdate = function () {
                if (audio.currentTime >= end) {
                    audio.ontimeupdate = null;
                    audio.pause();
                    resolve(true);

                }
            }
        } else {
            alert("Invalid start or end time");
        }
    })
}

function App() {
    const ref = useRef<HTMLAudioElement | null>(null);
    const [audioReady, setAudioReady] = useState(false);
    const [state, setState] = useState<{questions:string[],answer:number}>({
        questions: shuffleArray(quiz).splice(0, 3),
        answer: getAnswer()
    });
    const [score,setScore] = useState<{correct:number,wrong:number}>({correct:0,wrong:0});
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                <h1>Heidi Practice</h1>
                <AiTwotoneSound style={{fontSize:'2rem'}} onClick={async () => {
                    const audio = ref.current;
                    if (audio && audioReady) {
                        await playMethod(catalog.whichOneIs, audio);
                        const answer = state.questions[state.answer];
                        // eslint-disable-next-line
                        await playMethod(((catalog as any)[answer]), audio);
                    }
                }}/>
            </div>
            <div><h1>{score.correct - score.wrong}</h1></div>
            <audio ref={ref} controls onLoadedData={() => setAudioReady(true)} style={{opacity:0}}>
                <source src={import.meta.env.BASE_URL+'/heidi-learn-letter.MP3'} type="audio/mpeg"/>
            </audio>
            <div>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                    {state.questions.map(q => {
                        return <motion.div key={q} style={{display:'flex',fontSize:'3rem',padding:'2rem',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'2rem',background:'#FFF'}} onClick={async() =>{
                            const audio = ref.current;
                            if (audio === null || !audioReady) {
                                return;
                            }
                            const isCorrect = state.questions.indexOf(q) === state.answer;
                            if(isCorrect){
                                setScore(old => ({...old,correct:old.correct+1}));
                                await playMethod(catalog.goodJob, audio);
                                const answer = getAnswer();
                                const questions = shuffleArray(quiz).splice(0,3);
                                setState({questions,answer});
                                await playMethod(catalog.whichOneIs, audio);
                                const answerText = questions[answer];
                                // eslint-disable-next-line
                                await playMethod(((catalog as any)[answerText]), audio);
                            }else{
                                setScore(old => ({...old,wrong:old.wrong+1}));
                                await playMethod(catalog.thatIsNotRight, audio);

                            }
                        }} whileTap={{scale:0.95}}>{q}</motion.div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

function getAnswer() {
    return Math.floor(Math.random() * 3); // Generates 0, 1, or 2
}

function shuffleArray(array:string[]):string[] {
    // Clone the original array to avoid modifying it directly
    const shuffledArray = array.slice();

    // Loop through the array from the end to the beginning
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // Swap the elements at randomIndex and i
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temp;
    }

    return shuffledArray;
}

export default App
