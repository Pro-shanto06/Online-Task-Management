import './home.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';


function Home() {
  return (
    <div className="home-page">
      <Header />

      <main className="main-content">
        <section className="hero">
          <h1>TaskNest Simplify Task Management</h1>
          <p>
            Collaborate seamlessly, stay organized, and meet deadlines effectively. From small tasks to complex projects, TaskNest provides the tools you need to streamline your workflow and boost productivity.
          </p>
          <Link to="/signup" className="signup-now">Sign Up Now</Link>
        </section>

        <section className="side-section">
          <div className="work">
            <img src="Work.svg" alt="work" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
