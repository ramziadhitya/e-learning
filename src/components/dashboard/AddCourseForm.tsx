import React, { useState, useEffect } from "react";
import axios from "axios";






const AddCourseForm = ({ onBack }: { onBack: () => void }) => {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        category: "",
        rating: "0",
        thumbnail: "",
        studentsCount: "0",
        price: "0",
        language: "",
        duration: "",
        level: "Beginner",
        certification: false,
        video: "",
        quizzes: [] as number[],
        instructor: "",
    });

    const levels = ["Beginner", "Intermediate", "Advanced"];
    const [instructors, setInstructors] = useState<{ id: number; username: string }[]>([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setInstructors(res.data); // tidak ada filter
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };

        fetchInstructors();
    }, []);




    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const name = target.name;
        let value: string | boolean = target.value;

        if (target instanceof HTMLInputElement) {
            if (target.type === "checkbox") {
                value = target.checked;
            } else if (target.type === "file" && target.files?.length) {
                const file = target.files[0];
                if (name === "thumbnail") {
                    setThumbnailFile(file);
                } else if (name === "video") {
                    setVideoFile(file);
                }
                return; // Don't update formData directly for file input
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuizzesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ids = e.target.value
            .split(",")
            .map((id) => parseInt(id.trim()))
            .filter((id) => !isNaN(id));

        setFormData((prev) => ({
            ...prev,
            quizzes: ids,
        }));
    };

    const uploadFile = async (file: File): Promise<number> => {
        try {
            const data = new FormData();
            data.append("files", file);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, data);
            return res.data[0].id;
        } catch (err: any) {
            console.error("Upload error:", err.response?.data || err.message);
            throw err;
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let thumbnailId = null;
            let videoId = null;

            if (thumbnailFile) {
                thumbnailId = await uploadFile(thumbnailFile);
            }
            if (videoFile) {
                videoId = await uploadFile(videoFile);
            }

            const payload = {
                data: {
                    title: formData.title,
                    slug: formData.slug,
                    description: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    text: formData.description,
                                },
                            ],
                        },
                    ],
                    category: formData.category,
                    rating: parseFloat(formData.rating),
                    studentsCount: parseInt(formData.studentsCount),
                    price: parseFloat(formData.price),
                    language: formData.language,
                    duration: formData.duration,
                    level: formData.level,
                    certification: formData.certification,
                    thumbnail: thumbnailId,
                    video: videoId,
                    quizzes: formData.quizzes,
                    instructor: parseInt(formData.instructor),
                },
            };



            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/courses`, payload);
            console.log("Course added:", res.data);
            alert("Course added successfully!");
            onBack();
        } catch (error: any) {
            console.error("Failed to submit:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    ["title", "Course Title"],
                    ["slug", "Slug (unique identifier)"],
                    ["category", "Category"],
                    ["language", "Language"],
                    ["duration", "Duration (e.g. 4 weeks)"],
                ].map(([name, label]) => (
                    <div key={name}>
                        <label className="block text-sm font-medium mb-1">{label}</label>
                        <input
                            type="text"
                            name={name}
                            value={formData[name as keyof typeof formData] as string}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-400"
                            required={name === "title" || name === "slug"}
                            placeholder={label}
                        />
                    </div>
                ))}

                {/* File Upload Inputs */}
                <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail</label>
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Video</label>
                    <input
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-400"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-400"
                        placeholder="Describe the course content..."
                    />
                </div>

                {/* Number Inputs */}
                {[
                    ["rating", "Rating (1–5)"],
                    ["studentsCount", "Students Count"],
                    ["price", "Price (in USD)"],
                ].map(([name, label]) => (
                    <div key={name}>
                        <label className="block text-sm font-medium mb-1">{label}</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            name={name}
                            value={formData[name as keyof typeof formData] as string}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-400"
                            placeholder={label}
                        />
                    </div>
                ))}

                {/* Select Level */}
                <div>
                    <label className="block text-sm font-medium mb-1">Level</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-white text-black"
                    >
                        {levels.map((lvl) => (
                            <option key={lvl} value={lvl}>
                                {lvl}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Certification */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="certification"
                        checked={formData.certification}
                        onChange={handleChange}
                        className="form-checkbox"
                    />
                    <label className="text-sm font-medium">Provides Certification</label>
                </div>

                {/* Quizzes */}
                <div>
                    <label className="block text-sm font-medium mb-1">Quiz IDs (comma-separated)</label>
                    <input
                        type="text"
                        onChange={handleQuizzesInput}
                        placeholder="e.g. 1,2,3"
                        className="w-full px-3 py-2 border rounded bg-white text-black placeholder-gray-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Instructor</label>
                    <select
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded bg-white text-black"
                        required
                    >
                        <option value="">Select Instructor</option>
                        {instructors.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCourseForm;