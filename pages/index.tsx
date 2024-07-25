import { useState } from 'react';

interface SessionResult {
    input: number;
    result: number;
    duration: number;
}

const Home = () => {
    const [number, setNumber] = useState<number | undefined>(undefined);
    const [result, setResult] = useState<string>('');
    const [sessionResults, setSessionResults] = useState<SessionResult[]>([]);

    const checkNumber = async () => {
        if (number !== undefined) {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: number })
            });
            const data = await response.json();
            setResult(`Lucas Number: ${data.result}, Calculation Time: ${data.duration.toFixed(6)} seconds`);

            // セッション結果を追加
            setSessionResults(prev => [...prev, {
                input: number,
                result: data.result,
                duration: data.duration
            }]);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <h1>Ts Lucas Number</h1>
                <input
                    type="number"
                    value={number !== undefined ? number : ''}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                    placeholder="Enter a number"
                />
                <button onClick={checkNumber}>Check</button>
                <p id="result">{result}</p>
            </div>
            <div style={{ flex: 1 }}>
                <h2>Session Results</h2>
                <ul>
                    {sessionResults.map((session, index) => (
                        <li key={index}>
                            Input: {session.input},
                            Result: {session.result},
                            Time: {session.duration.toFixed(6)} seconds
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
