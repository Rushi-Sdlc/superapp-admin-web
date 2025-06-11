import { useGetPostsQuery } from './services/api';

function App() {
  const { data, isLoading } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Posts</h1>
      <ul>
        {data?.slice(0, 5).map((post) => (
          <li key={post.id} className="border p-2 mb-2">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
