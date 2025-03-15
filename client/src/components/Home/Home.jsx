import AboutSection from "./About";
import Footer from "./Footer";
import HeroTitle from "./HeroTitle";
import MentorSection from "./Mentor";
import Nav from "./Nav";

function Home() {
    return(
        <div className="bg-black ">
<Nav/>
<HeroTitle/>
<AboutSection/>
<MentorSection/>
<Footer/>
        </div>
    )
}

export default Home;       