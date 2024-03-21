import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";

export default function App() {
  return (
    <div>
      <Header />
      <Note title="test" item="testItem" />
      <Footer />
    </div>
  );
}
