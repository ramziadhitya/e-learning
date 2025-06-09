import { useState } from "react";
import axios from "axios";

export default function AddQuizForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [courseId, setCourseId] = useState<number | null>(null);
    const [questionIdsInput, setQuestionIdsInput] = useState<string>("");

    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!title || !description || !courseId) {
            alert("Please fill in all required fields.");
            return;
        }

        const questionIds = questionIdsInput
            .split(",")
            .map((id) => parseInt(id.trim()))
            .filter((id) => !isNaN(id));

        const richTextDescription = [
            {
                type: "paragraph",
                children: [
                    {
                        type: "text",
                        text: description,
                    },
                ],
            },
        ];

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/quizzes`,
                {
                    data: {
                        title,
                        description: richTextDescription,
                        course: courseId,
                        questions: questionIds,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Quiz created successfully!");

            setTitle("");
            setDescription("");
            setCourseId(null);
            setQuestionIdsInput("");
        } catch (err: any) {
            console.error("Error creating quiz:", err);
            const msg =
                err?.response?.data?.error?.message ||
                err?.response?.data?.message ||
                "Unknown error.";
            alert("Failed to create quiz. " + msg);
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-bold text-black mb-4">Add New Quiz</h2>

            <input
                type="text"
                className="block border border-gray-300 rounded p-2 mb-2 w-full bg-white text-black"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="block border border-gray-300 rounded p-2 mb-4 w-full bg-white text-black"
                placeholder="Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label className="block mb-1 font-medium text-black">Course ID:</label>
            <input
                type="number"
                className="block border border-gray-300 rounded p-2 mb-4 w-full bg-white text-black"
                placeholder="Enter course ID"
                value={courseId ?? ""}
                onChange={(e) => setCourseId(Number(e.target.value))}
            />

            <label className="block mb-1 font-medium text-black">Question IDs (comma-separated):</label>
            <input
                type="text"
                className="block border border-gray-300 rounded p-2 mb-4 w-full bg-white text-black"
                placeholder="Enter question IDs (e.g., 1,2,3)"
                value={questionIdsInput}
                onChange={(e) => setQuestionIdsInput(e.target.value)}
            />

            <button
                className="px-4 py-2 bg-purple-600 text-black rounded shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                onClick={handleSubmit}
            >
                Save Quiz
            </button>
        </div>
    );
}
