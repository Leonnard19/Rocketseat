import { Header } from "./components/Header";
import { Post } from "./components/Post";
import "./global.css";

function App() {
  return (
    <>
      <Header />
      <Post
        author="leonardo"
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque quas corporis beatae veritatis, reprehenderit asperiores vitae quod possimus qui dignissimos unde deleniti consequatur quae, repellat debitis sunt, est rerum!"
      />
      <Post
        author="Gabriel"
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque quas corporis beatae veritatis, reprehenderit asperiores vitae quod possimus qui dignissimos unde deleniti consequatur quae, repellat debitis sunt, est rerum!"
      />
    </>
  );
}

export default App;
