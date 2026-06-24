import { useQuery } from "@tanstack/react-query";
import { AiFillCrown } from "react-icons/ai";

export function MostSavedLessons() {
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lessons/most-saved`,
      );
      return res.data;
    },
  });

  console.log(lessons);

  return (
    <div>
      <div className="flex items-center gap-2 text-purple-600 mb-3 font-medium">
        <AiFillCrown />
        Community Favorites
      </div>

      <h2 className="text-3xl font-bold mb-8">Most Saved Lessons</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson, i) => (
            <a
              href={`/lessons/${lesson._id}`}
              key={lesson._id}
              className="block"
            >
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  {i + 1}
                </div>

                <img
                  src={lesson.image}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{lesson.title}</p>
                  <p className="text-sm text-gray-500">
                    by {lesson.creatorName}
                  </p>
                </div>

                <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {lesson.savesCount || 0} saves
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
