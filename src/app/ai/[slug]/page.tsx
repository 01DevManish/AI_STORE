import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface AI {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  rating: number;
}

export default function AIDetails({ ai }: { ai: AI }) {
  const router = useRouter();

  if (!ai) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{ai.name}</h1>
      <img src={ai.image_url} alt={ai.name} className="w-64 h-40 object-cover rounded-lg mt-4" />
      <p className="mt-2 text-gray-500">{ai.category}</p>
      <p className="mt-2">{ai.description}</p>
      <p className="mt-2">⭐ {ai.rating}</p>
      <button onClick={() => router.push('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Go Back
      </button>
    </div>
  );
}

// Fetch data on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  
  // Fetch data from API
  const res = await fetch(`/getAiBySlug${slug}`);
  const ai = await res.json();

  if (!ai) {
    return { notFound: true };
  }

  return {
    props: { ai },
  };
};
