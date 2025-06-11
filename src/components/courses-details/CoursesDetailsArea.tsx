import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const API_URL = import.meta.env.VITE_API_URL;

interface Course {
    id: number;
    title: string;
    description: string;
    video: {
        url: string;
        name: string;
    };
    quizzes: {
        id: number;
        title: string;
        questions: {
            id: number;
            questionText: string;
            answers: {
                id: number;
                text: string;
                isCorrect: boolean;
            }[];
        }[];
    }[];
}

const CoursesDetailsArea = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [activeTab, setActiveTab] = useState("course");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const query = qs.stringify({
                    populate: {
                        video: true,
                        quizzes: {
                            populate: {
                                questions: {
                                    populate: "answers",
                                },
                            },
                        },
                    },
                });

                const res = await axios.get(`${API_URL}/api/courses/${id}?${query}`);
                setCourse(res.data.data.attributes);
            } catch (err) {
                console.error("Error fetching course details:", err);
            }
        };

        fetchCourse();
    }, [id]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{course?.title || "Loading..."}</h1>

            <div className="flex border-b mb-6">
                {["course", "curriculum", "quiz"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition duration-200 ${activeTab === tab
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "course" ? "Course Info" : tab === "curriculum" ? "Curriculum" : "Quiz"}
                    </button>
                ))}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                {activeTab === "course" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700 whitespace-pre-line">{course?.description}</p>
                    </div>
                )}

                {activeTab === "curriculum" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Course Video</h2>
                        {course?.video?.url ? (
                            <video
                                src={`${API_URL}${course.video.url}`}
                                controls
                                className="w-full rounded shadow"
                            />
                        ) : (
                            <p className="text-gray-500">No video available.</p>
                        )}
                    </div>
                )}

                {activeTab === "quiz" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Quiz</h2>
                        {course?.quizzes.length ? (
                            course.quizzes.map((quiz) => (
                                <div key={quiz.id} className="mb-6 border p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-bold mb-2">{quiz.title}</h3>
                                    {quiz.questions.map((q) => (
                                        <div key={q.id} className="mb-4">
                                            <p className="font-medium">{q.questionText}</p>
                                            <ul className="list-disc pl-5 text-gray-700 mt-1">
                                                {q.answers.map((a) => (
                                                    <li
                                                        key={a.id}
                                                        className={a.isCorrect ? "text-green-600 font-semibold" : ""}
                                                    >
                                                        {a.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No quizzes available.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6">
                <Link
                    to="/dashboard"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default CoursesDetailsArea;
