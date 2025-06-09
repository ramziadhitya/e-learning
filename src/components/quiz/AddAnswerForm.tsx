import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
    id: number;
    questionText: string;
}

export default function AddAnswerForm() {
    const [text, setText] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [questionId, setQuestionId] = useState<number | null>(null);
    const [, setQuestions] = useState<Question[]>([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const questionData: Question[] = res.data.data.map((q: any) => ({
                    id: q.id,
                    questionText: q.questionText,
                }));

                setQuestions(questionData);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [token]);

    const handleSubmit = async () => {
        if (!questionId) {
            alert("Please enter a Question ID.");
            return;
        }

        try {
            const payload = {
                data: {
                    text,
                    isCorrect,
                    question: questionId,
                },
            };

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/answers`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Answer added successfully!");

            // Reset form
            setText("");
            setIsCorrect(false);
            setQuestionId(null);
        } catch (error) {
            console.error("Error creating answer:", error);
            alert("Failed to add answer.");
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Add New Answer</h2>

            <input
                type="text"
                className="block border border-gray-300 rounded p-2 mb-3 w-full text-black bg-white"
                placeholder="Answer Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <label className="block mb-4 text-black">
                <input
                    type="checkbox"
                    checked={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                    className="mr-2"
                />
                Correct Answer
            </label>

            <input
                type="number"
                className="block border border-gray-300 rounded p-2 mb-4 w-full text-black bg-white"
                placeholder="Enter Question ID manually"
                value={questionId ?? ""}
                onChange={(e) => setQuestionId(parseInt(e.target.value))}
            />

            <button
                className="px-4 py-2 bg-blue-600 text-black rounded shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                onClick={handleSubmit}
            >
                Save Answer
            </button>
        </div>
    );
}
