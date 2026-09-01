import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function CoursesPage() {
  const { submitSearch, page, setPage } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ page, limit: 15 });
        // once backend supports it: if (submitSearch) params.append('search', submitSearch);

        const res = await fetch(`http://localhost:3000/api/courses?${params}`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to load courses');
        }

        const data = await res.json();
        setCourses(data.courses);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [page, submitSearch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* ListContainer + ListRow go here once built, mapping over `courses` */}
    </div>
  );
}

export default CoursesPage;