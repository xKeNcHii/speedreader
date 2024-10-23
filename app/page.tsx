// app/page.tsx

import TextReader from "./components/TextReader";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-extrabold text-primary mb-6">Speed Reader</h1>
      <TextReader />
      <footer className="mt-10 text-secondary text-sm">
        &copy; {new Date().getFullYear()} Speed Reader App. All rights reserved.
      </footer>
    </main>
  );
};

export default Home;
