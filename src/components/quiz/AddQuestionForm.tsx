import { useState } from "react";
import axios from "axios";

export default function AddQuestionForm() {
    const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("multiple-choice");
    const [quizId, setQuizId] = useState<number | null>(null);
    const [answerIdsInput, setAnswerIdsInput] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!quizId) {
            alert("Please enter a quiz ID.");
            return;
        }

        // Ubah string ke array of number
        const selectedAnswerIds = answerIdsInput
            .split(",")
            .map((id) => parseInt(id.trim()))
            .filter((id) => !isNaN(id));

        try {
            const payload = {
                data: {
                    questionText,
                    questionType,
                    quiz: quizId,
                    answers: selectedAnswerIds,
                },
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/questions`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Question added successfully!");

            // Reset form
            setQuestionText("");
            setQuestionType("multiple-choice");
            setQuizId(null);
            setAnswerIdsInput("");
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question.");
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-black">Add New Question</h2>

            <input
                type="text"
                className="block border border-gray-300 rounded p-2 mb-3 w-full bg-white text-black"
                placeholder="Question Text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
            />

            <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="block border border-gray-300 rounded p-2 mb-3 w-full bg-white text-black"
            >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
            </select>

            <input
                type="number"
                className="block border border-gray-300 rounded p-2 mb-3 w-full bg-white text-black"
                placeholder="Enter Quiz ID (e.g., 3)"
                value={quizId ?? ""}
                onChange={(e) => setQuizId(parseInt(e.target.value))}
            />

            <input
                type="text"
                className="block border border-gray-300 rounded p-2 mb-4 w-full bg-white text-black"
                placeholder="Enter Answer IDs (comma separated, e.g., 1,2,3)"
                value={answerIdsInput}
                onChange={(e) => setAnswerIdsInput(e.target.value)}
            />

            <button
                className="px-4 py-2 bg-green-600 text-black rounded shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                onClick={handleSubmit}
            >
                Save Question
            </button>
        </div>
    );
}
