import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import AboutPreview from "./components/home/AboutPreview";
import ProgramsPreview from "./components/home/ProgramsPreview";
import WhyChoose from "./components/home/WhyChoose";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AboutPreview />
        <ProgramsPreview/>
        <WhyChoose/>
      </main>
    </>
  );
}

export default App;