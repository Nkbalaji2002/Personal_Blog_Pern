import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Header from "./components/Header";
import { MainToasts } from "./services/Toasts.service";
import { BlogProvider } from "./context/Blog.context";
import { ModalProvider } from "./context/Modal.Context";

function App() {
  return (
    <>
      <BlogProvider>
        <ModalProvider>
          <div className="App">
            <Header />

            <div className="container mx-auto p-4">
              <PostForm />
              <PostList />
            </div>
          </div>
        </ModalProvider>
      </BlogProvider>

      <MainToasts />
    </>
  );
}

export default App;
