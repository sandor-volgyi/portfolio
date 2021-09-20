import "./FrontPage.scss";

const FrontPage = () => {
  /*  useEffect(() => {

  }, []);*/
  const profileImageUrl =
    process.env.REACT_APP_FRONTEND_BASEURL + "/images/profil.jpg";

  return (
    <div className="frontpage">
      <img
        id="profile-pic"
        src={profileImageUrl}
        alt="Völgyi Sándor profilkép"
      />
      <div className="motivation">
        <h2>Name: Sándor Völgyi, Age: 33</h2>
        <h2>Motivation</h2>
        <p>
          I was alway more interested in the technical challenges in my job.
          Automating processes and building useful tools is something that makes
          sense to me. While i can commit myself to repetitive tasks, I prefer
          automating them if possible. What I love in programming is that it is
          easier to see the results of my job and can provide challenges that i
          enjoy taking on.
        </p>
        <h2>About me</h2>
        <p>
          I was alway more interested in the technical challenges in my job.
          Automating processes and building useful tools is something that makes
          sense to me. While i can commit myself to repetitive tasks, I prefer
          automating them if possible. What I love in programming is that it is
          easier to see the results of my job and can provide challenges that i
          enjoy taking on.
        </p>
      </div>
    </div>
  );
};

/*
Summary:
In the last 6 years I worked for multinational companies on data oriented tasks. As i was playing around with php, sql, html, css, jquery and web scraping since high school I soon started to automate things. First I learnt some excel VBA. Automatedsome reporting with SQL and excel pivot tables, then started using some dynamic reporting and automating tools - Alteryx, Report monitor, WeBi, basic Tableau and Qlikview. I acquired good problem solving skills.

Motivation:
I was alway more interested in the technical challenges in my job. Automating processes and building useful tools is something that makes sense to me. While i can commit myself to repetitive tasks, I prefer automating them if possible. What I love in programming is that it is easier to see the results of my job and can provide challenges that i enjoy taking on.

*/

export default FrontPage;
